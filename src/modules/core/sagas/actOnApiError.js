import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { values } from 'lodash';
import { nav } from '../../../config/index';
import { captureSentryMessage } from '../../../utils/captureSentryMessage';

let count = 0;
/**
 * reset an models or lightboxes
 */
const closeOverlays = () => {
	nav.dismissModal();
	nav.dismissLightBox();
};

export default function* (args) {
	const {
		status,
		error,
		message,
		type,
		cb,
		params,
		onError
	} = args;
	/**
	 * Send status errors to sentry
	 */
	if (status === null || (status > 399 && status < 600)) {
		yield call(captureSentryMessage, {
			status, message, params, type
		});
	}
	/**
	 * BAD BAD ERROR
	 */
	if (error) {
		yield call(closeOverlays);
		yield delay(1000);
		return false;
	}
	/**
	 * Attempting to call the api again status will return null when finished
	 */
	if (cb && status === 500 && count < 10) {
		yield delay(2000);
		yield put(cb(...values(params)));
		count++;
		return false;
	}
	if (status === 500 && count === 10) {
		yield call(closeOverlays);
		yield delay(1000);
		return false;
	}
	/**
	 * If we dont have a call back function and get 500
	 */
	if (status === 500 && cb === null) {
		yield call(closeOverlays);
		yield delay(1000);
		return false;
	}
	/**
	 * Check status errors
	 */
	if (status === null || (status > 399 && status < 600)) {
		if (status !== 404 && type !== 'Customer Data') {
			yield call(closeOverlays);
			yield delay(1000);
			yield put(onError({ status, message, type }));
			return false;
		}
		return false;
	}

	return true;
}
