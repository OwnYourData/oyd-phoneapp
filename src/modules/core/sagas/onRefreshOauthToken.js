import { call, put } from 'redux-saga/effects';
import { storeAccessToken } from '../../../utils/asyncStore';
import { actOnApiError } from './index';

/**
 * Responds to login, throw an error if credentials are wrong, of carry on.
 */
export default function* ({ actions }:mixed, action:mixed) {
	const { response: { data, respInfo: { status } }, error } = action.payload;

	if (status !== 200 || error) {
		yield call(storeAccessToken, '');
	}
	/**
	 * Check status errors
	 */
	const message = 'Error Refreshing token';
	const type = 'logout';
	const hasNoErrors = yield call(actOnApiError, {
		status, error, message, type, cb: null, params: null, onError: actions.onError
	});
	if (!hasNoErrors) return;

	let dataObj = '';
	try {
		dataObj = JSON.parse(data);
	} catch (e) {
		yield call(actOnApiError, {
			status, error: e, message, type, cb: null, params: null, onError: actions.onError
		});
		yield put(actions.onSetOauthToken({ error: true }));
	}
	const { access_token } = dataObj; // eslint-disable-line camelcase
	yield call(storeAccessToken, access_token);
	yield put(actions.onSetOauthToken({ data: dataObj, error: false }));
}
