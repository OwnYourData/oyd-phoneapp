import {
	Sentry,
	SentrySeverity
} from 'react-native-sentry';
/**
 * Send errors to Sentry
 */
export const captureSentryMessage = args => Sentry.captureMessage('Act On Api Error', {
	level: SentrySeverity.Info,
	message: { ...args }
});
