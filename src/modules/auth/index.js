import { onOauthToken, onEncryptCredentials, onRegister } from './sagas';
import { Main } from './reducers';
import InitialState from './initialState';
import Api from './services';
import i18n from './i18n';

import Auth from './Auth';
import Help from './Help';

const api = new Api;

export default {
	namespace: 'AUTH',
	InitialState,
	i18n,

	routes: {
		component: Auth,
		subroutes: [
			{
				component: Help,
				key: 'HELP'
			}
		],
	},

	actions: [
		{ name: 'persist/REHYDRATE', reducer: [Main, 'rehydrates'] },
		{ name: 'ON_CHANGE_LOGIN_INPUT', reducer: [Main, 'onChangeInput'] },
		{ name: 'ON_RESET_ERROR', reducer: [Main, 'updateSingleSet', ['hasError', 'hasError']] },
		{ name: 'ON_RESET_REGISTER', reducer: [Main, 'updateSingleSet', ['registerSuccess', 'registerSuccess']] },
		{ name: 'ON_SHOW_LOGIN', reducer: [Main, 'updateSingleSet', ['showLogin', 'showLogin']] },
		{ name: 'ON_REGISTER_SUCCESS', reducer: [Main, 'updateSingleSet', ['registerSuccess', 'registerSuccess']] },
		{ name: 'ON_SHOW_REGISTER', reducer: [Main, 'updateSingleSet', ['showRegister', 'showRegister']] },
		{ name: 'ON_SHOW_QR', reducer: [Main, 'updateSingleSet', ['showQr', 'showQr']] },
		{ name: 'ON_START_QR_SCAN', reducer: [Main, 'updateSingleSet', ['startQrScan', 'startQrScan']] },
		{ name: 'ON_REGISTER_ERROR', reducer: [Main, 'onRegisterError'] },
		{ name: 'ON_SET_OAUTH_TOKEN', reducer: [Main, 'onSetOauthToken'] },
		{ name: 'ON_PARSE_QR_CODE', reducer: [Main, 'onParseQrCode'] },
		{ name: 'ON_STORE_CREDENTIALS', reducer: [Main, 'onStoreCredentials'] },

		{ name: 'SETTINGS/ON_LOG_OUT', reducer: [Main, 'onLogOut'] },

		{
			name: 'ON_GET_OAUTH_TOKEN',
			reducer: [Main, 'updateSingleSet', ['isFetching', 'isFetching']],
			saga: {
				fn: api.oauthToken,
				cb: onOauthToken,
			}
		},
		{
			name: 'ON_ENCRYPT_CREDENTIALS',
			reducer: [Main, 'updateSingleSet', ['isFetching', 'isFetching']],
			saga: {
				fn: api.encryptCredentials,
				cb: onEncryptCredentials,
			}
		},
		{
			name: 'ON_REGISTER',
			reducer: [Main, 'updateSingleSet', ['isFetching', 'isFetching']],
			saga: {
				fn: api.onRegister,
				cb: onRegister,
			}
		},
	],

	stateToProps: state => ({
		registerErrorMessage: state.auth.get('registerErrorMessage'),
		registerSuccess: state.auth.get('registerSuccess'),
		showRegister: state.auth.get('showRegister'),
		showLogin: state.auth.get('showLogin'),
		showQr: state.auth.get('showQr'),
		startQrScan: state.auth.get('startQrScan'),
		loginSuccess: state.auth.get('loginSuccess'),
		hasError: state.auth.get('hasError'),
		isFetching: state.auth.get('isFetching'),
		vaultUrl: state.auth.get('vaultUrl'),
		email: state.auth.get('email'),
		username: state.auth.get('username'),
		password: state.auth.get('password'),
	}),
};
