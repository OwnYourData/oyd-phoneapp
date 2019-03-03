import { put, call } from 'redux-saga/effects';
import { actOnApiError } from '../../core/sagas/index';

/**
 * Responds to login, throw an error if credentials are wrong, of carry on.
 */
export default function* ({ actions }:mixed, action:mixed) {
	try {
		const { response: { data, respInfo: { status } }, error } = action.payload;
		/**
		 * Check status errors
		 */
		const message = 'Error Registering in';
		const type = 'register';

		let dataObj = '';
		try {
			dataObj = JSON.parse(data);
		} catch (e) {
			yield call(actOnApiError, {
				status, error: e, message, type, cb: null, params: null, onError: actions.onError
			});
			yield put(actions.onSetOauthToken({ error: true }));
		}
		if (status !== 200 || error) return yield put(actions.onRegisterError({ registerErrorMessage: dataObj.message }));

		yield put(actions.onRegisterSuccess({ registerSuccess: true }));

	} catch (e) {
		const message = 'Error Logging in';
		const type = 'login';
		yield call(actOnApiError, {
			status: 500, error: e, message, type, cb: null, params: null, onError: actions.onError
		});
		yield put(actions.onSetOauthToken({ error: true }));
	}
}

