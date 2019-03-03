import { AsyncStorage } from 'react-native';
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
		const message = 'Error Logging in';
		const type = 'login';

		if (status !== 200 || error) return yield put(actions.onSetOauthToken({ error: true }));

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
		const storeAccess = yield call(storeAccessToken, access_token);

		if (!storeAccess) {
			yield call(actOnApiError, {
				status, error, message, type, cb: null, params: null, onError: actions.onError
			});
		}

		yield put(actions.onSetOauthToken({ data: dataObj, error: false }));
	} catch (e) {
		const message = 'Error Logging in';
		const type = 'login';
		yield call(actOnApiError, {
			status: 500, error: e, message, type, cb: null, params: null, onError: actions.onError
		});
		yield put(actions.onSetOauthToken({ error: true }));
	}
}
/**
 * Store auth token
 */
const storeAccessToken = async (authToken:string):Object => {
	try {
		await AsyncStorage.setItem('authToken', authToken);
		return true;
	} catch (error) {
		return false;
	}
};
