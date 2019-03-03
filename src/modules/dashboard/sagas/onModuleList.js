import { put, select, call } from 'redux-saga/effects';
import { actOnApiError } from '../../core/sagas/index';

/**
 * Responds to getting alist of module apps, throw an error if something is wrong, or carry on.
 */
export default function* ({ actions }:mixed, action:mixed) {
	try {
		const { response: { data, respInfo: { status } }, error } = action.payload;

		if (status === 401) {
			const { email, password } = yield select(state => state.auth);
			return yield put(actions.onRefreshOauthToken({ email, password, isFetching: true }));
		}

		if (status !== 200 || error) yield put(actions.onSetModuleList({ error: true }));

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
		yield put(actions.onSetModuleList({ data: dataObj, error: false }));
	} catch (e) {
		yield put(actions.onSetModuleList({ error: true }));
	}
}
