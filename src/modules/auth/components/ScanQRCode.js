import React from 'react';

import * as UI from '../../uiSystem/';
import { StartScanQRCode } from './index';

class ScanQR extends React.PureComponent {
	onShowQr = () => {
		this.props.onShowRegister({ showRegister: false });
		this.props.onShowLogin({ showLogin: false });
		this.props.onShowQr({ showQr: true });
	};

	onStartQr = () => {
		this.props.onShowRegister({ showRegister: false });
		this.props.onShowLogin({ showLogin: false });
		this.props.onStartQrScan({ startQrScan: true });
	};

	render = () => (
		<UI.CenterView>
			<UI.Spacer height={10} />

			{this.props.showQr && <UI.Text
				left={false}
				type='p itl'
				text={this.props.i18n.t('auth.qrDescription')}
			/>}

			<UI.Spacer height={20} />

			<UI.CenterView wdth='80%'>
				<UI.Button
					onPress={this.onStartQr}
					type='primary'
					text={this.props.i18n.t('auth.scanQR')}
				/>
			</UI.CenterView>

			<UI.Spacer height={20} />

			<StartScanQRCode {...this.props} />

		</UI.CenterView>);
}

export default ScanQR;
