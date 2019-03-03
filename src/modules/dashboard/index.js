import { onModuleList } from './sagas';
import { Main } from './reducers';
import InitialState from './initialState';
import Api from './services';
import i18n from './i18n';

import Dashboard from './Dashboard';
import AppDetail from './AppDetail';

const api = new Api;

export default {
	namespace: 'DASHBOARD',
	InitialState,
	i18n,

	routes: {
		component: Dashboard,
		subroutes: [
			{
				component: AppDetail,
				key: 'APP_DETAIL'
			}
		],
	},

	actions: [
		{ name: 'persist/REHYDRATE', reducer: [Main, 'rehydrates'] },
		{ name: 'ON_SET_MODULE_LIST', reducer: [Main, 'onSetModuleList'] },
		{ name: 'SETTINGS/ON_LOG_OUT', reducer: [Main, 'onLogOut'] },
		{
			name: 'ON_GET_MODULE_LIST',
			reducer: [Main, 'updateSingleSet', ['isFetching', 'isFetching']],
			saga: {
				fn: api.getModuleList,
				cb: onModuleList,
			}
		},
	],

	stateToProps: state => ({
		repoForLocationData: state.settings.get('repoForLocationData'),
		email: state.auth.get('email'),
		password: state.auth.get('password'),
		appList: state.dashboard.get('appList'),
		hasError: state.dashboard.get('hasError'),
		isFetching: state.dashboard.get('isFetching'),
		vaultUrl: state.core.get('vaultUrl'),
		locationData: state.core.get('locationData'),
		privateKey: state.auth.get('credentials').privateKey,
		nonce: state.auth.get('credentials').nonce,
	}),
};
