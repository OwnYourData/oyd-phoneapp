import React from 'react';
import { Alert, NetInfo } from 'react-native';
import { replace } from 'lodash';

import { withNetworkConnectivity } from 'react-native-offline';

import { getLocationData, setLocationData, setIdentifier } from '../../utils/asyncStore';
import { getLocation, linkTo, initEncryptedData, getUsedLocale } from '../../utils/index';
import { onRefreshToken } from '../../utils/backgroundLocation';

import * as UI from '../uiSystem/';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

type Props = {
	vaultUrl:string,
	repoForLocationData:string,
	isPosting:boolean,
	locationData:mixed,
	i18n:mixed,
	onLogOut:void,
	onClearLocationData:void,
	onParseStoredLocationData:void,
	updateLocationData:void,
	updateLocationData:void,
	onBackgroundDataEmpty:void,
	isConnected:boolean,
}

class Settings extends UI.PureComponent<Props> {
	static defaultProps = {
		onClearLocationData: () => (true),
		onParseStoredLocationData: () => (true),
		updateLocationData: () => (true),
		onPostLocationData: () => (true),
		onBackgroundDataEmpty: () => (true),
	};

	constructor(props) {
		super(props);

		this.state = {
			localLocationData: 0,
			showLocationData: false,
			isPosting: false,
			locationCheck: true,
		};
	}

	async componentWillMount() {
		try {
			this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
			NetInfo.addEventListener(
				'connectionChange',
				this.handleConnectivityChange,
			);
			await this.onParseStoredLocationData();
		} catch (error) {
			this.props.onError({
				error: JSON.stringify(error),
				message: 'settings: componentDidMount method',
				status: 0,
				type: 'n/a',
			});
		}
	}

	async componentDidUpdate(prevProps) {
		try {
			if (this.props.isConnected !== prevProps.isConnected) {
				await this.onParseStoredLocationData();
			}
			if (this.props.backgroundDataEmpty !== prevProps.backgroundDataEmpty) {
				await this.getLocalLocationData();
			}
			if (this.props.repoForLocationData !== prevProps.repoForLocationData) {
				await setIdentifier(this.props.repoForLocationData);
			}
		} catch (error) {
			this.props.onError({
				error: JSON.stringify(error),
				message: 'settings: componentDidUpdate method',
				status: 0,
				type: 'n/a',
			});
		}
	}

	handleConnectivityChange = async () => (this.onParseStoredLocationData());

	getLocalLocationData = async () => {
		try {
			const { locationData } = await getLocationData();
			this.props.onBackgroundDataEmpty({ backgroundDataEmpty: locationData.length === 0 });
			this.setState({ localLocationData: locationData.length, showLocationData: this.props.lastUploadTime !== null });
		} catch (error) {
			this.props.onError({
				error: JSON.stringify(error),
				message: 'settings: getLocalLocationData method',
				status: 0,
				type: 'n/a',
			});
		}
	};

	onParseStoredLocationData = async (isManual = false) => {
		try {
			if (this.props.isConnected && !this.state.isPosting) {
				const { type } = await NetInfo.getConnectionInfo();
				const isConnected = (type === 'wifi');
				console.log('isManual', isManual);
				if (isConnected || isManual) {
					const { success, status } = await onRefreshToken();
					if (!success) {
						this.props.onError({
							error: 'Error refreshing token',
							message: 'settings: uploadLocationData method: onRefreshToken',
							status,
							type: 'n/a',
						});
						return;
					}
					this.props.onParseStoredLocationData();
				}
			}
			await wait(2000);
			await this.getLocalLocationData();
		} catch (error) {
			this.props.onError({
				error: JSON.stringify(error),
				message: 'settings: onParseStoredLocationData method',
				status: 0,
				type: 'n/a',
			});
		}
	};

	onLogoutConfirmed = async () => {
		try {
			await this.onClearLocationData();
			this.props.onLogOut();
			this.routeTo('CORE');
		} catch (error) {
			this.props.onError({
				error: JSON.stringify(error),
				message: 'settings: onLogoutConfirmed method',
				status: 0,
				type: 'n/a',
			});
		}
	};

	onLogOut = async () => {
		try {
			if (this.props.locationData.size > 0 || this.state.localLocationData > 0) {
				Alert.alert(
					'',
					this.props.i18n.t('settings.logOutAlert'),
					[
						{ text: 'OK', onPress: this.onLogoutConfirmed },
						{ text: this.props.i18n.t('settings.cancel'), onPress: () => (true) },
					],
				);
				return;
			}
			await this.onLogoutConfirmed();
		} catch (error) {
			this.props.onError({
				error: JSON.stringify(error),
				message: 'settings: onLogOut method',
				status: 0,
				type: 'n/a',
			});
		}
	};

	confirmClearLocationData = async () => {
		try {
			if (this.props.locationData.size > 0 || this.state.localLocationData > 0) {
				Alert.alert(
					'',
					this.props.i18n.t('settings.clearLocationDataConfirm'),
					[
						{ text: 'OK', onPress: this.onClearLocationData },
						{ text: this.props.i18n.t('settings.cancel'), onPress: () => (true) },
					],
				);
			}
		} catch (error) {
			this.props.onError({
				error: JSON.stringify(error),
				message: 'settings: confirmClearLocationData method',
				status: 0,
				type: 'n/a',
			});
		}
	};

