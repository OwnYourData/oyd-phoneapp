import Launch from './Launch';
import Error from './Error';

import { Core as Main } from './reducers';
import InitialState from './initialState';
import { onRefreshOauthToken, onParseStoredLocationData } from './sagas';
import Api from './services';
import i18n from './i18n';

const api = new Api;

export default {
	namespace: 'CORE',
	InitialState,
	i18n,

	routes: {
		component: Launch,
		subroutes: [
			{
				component: Error,
				key: 'ERROR'
			}
		]
	},

	actions: [
		{ name: 'persist/REHYDRATE', reducer: [Main, 'rehydrates'] },
		{ name: 'UPDATE_LOCATION_DATA', reducer: [Main, 'onUpdateLocationData'] },
		{ name: 'ON_CLEAR_LOCATION_DATA', reducer: [Main, 'onClearLocationData'] },

		{ name: 'ON_SET_PLATFORM', reducer: [Main, 'updateSingleSet', ['platform', 'platform']] },
		{ name: 'ON_SET_VERSION', reducer: [Main, 'updateSingleSet', ['version', 'version']] },
		{ name: 'ON_ROOT_SINGLE_SCREEN_APP', reducer: [Main, 'rootChange'] },
		{ name: 'ON_HIDE_ERROR', reducer: [Main, 'updateSingleSet', ['showError', 'showError']] },
		{ name: 'ON_BACKGROUND_DATA_EMPTY', reducer: [Main, 'updateSingleSet', ['backgroundDataEmpty', 'backgroundDataEmpty']] },
		{ name: 'ON_RESET_POST_DATA', reducer: [Main, 'updateSingleSet', ['isPostingBackgroundLocation', 'isPostingBackgroundLocation']] },
		{ name: 'ON_ERROR', reducer: [Main, 'setErrorMessage'] },
		{ name: 'ON_SCREEN_CHANGED_EVENT', reducer: [Main, 'screenEvent'] },

		{ name: 'AUTH/ON_SET_OAUTH_TOKEN', reducer: [Main, 'onSetOauthToken'] },
		{ name: 'AUTH/ON_CHANGE_LOGIN_INPUT', reducer: [Main, 'onChangeInput'] },
		{ name: 'AUTH/ON_PARSE_QR_CODE', reducer: [Main, 'onParseQrCode'] },
		{ name: 'SETTINGS/ON_LOG_OUT', reducer: [Main, 'onLogOut'] },
		{ name: 'SETTINGS/ON_POST_LOCATION_DATA', reducer: [Main, 'updateSingleSet', ['isPostingBackgroundLocation', 'isPostingBackgroundLocation']] },
		{
			name: 'ON_PARSE_STORED_LOCATION_DATA',
			saga: {
				cb: onParseStoredLocationData
			}
		},
		{
			name: 'ON_REFRESH_OAUTH_TOKEN',
			saga: {
				fn: api.refreshOauthToken,
				cb: onRefreshOauthToken
			}
		}
	],

	stateToProps: state => ({
		repoForLocationData: state.settings.get('repoForLocationData'),
		platform: state.core.get('platform'),
		user: state.core.get('user')
	})
};
