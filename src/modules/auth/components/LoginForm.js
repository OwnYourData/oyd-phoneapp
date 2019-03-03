import React from 'react';

import * as UI from '../../uiSystem/';
import storeVaultUrl from '../utils/';
import { encrypt, generateKeys } from '../../../utils';

type Props = {
	vaultUrl:string,
	username:string,
	password:string,
	isFetching:boolean,
	loginSuccess:boolean,
	i18n:mixed,
	onChangeLoginInput?:void,
	onGetOauthToken:void
}

class LoginForm extends UI.PureComponent<Props> {
	static defaultProps = {
		onChangeLoginInput: () => (true)
	};

	componentDidUpdate(prevProps) {
		if (prevProps.loginSuccess !== this.props.loginSuccess) {
			const key = 'DASHBOARD';
			this.props.onRootSingleScreenApp({ key, passProps: { white: true }, animationType: 'fade' });
		}
	}

	onSubmit = async () => {
		try {
			const vaultUrl = await storeVaultUrl(this.props.vaultUrl.replace(/ /g, ''));
			if (!vaultUrl) return this.props.onError({ status: 0, message: 'error missing vaultUrl', type: 'n/a' });
			const { email, password } = this.props;

			this.props.onGetOauthToken({
				email,
				password,
				isFetching: true
			});

			const { publicKey, privateKey } = await generateKeys();
			const { value, nonce } = await encrypt(password, publicKey);
			this.props.onStoreCredentials({
				publicKey,
				privateKey,
				nonce,
				value
			});
		} catch (err) {
			this.props.onError({ status: 0, message: 'error on logging in', type: 'n/a' });
		}
	};

	render() {
		const {
			i18n, email, password, vaultUrl, isFetching, hasError
		}:Props = this.props;

		return (
			<UI.Block>
				{hasError &&
				<UI.CenterView bg='#F2F2F2' border>
					<UI.Text
						type='p red'
						left={false}
						text={this.props.i18n.t('auth.error')}
					/>
				</UI.CenterView>}
				{isFetching ?
					<UI.Block>
						<UI.Text
							left={false}
							text={this.props.i18n.t('auth.checkingCredentials')}
						/>
						<UI.Spinner />
					</UI.Block> :
					<UI.Block>
						{this.renderInput('auth.vaultUrl', vaultUrl, 'vaultUrl')}
						{this.renderInput('auth.email', email, 'email')}
						{this.renderInput('auth.password', password, 'password', true)}
						<UI.Spacer height={10} />
						<UI.Button
							onPress={this.onSubmit}
							fullWidth={false}
							type='primary pill'
							text={i18n.t('auth.loginBtn')}
						/>
					</UI.Block>}
				<UI.Spacer height={20} />
			</UI.Block>);
	}
}

export default LoginForm;
