import { AsyncStorage } from 'react-native';

import { captureSentryMessage } from './index';

/**
 * Store auth token
 */
export const storeAccessToken = async (authToken:string):Object => {
	try {
		return await AsyncStorage.setItem('authToken', authToken);
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'async: storeAccessToken method',
			status: 0,
			type: 'n/a',
		});
	}
};
/**
 * Store email and password
 */
export const storeEmailPassword = async (email, password):Object => {
	try {
		await AsyncStorage.setItem('emailPassword', JSON.stringify({ email, password }));
		return true;
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'async: storeEmailPassword method',
			status: 0,
			type: 'n/a',
		});
		return false;
	}
};
/**
 * Get email and password
 */
export const getEmailPassword = async ():Object => {
	try {
		const emailPassword = await AsyncStorage.getItem('emailPassword');
		if (emailPassword !== null) return { emailPassword: JSON.parse(emailPassword) };
		return { emailPassword: '', error: false };
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'async: getEmailPassword method',
			status: 0,
			type: 'n/a',
		});
		return { emailPassword: null, error };
	}
};
/**
 * Gets the identifier to post location data
 */
export const getIdentifier = async () => {
	try {
		const identifier = await AsyncStorage.getItem('identifier');
		if (identifier !== null) return { identifier, error: false };
		return { identifier: '', error: true };
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'async: getIdentifier method',
			status: 0,
			type: 'n/a',
		});
		return { identifier: null, error: true };
	}
};
/**
 * Sets the identifier to post location data
 */
export const setIdentifier = async (identifier:string):Object => {
	try {
		await AsyncStorage.setItem('identifier', identifier);
		return true;
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'async: setIdentifier method',
			status: 0,
			type: 'n/a',
		});
		return { identifier: null, error };
	}
};
/**
 * Store location data
 */
export const setLocationData = async (locationData:string):Object => {
	try {
		await AsyncStorage.setItem('locationData', locationData);
		return true;
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'async: setLocationData method',
			status: 0,
			type: 'n/a',
		});
		return false;
	}
};
/**
 * Gets the location data
 */
export const getLocationData = async () => {
	try {
		const locationData = await AsyncStorage.getItem('locationData');
		if (locationData !== null) return { locationData: JSON.parse(locationData) };
		return { locationData: [], error: false };
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'async: getLocationData method',
			status: 0,
			type: 'n/a',
		});
		return { locationData: null, error };
	}
};
