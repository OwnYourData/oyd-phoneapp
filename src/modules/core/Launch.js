import React from 'react';
import { AsyncStorage, NativeModules, Platform } from 'react-native';
import I18n from 'react-native-i18n';
import moment from 'moment';

import * as UI from '../uiSystem/';
import { isIos, backgroundTask } from '../../utils/';
import { setIdentifier } from '../../utils/asyncStore';

require('moment/locale/de');

type Props = {
	onSetPlatform:void,
	onSetVersion:void,
	user:mixed,
	repoForLocationData:string,
}

export default class extends React.Component<Props> {
	async componentDidMount() {
		try {
			const getAllKeys = await AsyncStorage.getAllKeys();
			console.log(getAllKeys);
			// checks device locale
			this.checkLocale();
			// just some info
			this.props.onSetPlatform({ platform: isIos ? 'ios' : 'android' });
			this.props.onSetVersion({ version: '0.0.1' });

			// Checks if we have a token and routes to the dashboard or auth view
			// TODO: Check if the token has expired
			if (this.props.user.has('access_token')) {
				await this.checkStatus();
				console.log('#1');
				await setIdentifier(this.props.repoForLocationData);
				console.log('#2');
				setTimeout(() => this.routeTo('DASHBOARD'), 3000);
				console.log('#3');
				return;
			}
			backgroundTask.finish();
			backgroundTask.cancel();
			setTimeout(() => this.routeTo('AUTH'), 3000);
		} catch (err) {
			this.props.onError({ status: 0, message: 'error on mounting launch screen', type: 'n/a' });
		}
	}

	/**
	 * Check if background tasks are enabled
	 */
	checkStatus = async () => {
		try {
			const status = await backgroundTask.statusAsync();
			if (status.available) { // Everything's fine
				return true;
			}

			const reason = status.unavailableReason;
			if (reason === backgroundTask.UNAVAILABLE_DENIED) {
				this.props.onError({ status: 0, message: 'Please enable background "Background App Refresh" for this app', type: 'n/a' });
			} else if (reason === backgroundTask.UNAVAILABLE_RESTRICTED) {
				this.props.onError({ status: 0, message: 'Background tasks are restricted on your device', type: 'n/a' });
			}
		} catch (error) {
			this.props.onError({ status: 0, message: 'error on launch, checking background task', type: 'n/a' });
		}
	};

	/**
	 * Checks what language the device is in, if its German enable German translations
	 */
	checkLocale = () => {
		let deviceLocal;
		if (Platform.OS === 'android') {
			deviceLocal = NativeModules.I18nManager.localeIdentifier;
		} else {
			deviceLocal = NativeModules.SettingsManager.settings.AppleLocale;
		}

		I18n.locale = 'en';

		const locale = deviceLocal.slice(0, 2);

		if (locale === 'de') {
			I18n.locale = locale;
			moment.locale(locale);
		}
	};
	/**
	 * Manages the routing
	 */
	routeTo = key => this.props.onRootSingleScreenApp({ key, passProps: { white: true }, animationType: 'fade' });

	render = () => (
		<UI.Module hideFooter {...this.props}>
			<UI.CenterView
				fullHeight
				bg={UI.t.colors.blue}
			>
				<UI.Logo isWhite />
				<UI.Spacer height={10} />
				<UI.Spinner
					color={UI.t.colors.white}
				/>
			</UI.CenterView>
		</UI.Module>);
}
