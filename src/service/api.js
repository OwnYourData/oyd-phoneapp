import { AsyncStorage } from 'react-native';
import { has } from 'lodash';
import { captureSentryMessage } from '../utils/captureSentryMessage';

/**
 * Manages api calls
 */
export default class {
	constructor() {
		this.count = 0;
	}

	/**
	 * Gets an item from Async Storage
	 * @returns {Promise.<*>}
	 */
	getAsyncStorage = async (item) => {
		try {
			const value = await AsyncStorage.getItem(item);
			if (value !== null) return { [item]: value };
			return { [item]: '' };
		} catch (error) {
			await captureSentryMessage({
				error: JSON.stringify(error),
				message: 'getAsyncStorage method',
				status: 0,
				type: 'n/a'
			});
		}
	};
	/**
	 * Bearer Api Call
	 */
	request = async (params:string, type:string = 'get', bodyObj:mixed = null):Object => {
		const { authToken } = await this.getAsyncStorage('authToken');
		const { vaultUrl } = await this.getAsyncStorage('vaultUrl');

		const isNotBearer = params.includes('https');

		const uri = isNotBearer ? params : `${vaultUrl}${params}`;
		const method = type;
		const body = bodyObj && JSON.stringify(bodyObj);
		console.log('uri', uri);
		console.log('body', body);
		let headers = {
			'Content-Type': 'application/json'
		};
		if (!isNotBearer) {
			headers = {
				Authorization: `Bearer ${authToken}`,
				'Content-Type': 'application/json'
			};
		}

		let request = { method, headers };

		if (body !== null) request = { method, headers, body };
		try {
			const response:string = await fetch(uri, request);
			if (this.count < 15 && has(response, 'respInfo') && (response.status === 500 || response.status === 504 || response.status === 502)) {
				this.callAgain(params, type, bodyObj);
				this.count++;
			}
			const { _bodyText, status } = response;
			return { response: { data: _bodyText, respInfo: { status } } };
		} catch (error) {
			await captureSentryMessage({
				message: 'request',
				error
			});
			return { error, response: { data: params, respInfo: { status: 500 } } };
		}
	};


	get = async endpoint => this.request(endpoint, 'GET');
	post = async (endpoint, body) => this.request(endpoint, 'POST', body);

	callAgain = (params, type, bodyObj) => this.connect(params, type, bodyObj);
}
