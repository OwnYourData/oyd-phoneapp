import { api } from '../../service/';

/**
 * Auth Service
 */
export default class extends api {
	/**
	 * Login request
	 */
	oauthToken = async (email:string, password:string):Object<{}> =>
		(this.post('/oauth/token', { email, password, grant_type: 'password' }));
	/**
	 * Encrypt credentials request
	 */
	encryptCredentials = async (nonce:string, cipher:string):Object<{}> =>
		(this.post('/api/users/app_support', { nonce, cipher }));
	/**
	 * Register request
	 */
	onRegister = async (email:string, name:string, language:string):Object<{}> =>
		(this.post('https://data-vault.eu/api/users/create', { name, email, language }));
}
