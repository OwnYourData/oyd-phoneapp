import Sodium from 'react-native-libsodium';
import { sha256 } from 'react-native-sha256';
import { captureSentryMessage } from './captureSentryMessage';

/**
 * Sign and encrypt a message using a provided public key
 *
 * @param {string} message
 * @param {string} publicKey
 *
 * @returns {object}
 */
export const encrypt = async (message, publicKey) => {
	try {
		const nonce = await Sodium.randombytes(Sodium.CRYPTO_BOX_NONCEBYTES);
		const authenticationKey = await sha256('auth');

		const value = await Sodium.crypto_box_easy(
			message,
			nonce,
			publicKey,
			authenticationKey
		);

		return {
			value,
			nonce,
			version: '0.4'
		};
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'android encryption error',
			status: 0,
			type: 'n/a'
		});
	}
};

/**
 * Generate a private/public key pair
 *
 * @returns {object}
 */
export const generateKeys = async () => {
	try {
		const keys = await Sodium.crypto_box_keypair();

		return {
			privateKey: keys.SecretKey,
			publicKey: keys.PublicKey,
		};
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'android key generation error',
			status: 0,
			type: 'n/a'
		});
	}
};
