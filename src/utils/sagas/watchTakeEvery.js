/**
 * reusable take every
 */
import { takeEvery } from 'redux-saga/effects';

export default function* (action, cb, store) {
	while (true) {
		try {
			return yield takeEvery(action, cb, store);
		} catch (error) {
			console.log(error);
		}
	}
}
