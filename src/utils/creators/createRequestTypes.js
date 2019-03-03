import { forEach, set } from 'lodash';

const types = {
	REQUEST: 'REQUEST',
	SUCCESS: 'SUCCESS',
	FAILURE: 'FAILURE'
};

/**
 * asyc dispact action creator
 * @param base
 * @returns {{}}
 */
export default (base) => {
	const res = {};
	forEach([types.REQUEST, types.SUCCESS, types.FAILURE], type => set(res, type, `${base}_${type}`));
	return res;
};
