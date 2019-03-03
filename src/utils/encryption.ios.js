import { NativeModules } from 'react-native';
import { sha256 } from 'react-native-sha256';

import { captureSentryMessage } from './captureSentryMessage';

const { crypto_box_easy, randombytes_buf, crypto_box_keypair } = NativeModules.RNLibSodium; // eslint-disable-line camelcase

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
		const nonce = await randombytes_buf(24);
		const authenticationKey = await sha256('auth');
		const value = await crypto_box_easy(
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
			message: 'ios encryption error',
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
		const keys = await crypto_box_keypair();
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