	onClearLocationData = async () => {
		try {
			this.props.onClearLocationData();
			const setLData = await setLocationData('[]');
			if (setLData) await this.getLocalLocationData();
		} catch (error) {
			this.props.onError({
				error: JSON.stringify(error),
				message: 'settings: onClearLocationData method',
				status: 0,
				type: 'n/a',
			});
		}
	};

	updateLocationData = async () => {
		try {
			const { position, error } = await getLocation();
			if (error) {
				return this.props.onError({
					error: JSON.stringify(error),
					message: 'settings: error getting location data',
					status: 0,
					type: 'n/a',
				});
			}
			this.props.updateLocationData({ data: position });
		} catch (err) {
			this.props.onError({
				error: JSON.stringify(err),
				message: 'settings: updateLocationData method',
				status: 0,
				type: 'n/a',
			});
		}
	};

	uploadLocationData = async () => {
		try {
			if (!this.props.isConnected) return;
			const { success } = await onRefreshToken();
			if (!success) {
				this.props.onError({
					error: 'Error refreshing token',
					message: 'settings: uploadLocationData method: onRefreshToken',
					status: 0,
					type: 'n/a',
				});
				return;
			}
			this.setState({ isPosting: true });
			const identifier = this.props.repoForLocationData;

			const promises = (this.props.locationData.toJS()).map(location => initEncryptedData(location, false));

			const data = await Promise.all(promises);

			const isPostingBackgroundLocation = false;
			this.props.onPostLocationData({ identifier, data, isPostingBackgroundLocation });

			this.setState({ isPosting: false });

			await this.onParseStoredLocationData(true);
		} catch (error) {
			this.props.onError({
				error: JSON.stringify(error),
				message: 'settings: uploadLocationData method',
				status: 0,
				type: 'n/a',
			});
		}
	};

	parseLocationInfo = (text:string) => {
		let newText = text;
		if (this.props.locationData.size !== 0 || this.state.localLocationData > 0) {
			const locationNum = this.props.locationData.size + this.state.localLocationData;
			newText = replace(newText, '%num', locationNum.toString());
			if (this.props.lastUploadTime) {
				newText = replace(newText, '%date', this.props.lastUploadTime);
			} else {
				newText = replace(newText, '%date', '');
			}
		}
		this.setState({ locationCheck: false });
		return newText;
	};

	render = () => {
		const disableUploadButton = (this.props.repoForLocationData === '' || (this.props.locationData.size === 0 && this.state.localLocationData === 0)) || !this.props.isConnected;
		return (
			<UI.Module
				{...this.props}
				showHeader
				showBack
				headerTitle={this.props.user.get('username')}
			>
				<UI.ScrollView {...this.props} showVersion>
					<UI.CenterView pad={10}>
						<UI.Block>
							{this.renderText('settings.information', 'h2')}
							{this.state.locationCheck ?
								<UI.Block>
									{this.renderText('settings.locationsCheck')}
								</UI.Block> :
								<UI.Block>{this.props.locationData.size !== 0 || this.state.localLocationData > 0 ?
									<UI.Block>
										{this.renderText('settings.locationInfo')}
										{this.state.showLocationData && this.renderText('settings.lastUpdate')}
									</UI.Block>
									:
									this.renderText('settings.noLocationInfo')
								}
								</UI.Block>
							}
							<UI.Spacer height={20} />

							{this.renderText('settings.actions', 'h2')}
							<UI.Spacer height={10} />
							{this.renderButton('settings.readLocationData', this.updateLocationData)}

							<UI.Spacer height={20} />

							{this.renderButton('settings.openDataVault', () => linkTo(`${this.props.vaultUrl}/${getUsedLocale()}`))}

							<UI.Spacer height={20} />

							<UI.Block>
								{(!this.props.isPosting && !this.state.isPosting) && this.renderButton('settings.uploadLocationData', this.uploadLocationData, 'primary', disableUploadButton)}

								{(this.props.isPosting || this.state.isPosting) && <UI.Spinner />}

								{this.props.hasError && <UI.Spacer height={10} />}
								{this.props.hasError &&
								<UI.CenterView bg='#F2F2F2' border>
									<UI.Text
										type='p red'
										left={false}
										text={this.props.errorText}
									/>
								</UI.CenterView>}

								<UI.Spacer height={20} />

								<UI.Block>
									{this.renderInput(
										'settings.repoForLocationData',
										this.props.repoForLocationData,
										'repoForLocationData',
										false,
										this.props.repoForLocationData === '',
									)}
								</UI.Block>

							</UI.Block>

							<UI.Spacer height={30} />

							{(this.props.locationData.size !== 0 || this.state.localLocationData > 0) && this.renderButton('settings.clearLocationData', this.confirmClearLocationData, 'primary pill')}

							<UI.Spacer height={10} />

							{this.renderButton('settings.logout', this.onLogOut, 'primary pill')}

							<UI.Spacer height={20} />
						</UI.Block>
					</UI.CenterView>
				</UI.ScrollView>
			</UI.Module>
		);
	};
}

export default withNetworkConnectivity()(Settings);
