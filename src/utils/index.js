import { Dimensions, Platform } from 'react-native';
/**
 * merge action into one object
 */
export { default as mergeActions } from './mergeActions';
/**
 * creators
 */
export { default as actionCreator } from './creators/actionCreator';
export { default as createRequestActions } from './creators/createRequestActions';
export { default as createRequestTypes } from './creators/createRequestTypes';
/**
 * saga helpers
 */
export { default as listenTo } from './sagas/listenTo';
export { default as callApi } from './sagas/callApi';
export { default as watchTakeEvery } from './sagas/watchTakeEvery';
export { default as watchAsyncAction } from './sagas/watchAsyncAction';
export { default as fetchEntity } from './sagas/fetchEntity';
/**
 * misc
 */
export { default as backgroundTask } from './backgroundTask';
export { encrypt, generateKeys } from './encryption'; // eslint-disable-line import/extensions, import/no-unresolved
export { injectLocale, getUsedLocale } from './i18n';
const dimensions = Dimensions.get('window');
export const { height, width } = dimensions;
export const isIos = (Platform.OS === 'ios');
export { default as getLocation } from './backgroundLocation';
export { initBackgroundTask } from './backgroundLocation';
export { captureSentryMessage } from './captureSentryMessage';
export { default as initEncryptedData } from './initEncryptedData';
export { linkTo } from './commonRN';
