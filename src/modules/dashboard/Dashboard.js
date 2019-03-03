import React from 'react';
import { withNetworkConnectivity } from 'react-native-offline';
import Orientation from 'react-native-orientation-locker';

import * as UI from '../uiSystem/';
import { NoModules, ModuleList } from './components';
import { backgroundTask } from '../../utils/index';
import { storeEmailPassword, setIdentifier } from '../../utils/asyncStore';
import { onRefreshToken } from '../../utils/backgroundLocation';
import Location from './Location';

type Props = {
	onGetModuleList:void,
	appList:mixed,
	isFetching:boolean,
	onRefreshOauthToken:void,
	onError:void,
	isConnected:boolean,
}

class Dashboard extends Location {
	constructor(props:Props) {
		super(props);
		this.props = props;
	}

	async componentDidMount() {
		try {
			Orientation.lockToPortrait();
			backgroundTask.schedule();
			// setTimeout(async () => getLocation(), 3000);
			const { email, password, i18n } = this.props;
			await setIdentifier(this.props.repoForLocationData);
			const isStored = await storeEmailPassword(email, password);

			if (isStored) {
				const { success, status } = await onRefreshToken();
				if (!success) {
					if (status === 401) {
						this.props.onError({
							error: i18n.t('dashboard.authErrorTitle'),
							message: i18n.t('dashboard.authErrorBody'),
							status,
							type: 'logout'
						});
					}
					return;
				}
				this.props.onGetModuleList({ isFetching: true });
			}
		} catch (err) {
			this.props.onError({ status: 0, message: 'error on mounting dashboard', type: 'n/a' });
		}
	}

	onPressIconButton = () => this.props.routeTo(this.props, 'SETTINGS');

	render = () => (
		<UI.Module
			{...this.props}
			showHeader
			showIconButton
			headerTitle='OwnYourData'
			onPressIconButton={this.onPressIconButton}
		>
			<UI.ScrollView {...this.props}>
				{this.props.isFetching && this.props.appList.size === 0 && <UI.Spinner />}
				{!this.props.isFetching && this.props.appList.size === 0 ?
					<NoModules {...this.props} />
					:
					<ModuleList {...this.props} />
				}
			</UI.ScrollView>
		</UI.Module>);
}

export default withNetworkConnectivity()(Dashboard);
