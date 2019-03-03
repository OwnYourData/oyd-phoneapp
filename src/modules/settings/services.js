import { api } from '../../service/';
/**
 * Settings Service
 */
export default class extends api {
	/**
	 * Posts location data
	 */
	postLocationData = async (identifier:string, data:Array<mixed>):Object<{}> =>
		this.post(`/api/repos/${identifier}/items`, data);
	/**
	 * Gets the public key
	 */
	getPublicKey = async (identifier:string):Object<{}> =>
		this.get(`/api/repos/${identifier}/pub_key`);
}
