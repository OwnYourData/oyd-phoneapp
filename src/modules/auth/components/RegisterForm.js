import React from 'react';

import * as UI from '../../uiSystem/';
import { getUsedLocale } from '../../../utils';

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

	onSubmit = () => {
		try {
			const { email, username } = this.props;
			this.props.onRegister({ email, name: username, language: getUsedLocale(), isFetching: true });
		} catch (err) {
			this.props.onError({ status: 0, message: 'error on logging in', type: 'n/a' });
		}
	};

	render() {
		const {
			i18n, email, username, isFetching, hasError, registerErrorMessage, registerSuccess
		}:Props = this.props;

		return (
			<UI.Block>
				<UI.Text
					type='h4 bld'
					text={i18n.t('auth.newDatavault')}
				/>
				{!registerSuccess && hasError &&
				<UI.CenterView bg='#F2F2F2' border>
					<UI.Block pad={8}>
						<UI.Text
							type='p red'
							left={false}
							text={registerErrorMessage}
						/>
					</UI.Block>
				</UI.CenterView>}
				{!registerSuccess &&
				<UI.Block>
					{isFetching ?
						<UI.Block>
							<UI.Text
								left={false}
								text={i18n.t('auth.checkingCredentials')}
							/>
							<UI.Spinner />
						</UI.Block> :
						<UI.Block>
							{this.renderInput('auth.newUsername', username, 'username')}
							{this.renderInput('auth.newEmail', email, 'email')}
							<UI.Spacer height={10} />
							<UI.Button
								onPress={this.onSubmit}
								fullWidth={false}
								type='primary pill'
								text={i18n.t('auth.newSubmit')}
							/>
						</UI.Block>}
				</UI.Block>}
				{registerSuccess &&
				<UI.Block>
					<UI.CenterView bg='#4472C4' border>
						<UI.Block pad={8}>
							<UI.Text
								type='h2 white'
								left={false}
								text={i18n.t('auth.newSuccess')}
							/>
						</UI.Block>
					</UI.CenterView>
				</UI.Block>}
				<UI.Spacer height={20} />
			</UI.Block>);
	}
}

export default LoginForm;
