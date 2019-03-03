import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import modules from '../modules';
import { registerContainer } from './';
import configureStore from '../store/configureStore';

import { actionCreator } from '../utils';

export default () =>
	new Promise((resolve) => {
		const container = [];
		const rootReducer = {};
		let coreActions = {};

		modules.forEach((module) => {
			const {
				namespace,
				i18n,
				InitialState,
				routes,
				actions,
				stateToProps,
			} = module;

			const key = namespace.toLowerCase();
			const initialState = new InitialState;

			const moduleActions = {};
			const moduleSagas = [];
			const moduleReducer = [];

			actions.forEach((action) => {
				const { name, reducer, saga } = action;

				let type = name;
				if (!name.includes('/')) {
					type = `${namespace}/${name}`;

					if (name) {
						const actionFuncName = name.toLowerCase().replace(/(_\w)/g, m => m[1].toUpperCase());
						moduleActions[actionFuncName] = args => actionCreator(type, { ...args });
					}
				}

				if (saga) {
					const { fn, cb } = saga;
					moduleSagas.push([type, cb, fn]);
				}

				if (reducer) {
					moduleReducer.push({
						type,
						reducer: { class: reducer[0], func: reducer[1], params: reducer[2] || [] },
					});
				}
			});

			if (key === 'core') {
				coreActions = moduleActions;
				moduleActions.length = 0;
			}

			rootReducer[key] = (state = initialState, action) => {
				if (!(state instanceof InitialState)) {
					return initialState.merge(state);
				}
				moduleReducer.forEach((cases) => {
					if (action.type === cases.type) {
						const callBackClass = new cases.reducer.class(action, state);
						state = callBackClass[cases.reducer.func](...cases.reducer.params); // eslint-disable-line no-param-reassign
						return state;
					}
				});

				return state;
			};

			const { component, subroutes } = routes;
			container.push(store =>
				registerContainer(
					store,
					{
						actions: moduleActions,
						coreActions,
						sagas: moduleSagas,
						namespace,
						i18n,
						component,
						stateToProps,
					},
				));

			if (subroutes) {
				subroutes.forEach((subroute) => {
					container.push(store =>
						registerContainer(
							store,
							{
								actions: moduleActions,
								coreActions,
								namespace: `${namespace}/${subroute.key}`,
								i18n,
								component: subroute.component,
								stateToProps,
							},
						));
				});
			}
		});
		const rootConfig = {
			key: 'root',
			debug: true,
			transforms: [immutableTransform()],
			storage,
			stateReconciler: hardSet,
		};
		const store = configureStore(persistReducer(rootConfig, combineReducers(rootReducer)));
		container.forEach(c => c(store));
		resolve(store);
	});
