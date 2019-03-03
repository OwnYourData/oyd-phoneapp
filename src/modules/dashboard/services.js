import { api } from '../../service/';

/**
 * Dashboard Service
 */
export default class extends api {
	/**
	 * Gets a list of modules
	 */
	getModuleList = async ():Object<{}> => (this.get('/api/modules/index'));
}
