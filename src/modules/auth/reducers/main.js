import { has } from 'lodash';
import { Core } from '../../core/reducers';

export default class extends Core {
	constructor(action:mixed, state:mixed) {
		super(action, state);
		this.action = action;
		this.state = state;
	}

	/**
	 * Updates login input fields
	 */
	onChangeInput = ():Object<{}> => {
		type Payload = {
			field:string,
			text:string,
		}
		const {
			field = '', text = ''
		}:Payload = this.action.payload;

		return this.state
			.set(field, text);
	};
	/**
	 * Shows registration error message
	 */
	onRegisterError = ():Object<{}> => {
		type Payload = {
			registerErrorMessage:string,
		}
		const {
			registerErrorMessage
		}:Payload = this.action.payload;

		return this.state
			.set('registerErrorMessage', registerErrorMessage)
			.set('isFetching', false)
			.set('registerSuccess', false)
			.set('hasError', true);
	};
	/**
	 * Checks if we have an error when logging in.
	 */
	onSetOauthToken = ():Object<{}> => {
		type Payload = {
			error:boolean,
		}
		const {
			error
		}:Payload = this.action.payload;

		return this.state
			.set('isFetching', false)
			.set('loginSuccess', !error)
			.set('hasError', error);
	};
	/**
	 * Parse data from the qr code scanner
	 */
	onParseQrCode = ():Object<{}> => {
		type Payload = {
			obj:mixed,
		}
		const {
			obj: { PIA_URL, email, password }
		}:Payload = this.action.payload;

		return this.state
			.set('vaultUrl', PIA_URL)
			.set('email', email)
			.set('password', password);
	};

	onStoreCredentials = ():Object<{}> =>
		this.state.set('credentials', this.action.payload);

	/**
	 * Resets the state
	 */
	onLogOut = ():Object<{}> =>
		this.state
			.set('email', '')
			.set('password', '')
			.set('vaultUrl', 'https://data-vault.eu')
			.set('username', '')
			.set('registerErrorMessage', '')
			.set('isFetching', false)
			.set('loginSuccess', false)
			.set('hasError', false)
			.set('loginSuccess', false)
			.set('showLogin', false)
			.set('showQr', false)
			.set('showRegister', false)
			.set('registerSuccess', false)
			.set('startQrScan', false);
	/**
	 * Control how we rehydrate the store
	 */
	rehydrates = () => {
		if (!has(this.action.payload, 'auth') || !has(this.action, 'payload')) return this.state;
		const {
			vaultUrl,
			email,
			password
		} = this.action.payload.auth.toJS();

		const vUrl = (vaultUrl !== '' && vaultUrl) ? vaultUrl : 'https://data-vault.eu';

		return this.state
			.set('vaultUrl', vUrl)
			.set('email', email)
			.set('password', password)
			.set('username', '')
			.set('registerErrorMessage', '')
			.set('isFetching', false)
			.set('loginSuccess', false)
			.set('hasError', false)
			.set('loginSuccess', false)
			.set('showLogin', false)
			.set('showRegister', false)
			.set('showQr', false)
			.set('registerSuccess', false)
			.set('startQrScan', false);
	};
}
