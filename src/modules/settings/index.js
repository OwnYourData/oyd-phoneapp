import { onPostLocationData } from './sagas';
import { Main } from './reducers';
import InitialState from './initialState';
import Api from './services';
import i18n from './i18n';

import Settings from './Settings';

const api = new Api;

export default {
	namespace: 'SETTINGS',
	InitialState,
	i18n,

	routes: {
		component: Settings,
	},

	actions: [
		{ name: 'persist/REHYDRATE', reducer: [Main, 'rehydrates'] },
		{ name: 'ON_ADD_LAST_LOCATION_UPLOAD_TIME', reducer: [Main, 'updateSingleSet', ['lastUploadTime', 'lastUploadTime']] },
		{ name: 'ON_CHANGE_LOGIN_INPUT', reducer: [Main, 'onChangeInput'] },
		{ name: 'ON_POST_LOCATION_DATA_ERROR', reducer: [Main, 'onPostLocationDataError'] },
		{ name: 'ON_LOG_OUT', reducer: [Main, 'onLogOut'] },
		{ name: 'CORE/ON_CLEAR_LOCATION_DATA', reducer: [Main, 'onClearLocationData'] },

		{
			name: 'ON_POST_LOCATION_DATA',
			reducer: [Main, 'onIsPosting'],
			saga: {
				fn: api.postLocationData,
				cb: onPostLocationData,
			}
		},
	],

	stateToProps: state => ({
		backgroundDataEmpty: state.core.get('backgroundDataEmpty'),
		email: state.auth.get('email'),
		password: state.auth.get('password'),
		vaultUrl: state.auth.get('vaultUrl'),
		locationData: state.core.get('locationData'),
		user: state.core.get('user'),
		repoForLocationData: state.settings.get('repoForLocationData'),
		lastUploadTime: state.settings.get('lastUploadTime'),
		hasError: state.settings.get('hasError'),
		errorText: state.settings.get('errorText'),
		isPosting: state.settings.get('isPosting'),
	}),
};
