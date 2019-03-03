import { Record } from 'immutable';

export default Record({
	vaultUrl: 'https://data-vault.eu',
	email: '',
	password: '',
	username: '',
	credentials: {
		privateKey: null,
		publicKey: null,
		nonce: null,
		value: null,
	},
	registerErrorMessage: '',
	isFetching: false,
	hasError: false,
	loginSuccess: false,
	registerSuccess: false,
	showRegister: false,
	showLogin: false,
	showQr: false,
	startQrScan: false
}, 'auth');
