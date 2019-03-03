import { Record, List } from 'immutable';

export default Record({
	appList: List(),
	isFetching: false,
	hasError: false,
}, 'dashboard');
