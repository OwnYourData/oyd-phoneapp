import { put, call, select } from 'redux-saga/effects';
import moment from 'moment';
import { has } from 'lodash';
import { actOnApiError } from '../../core/sagas/index';
import { setLocationData } from '../../../utils/asyncStore';
/**
 * Responds to getting a list of module apps, throw an error if something is wrong, or carry on.
 */
export default function* ({ actions }:mixed, action:mixed) {
	const { response: { data, respInfo: { status } }, error } = action.payload;

	const isPostingBackgroundLocation = yield select(state => state.core.get('isPostingBackgroundLocation'));

	if (status !== 200 || error) {
		let dataObj = '';
		try {
			dataObj = JSON.parse(data);
		} catch (e) {
			yield call(actOnApiError, {
				status, error: e, cb: null, params: null, onError: actions.onError
			});
			yield put(actions.onSetOauthToken({ error: true }));
		}

		let errorText = 'Please try again later';
		if (has(dataObj, 'error')) errorText = dataObj.error;

		yield put(actions.onResetPostData({ isPostingBackgroundLocation: false }));
		yield put(actions.onPostLocationDataError({ hasError: true, errorText }));
	}
	/**
	 * Check status errors
	 */
	const message = 'Error posting location data';
	const type = 'postLocationData';
	const hasNoErrors = yield call(actOnApiError, {
		status, error, message, type, cb: null, params: null, onError: actions.onError
	});
	if (!hasNoErrors) return;

	if (isPostingBackgroundLocation) {
		yield call(setLocationData, '[]');
		yield put(actions.onBackgroundDataEmpty({ backgroundDataEmpty: true }));
		yield put(actions.onResetPostData({ isPostingBackgroundLocation: false }));
	}

	yield put(actions.onAddLastLocationUploadTime({ lastUploadTime: moment().format('MMM Do YYYY H:mma') }));
	yield put(actions.onClearLocationData());
}
