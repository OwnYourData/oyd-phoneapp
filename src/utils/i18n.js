import { NativeModules, Platform } from 'react-native';
import I18n from 'react-native-i18n';
import { merge, forOwn } from 'lodash';

const lang = {
	en: {},
	de: {}
};

I18n.fallbacks = true;

I18n.translations = {
	'en-US': lang.en,
	'en-GB': lang.en,
	en: lang.en,
	de: lang.de

};

I18n.defaultLocale = 'en';

export const injectLocale = (local) => {
	forOwn(local, (l, k) => merge(lang[k], local[k]));

	return I18n;
};

export const getUsedLocale = () => {
	let deviceLocal;
	if (Platform.OS === 'android') {
		deviceLocal = NativeModules.I18nManager.localeIdentifier;
	} else {
		deviceLocal = NativeModules.SettingsManager.settings.AppleLocale;
	}
	const dl = deviceLocal.slice(0, 2);

	if (dl === 'en') return dl;
	if (dl === 'de') return dl;

	return I18n.defaultLocale;
};

export default I18n;
