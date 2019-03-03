/* eslint-disable no-undef */
import { Sentry, SentryLog } from 'react-native-sentry';
import initApp from './src/App';

if (!__DEV__) {
	Sentry.config('https://c62993015ba14a1da34c1e10abe6aaf8:cd58e1bdc0254db293260e209967b649@sentry.io/1050784', {
		logLevel: SentryLog.Verbose
	}).install();
}

initApp();

console.disableYellowBox = true; // eslint-disable-line
