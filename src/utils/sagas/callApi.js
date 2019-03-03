import { fork } from 'redux-saga/effects';

import { watchAsyncAction, watchTakeEvery } from '../';
/**
 * Watches for the action to be performed asynchronously, calls api function
 * and dispatches  request, success, and failure actions
 * @param actionType type of the action
 * @param cb call back func
 * @param store
 * @param apiFn api function to call
 */
export default (actionType, cb, store, apiFn) => ([
	fork(watchAsyncAction, actionType, apiFn),
	fork(watchTakeEvery, `${actionType}_SUCCESS`, cb, store),
	fork(watchTakeEvery, `${actionType}_FAILURE`, cb, store)
]);
