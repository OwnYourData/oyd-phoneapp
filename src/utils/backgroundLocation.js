import Permissions from 'react-native-permissions';
import { NativeModules } from 'react-native';

import AppLocation from './location';
import PostLocationApi from '../modules/settings/services';
import TokenApi from '../modules/core/services';
import { captureSentryMessage, initEncryptedData } from './index';
import { setLocationData, getLocationData, storeAccessToken, getEmailPassword, getIdentifier } from './asyncStore';

/**
 * Initialises background location task.
 */
export const initBackgroundTask = async () => {
	try {
		/**
		 * ## Check if the permissions are set before we get the location data
		 */
		const response = await Permissions.check('location');
		if (response === 'authorized') await getLocation(true);
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'initBackgroundTask method',
			status: 0,
			type: 'n/a'
		});
		return { error };
	}
};
/**
 * Used to get the user location when the app is in the background
 */
export const getLocation = async (isBackground:boolean = false) => {
	/**
	 * ## Init location class
	 */
	try {
		const appLocation = new AppLocation();
		const { position, error } = await appLocation.init(isBackground);
		position.timestamp = +new Date;
		if (error && isBackground) {
			await captureSentryMessage({
				error: JSON.stringify(error),
				message: 'appLocation method: error getting location data',
				status: 0,
				type: 'n/a'
			});
			return appLocation.unWatch();
		}
		if (isBackground) {
			const { getWifi } = NativeModules.WifiCheck;
			const isWiFi = await getWifi();
			if (isBackground && isWiFi) return await postLocationData(position);

			if (isBackground && !isWiFi) return await storeBackgroundLocationData(position);
		}
		appLocation.unWatch();
		return { position, error };
	} catch (err) {
		await captureSentryMessage({
			error: JSON.stringify(err),
			message: 'getLocation method',
			status: 0,
			type: 'n/a'
		});
		return { err };
	}
};
/**
 * If we have an internet connection and in background mode post the location data
 */
export const postLocationData = async (position:mixed) => {
	try {
		const { success } = await onRefreshToken();
		if (!success) {
			await captureSentryMessage({
				error: 'postLocationData',
				message: 'error refreshing token in the background',
				status: 0,
				type: 'n/a'
			});
			return;
		}
		const { data, identifier } = await initEncryptedData(position);
		const dataObj = [data];
		const { response } = await postApi(identifier, dataObj, position);
		if (response.respInfo.status === 200) {
			await checkLeftOverLocationData();
		}
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'postLocationData method',
			status: 0,
			type: 'n/a'
		});
		return { error };
	}
};
/**
 * Connect and Post the location data
 */
const postApi = async (identifier, data, position = {}, store = true) => {
	const postLocationApi = new PostLocationApi;
	const { response } = await postLocationApi.postLocationData(identifier, data);
	if (response.respInfo.status !== 200) {
		await captureSentryMessage({
			message: 'postLocationData error posting',
			status: response.respInfo.status
		});
		if (store) await storeBackgroundLocationData(position);
	}
	return { response };
};
/**
 * Store location data to async storage
 */
export const storeBackgroundLocationData = async (position) => {
	try {
		const { locationData } = await getLocationData();
		console.log('locationData', locationData);
		if (locationData) {
			locationData.push(position);
			await setLocationData(JSON.stringify(locationData));
		}
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'storeBackgroundLocationData method',
			status: 0,
			type: 'n/a'
		});
		return { error };
	}
};
/**
 * Refresh token
 */
export const onRefreshToken = async () => {
	try {
		const { emailPassword, error } = await getEmailPassword();
		if (error) {
			return await captureSentryMessage({
				error: JSON.stringify(error),
				message: 'onRefreshToken method',
				status: 0,
				type: 'n/a'
			});
		}
		const tokenApi = new TokenApi;
		const { email, password } = emailPassword;
		const { response } = await tokenApi.refreshOauthToken(email, password);
		const { respInfo, data } = response;
		if (respInfo.status === 200) {
			const dataObjToken = JSON.parse(data);
			await storeAccessToken(dataObjToken.access_token); // eslint-disable-line camelcase
			return { success: true, status: 200 };
		}
		return { success: false, status: respInfo.status };
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'onRefreshToken method',
			status: 0,
			type: 'n/a'
		});
		return { error };
	}
};
/**
 * Checks if any location data is stored in local storage and posts
 */
const checkLeftOverLocationData = async () => {
	try {
		const { identifier, error } = await getIdentifier();
		if (error) {
			await captureSentryMessage({
				error: JSON.stringify(error),
				message: 'checkLeftOverLocationData method : getIdentifier',
				status: 0,
				type: 'n/a'
			});
		}
		const { locationData } = await getLocationData();

		if (locationData && locationData.length > 0) {
			const promises = locationData.map(location => initEncryptedData(location, false));
			const data = await Promise.all(promises);
			const { response } = await postApi(identifier, data, {}, false);
			if (response.respInfo.status === 200) await setLocationData('[]');
		}
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'checkLeftOverLocationData method',
			status: 0,
			type: 'n/a'
		});
	}
};

export default getLocation;

