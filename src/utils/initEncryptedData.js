import moment from 'moment';
import { encrypt, captureSentryMessage } from './index';
import { getIdentifier } from './asyncStore';
import getPublicKey from './getPublicKey';

/**
 * Encrypt location data, get iut ready to send
 */
export default async (position:mixed, returnIdentifier = true) => {
	try {
		const {
			accuracy,
			altitude,
			bearing,
			latitude,
			longitude,
			speed,
			timestamp,
			heading
		} = position;

		const locationObj = {
			accuracy,
			altitude,
			latitude,
			longitude,
			speed,
			timestamp: moment.unix(timestamp / 1000).toISOString(),
			heading: heading || bearing,
			datum: 'EPSG:4326'
		};
		const { identifier, error } = await getIdentifier();

		if (error) {
			await captureSentryMessage({
				error: JSON.stringify(error),
				message: 'checkLeftOverLocationData method : getIdentifier',
				status: 0,
				type: 'n/a'
			});
		}

		const public_key = await getPublicKey(identifier); // eslint-disable-line camelcase

		const data = await encrypt(JSON.stringify(locationObj), public_key);

		if (returnIdentifier) return { data, identifier };
		return data;
	} catch (error) {
		await captureSentryMessage({ error: JSON.stringify(error), message: 'initEncryptedData method' });
		return { error };
	}
};

