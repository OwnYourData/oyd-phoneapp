import { api } from '../service/index';
import { captureSentryMessage } from './captureSentryMessage';

/**
 * Settings Service
 */
class PublicKey extends api {
	/**
	 * Gets the public key
	 */
	getPublicKey = async (identifier:string):Object<{}> =>
		this.get(`/api/repos/${identifier}/pub_key`);
}

/**
 *
 */
export default async (identifier) => {
	try {
		const publicKey = new PublicKey;
		const { response } = await publicKey.getPublicKey(identifier);
		const { respInfo: { status }, error } = response;
		if (status !== 200 || error) {
			await captureSentryMessage({
				error: JSON.stringify(error),
				message: JSON.stringify(response),
				status,
				type: 'error getting public key with status'
			});
		}
		const { public_key } = JSON.parse(response.data); // eslint-disable-line camelcase
		return public_key; // eslint-disable-line camelcase
	} catch (err) {
		await captureSentryMessage({
			error: JSON.stringify(err),
			message: 'error getting public key',
			status: 0,
			type: 'n/a'
		});
	}
};

