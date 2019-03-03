import { has } from 'lodash';
import { Core } from '../../core/reducers/';

export default class extends Core {
	constructor(action:mixed, state:mixed) {
		super(action, state);
		this.action = action;
		this.state = state;
	}

	/**
	 * Resets the state
	 */
	onLogOut = ():Object<{}> =>
		this.state
			.set('repoForLocationData', 'oyd.location')
			.set('errorText', '')
			.set('hasError', false)
			.set('isPosting', false);
	/**
	 * Sets whether or not were posting location data
	 */
	onIsPosting = ():Object<{}> =>
		(this.state
			.set('hasError', false)
			.set('errorText', '')
			.set('isPosting', !this.state.get('isPosting')));
	/**
	 * Resets posting params
	 */
	onClearLocationData = ():Object<{}> =>
		(this.state
			.set('hasError', false)
			.set('errorText', '')
			.set('isPosting', false));

	/**
	 * Check if we have errors when posting location data
	 */
	onPostLocationDataError = ():Object<{}> => {
		type Payload = {
			hasError:boolean,
			errorText:string
		}
		const {
			hasError, errorText
		}:Payload = this.action.payload;

		return this.state
			.set('hasError', hasError)
			.set('errorText', errorText)
			.set('isPosting', false);
	};
	/**
	 * Control how we rehydrate the store
	 */
	rehydrates = ():Object<{}> => {
		if (!has(this.action.payload, 'settings') || !has(this.action, 'payload')) return this.state;
		const {
			repoForLocationData,
			lastUploadTime
		} = this.action.payload.settings.toJS();

		const rFlD = (repoForLocationData !== '' && repoForLocationData) ? repoForLocationData : 'oyd.location';

		return this.state
			.set('repoForLocationData', rFlD)
			.set('lastUploadTime', lastUploadTime)
			.set('errorText', '')
			.set('hasError', false)
			.set('isPosting', false);
	};
}
