/* eslint-disable no-undef */
import { Sentry, SentryLog } from 'react-native-sentry';
import initApp from './src/App';

if (!__DEV__) {
	Sentry.config('https://xxx:xxx@sentry.io/1050784', {
		logLevel: SentryLog.Verbose
	}).install();
}

initApp();

console.disableYellowBox = true; // eslint-disable-line
