import React from 'react';
import { NativeModules } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { postLocationData, storeBackgroundLocationData } from '../../utils/backgroundLocation';

export default class extends React.Component {
	componentWillMount() {
		// This handler fires whenever bgGeo receives a location update.
		BackgroundGeolocation.on('location', this.onLocation, this.onError);

		BackgroundGeolocation.ready({
			// Geolocation Config
			desiredAccuracy: 0,
			distanceFilter: 50,
			// Activity Recognition
			stopTimeout: 1,
			// Application config
			debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
			// logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
			stopOnTerminate: false,
			startOnBoot: true,
			disableMotionActivityUpdates: true,
			activityType: BackgroundGeolocation.ACTIVITY_TYPE_OTHER
		}, (state) => {
			console.log('- BackgroundGeolocation is configured and ready: ', state.enabled);

			if (!state.enabled) {
				BackgroundGeolocation.start(() => {
					console.log('- Start success');
				});
			}
		});
	}

	// You must remove listeners when your component unmounts
	componentWillUnmount() {
		BackgroundGeolocation.removeListeners();
	}

	async onLocation({ coords }) {
		try {
			const { getWifi } = NativeModules.WifiCheck;
			const isWiFi = await getWifi();
			// eslint-disable-next-line no-param-reassign
			coords.timestamp = +new Date;
			if (isWiFi) return postLocationData(coords);

			if (!isWiFi) return storeBackgroundLocationData(coords);

			console.log('- [event] location: ', coords);
		} catch (e) {
			console.log(e);
		}
	}

	onError(error) {
		console.warn('- [event] location error ', error);
	}

}
