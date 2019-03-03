import React from 'react';
import { Platform, AppRegistry } from 'react-native';
import { Navigation, NativeEventsReceiver } from 'react-native-navigation';
import { captureSentryMessage } from './utils/captureSentryMessage';
import { nav, registerModules } from './config/index';
import { initBackgroundTask, backgroundTask } from './utils';

/**
 * ## Configure the store and init the roots
 */
let store = null;
/**
 * ## Initialize background tasks
 */
const headlessTask = async () => {
	console.log('##################### >>> BackgroundTask ini!');
	await initBackgroundTask();
	backgroundTask.finish();
};
backgroundTask.define(headlessTask);
if (Platform.OS === 'android') {
	// Register your BackgroundFetch HeadlessTask
	AppRegistry.registerHeadlessTask('BackgroundFetch', () => headlessTask);
}
/**
 * Navigation parameters
 */
type Nav = {
	key:string,
	animationType:string,
	passProps:mixed
}

/**
 * App launches and registers a single screen application
 * calling initialView first.
 */
class App extends React.Component<{}> {
	static start = ({ key = 'CORE', animationType, passProps }:Nav) => nav.startSingleScreenApp(key, animationType, passProps);

	constructor(props:mixed) {
		super(props);
		this.currentRoot = '';
		store.subscribe(this.onRouteUpdate.bind(this));
	}

	onRouteUpdate = () => {
		const route = store.getState().core.get('route');
		// handle a root change
		if (this.currentRoot !== route.key && route.passProps) {
			this.currentRoot = route.key;
			App.start(route);
		}
	};
}

const startApp = async () => {
	store = await registerModules();
	const app = new App;
	app.onRouteUpdate();
};

export default async () => {
	if (Platform.OS === 'ios') return startApp();
	Promise.resolve(Navigation.isAppLaunched())
		.then(async (appLaunched) => {
			if (appLaunched) {
				await startApp(); // App is launched -> show UI
			} else {
				new NativeEventsReceiver().appLaunched(startApp); // App hasn't been launched yet -> show the UI only when needed.
			}
		})
		.catch(async (error) => {
			console.log(error);
			await captureSentryMessage({
				error: JSON.stringify(error),
				message: 'Error while starting App: isAppLaunched method',
				status: 0,
				type: 'n/a',
			});
		});
};
