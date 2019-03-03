import React from 'react';
import { Modal, View } from 'react-native';
import { has, set } from 'lodash';
import QRCodeScanner from 'react-native-qrcode-scanner';

import storeVaultUrl from '../utils/';
import * as UI from '../../uiSystem/';

class ScanQR extends React.PureComponent {
	onSuccess = async (e) => {
		try {
			this.setModalVisible();

			const obj = JSON.parse(e.data);
			if (!has(obj, 'PIA_URL')) set(obj, 'PIA_URL', '');
			if (!has(obj, 'email')) set(obj, 'email', '');
			if (!has(obj, 'password')) set(obj, 'password', '');

			this.props.onParseQrCode({ obj });

			this.props.onShowLogin({ showLogin: true });
			this.props.onShowQr({ showQr: false });

			if (obj.PIA_URL !== '' && obj.email !== '' && obj.password !== '') {
				const { email, password, PIA_URL } = obj;
				const vaultUrl = await storeVaultUrl(PIA_URL);
				if (!vaultUrl) return;

				setTimeout(() => this.props.onGetOauthToken({ email, password, isFetching: true }), 1000);
			}
		} catch (err) {
			this.props.onError({ status: 0, message: 'error on scanning qr code', type: 'n/a' });
		}
	};

	setModalVisible = () => this.props.onStartQrScan({ startQrScan: false });

	render = () => (
		<Modal
			onRequestClose={() => true}
			animationType='slide'
			transparent={false}
			visible={this.props.startQrScan}
		>
			<UI.CenterView fullHeight pad={20}>
				<QRCodeScanner
					showMarker
					checkAndroid6Permissions
					onRead={this.onSuccess.bind(this)}
					ref={(scanner) => {
						this.scanner = scanner;
					}}
				/>
				<View style={{ width: '100%', alignItems: 'center' }}>
					<UI.Block wdth='80%'>
						<UI.Button
							onPress={this.setModalVisible}
							type='primary'
							text={this.props.i18n.t('auth.cancelScan')}
						/>
					</UI.Block>
				</View>
			</UI.CenterView>
		</Modal>);
}

export default ScanQR;
