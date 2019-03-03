import { Record } from 'immutable';

export default Record({
	repoForLocationData: 'oyd.location',
	isPosting: false,
	hasError: false,
	errorText: '',
	lastUploadTime: null
}, 'settings');
