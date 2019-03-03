import { call, all, put } from 'redux-saga/effects';

import { getLocationData, getIdentifier } from '../../../utils/asyncStore';
import { initEncryptedData } from '../../../utils/index';
import { captureSentryMessage } from '../../../utils/captureSentryMessage';

type Actions = {
	onAddLastLocationUploadTime:void,
	onBackgroundDataEmpty:void,
	onPostLocationData:void
}
/**
 * Gets the stored location data and posts
 */
export default function* ({ actions }:Actions) {
	const { locationData } = yield call(getLocationData);
	if (locationData && locationData.length > 0) {
		const locationArray = yield all(locationData.map(l => call(initEncryptedData, l, false)));

		const data = JSON.stringify(locationArray);
		const { identifier, error } = yield call(getIdentifier);

		if (error) {
			yield call(captureSentryMessage, {
				status: 0, message: 'onParseStoredLocationData method: getIdentifier', params: null, type: 'n/a'
			});
		}
		yield put(actions.onPostLocationData({
			identifier,
			data,
			isPostingBackgroundLocation: true
		}));
	}
}
