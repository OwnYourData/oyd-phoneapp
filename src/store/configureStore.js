import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware, { END } from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
	applyMiddleware(sagaMiddleware),
	(__DEV__ && global.reduxNativeDevToolsCompose) ? // eslint-disable-line no-undef
		global.reduxNativeDevToolsCompose(/* options */) :
		nope => nope
);

export default (rootReducer, initialState = {}) => {
	const store = createStore(rootReducer, initialState, enhancer);
	persistStore(store);

	if (__DEV__ && global.reduxNativeDevTools) { // eslint-disable-line no-undef
		global.reduxNativeDevToolsCompose(store);
	}

	store.actions = {};
	store.runSaga = (saga) => {
		sagaMiddleware.run(saga);
	};

	store.close = () => store.dispatch(END);
	return store;
};
