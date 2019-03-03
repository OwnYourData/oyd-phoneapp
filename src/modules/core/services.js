import { api } from '../../service/';
/**
 * Core Service
 */
export default class extends api {
	/**
	 * Login request
	 */
	refreshOauthToken = async (email:string, password:string):Object<{}> =>
		(this.post('/oauth/token', { email, password, grant_type: 'password' }));
	/**
	 * Post location data
	 */
	postData = async (identifier:string, data:Array<mixed>):Object<{}> =>
		(this.post(`/api/repos/${identifier}/items`, data));
	/**
	 * Get public key to use for encryption

	getPublicKey = async (location:string, data:Array<mixed>):Object<{}> =>
		(this.connect(`/api/repos/${identifier}/pub_key`, 'post', data)); */
}
