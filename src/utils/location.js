import { Platform, PermissionsAndroid, NetInfo } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import FusedLocation from 'react-native-fused-location';
import { captureSentryMessage } from './captureSentryMessage';

/**
 * Class to get location data
 */
export default class AppLocation {
	constructor() {
		this.watchID = null;
		this.isBackground = false;
	}

	unWatch() {
		if (Platform.OS === 'android') {
			FusedLocation.stopLocationUpdates();
			return;
		}
		if (this.watchID) {
			navigator.geolocation.clearWatch(this.watchID);
		}
	}

	async init(isBackground:boolean = false) {
		try {
			this.isBackground = isBackground;
			if (Platform.OS === 'android') return this.androidPermissions();
			return this.watchLocation();
		} catch (error) {
			await captureSentryMessage({ error: JSON.stringify(error), message: 'init isBackground method' });
			return { position: null, error };
		}
	}

	async watchLocation() {
		try {
			return new Promise((resolve) => {
				this.watchID = navigator.geolocation.getCurrentPosition((position) => {
					resolve({ position: position.coords, error: null });
				}, error => (resolve({ position: null, error })));
			});
		} catch (error) {
			await captureSentryMessage({ error: JSON.stringify(error), message: 'watchLocation method' });
			return { position: null, error };
		}
	}

	async androidPermissions() {
		try {
			const { type } = await NetInfo.getConnectionInfo();

			const isConnected = (type !== 'none' && type !== 'unknown');
			let granted = null;
			if (!this.isBackground) {
				granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
					{
						title: 'Location',
						message: 'OwnYourData needs access to your location.'
					}
				);
			}
			if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === true || this.isBackground) {
				// Doesn't work when in airplane mode.
				if (!this.isBackground && isConnected) await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 });

				FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);
				const position = await FusedLocation.getFusedLocation();
				return { position, error: null };
			}
			return { position: null, error: true };
		} catch (error) {
			await captureSentryMessage({ error: JSON.stringify(error), message: 'androidPermissions method' });
			return { position: null, error };
		}
	}
}
