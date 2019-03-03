import { takeEvery, call } from 'redux-saga/effects';

import { createRequestActions, createRequestTypes, fetchEntity } from '../';
/**
 * watches for the action to be performed asynchronously , calls api function
 * and dispatches  request, success, and failure actions
 * @param actionType type of the action
 * @param apiFn api function to call
 */
export default function* (actionType, apiFn) {
	yield takeEvery(actionType, function* (action) {
		const entity = createRequestActions(createRequestTypes(action.type));
		const arr = Object.keys(action.payload).map(key => (action.payload[key]));

		return yield call(fetchEntity.bind(null, entity, apiFn, ...arr));
	});
}
