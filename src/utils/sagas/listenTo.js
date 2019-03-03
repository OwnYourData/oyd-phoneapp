import { fork } from 'redux-saga/effects';

import { watchTakeEvery } from '../';

/**
 * watches for the action to be performed, and calls function
 * to act on
 * @param actionType type of the action
 * @param cb call back func
 * @param store
 */
export default (actionType, cb, store) => (fork(watchTakeEvery, actionType, cb, store));
