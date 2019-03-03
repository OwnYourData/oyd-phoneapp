import { put, call } from 'redux-saga/effects';

/**
 * helper function to call api function
 */
export default function* (entity, apiFn, ...params) {
	try {
		yield put(entity.request(params));
		const { response, error } = yield call(apiFn, ...params);
		if (response) {
			yield put(entity.success(response));
		} else {
			yield put(entity.failure(error));
		}
		return { response, error };
	} catch (error) {
		console.error(error);
	}
}
