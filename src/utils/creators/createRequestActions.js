import { actionCreator } from '../';

/**
 * Create request types
 * @param requestActionType
 * @returns {{request, success, failure}}
 */
export default requestActionType => ({
	request: request => actionCreator(requestActionType.REQUEST, { request }),
	success: response => actionCreator(requestActionType.SUCCESS, { response }),
	failure: error => actionCreator(requestActionType.FAILURE, { error })
});
