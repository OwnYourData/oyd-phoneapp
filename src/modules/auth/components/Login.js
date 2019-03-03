import React from 'react';
import * as UI from '../../uiSystem/';

import { LoginForm, RegisterForm } from './';

class Login extends React.PureComponent {
	componentDidMount() {
		this.props.onStoreCredentials({
			publicKey: null,
			privateKey: null,
			nonce: null,
			value: null,
		});
	}

	onShowLogin = () => {
		this.props.onShowRegister({ showRegister: false });
		this.props.onShowLogin({ showLogin: true });
		this.props.onShowQr({ showQr: false });
		this.props.onResetError({ hasError: false });
		this.props.onResetRegister({ registerSuccess: false });
	};

	onShowRegister = () => {
		this.props.onShowRegister({ showRegister: true });
		this.props.onShowLogin({ showLogin: false });
		this.props.onShowQr({ showQr: false });
		this.props.onResetError({ hasError: false });
		this.props.onResetRegister({ registerSuccess: false });
	};
	render = () => (
		<UI.CenterView>
			{this.props.showLogin &&
			<LoginForm
				{...this.props}
			/>}
			{this.props.showRegister &&
			<RegisterForm {...this.props} />
			}
			{!this.props.showLogin &&
			<UI.Button
				type='secondary'
				onPress={this.onShowLogin}
				text={this.props.i18n.t('auth.enterLogin')}
			/>}
			{!this.props.showLogin && !this.props.showRegister && <UI.Text
				text={this.props.i18n.t('auth.or')}
			/>}
			{!this.props.showRegister && <UI.Button
				onPress={this.onShowRegister}
				type='secondary'
				text={this.props.i18n.t('auth.signUp')}
			/>}
		</UI.CenterView>);
}

export default Login;
