import { Record, Map, List } from 'immutable';

export default Record({
	route: {
		key: 'CORE',
		animationType: 'fade',
		disableOpenGesture: true,
		passProps: {}
	},
	platform: null,
	version: null,
	isPosting: false,
	isPostingBackgroundLocation: false,
	scene: {},
	user: Map(),
	vaultUrl: 'https://data-vault.eu',
	locationData: List(),
	showError: false,
	errorMessage: {},
	showToastMessage: false,
	backgroundDataEmpty: true
}, 'core');
