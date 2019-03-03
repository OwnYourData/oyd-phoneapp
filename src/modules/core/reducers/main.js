import { fromJS, List, Map } from 'immutable';
import InitialState from '../initialState';

export default class {
	constructor(action:mixed, state:mixed) {
		this.action = action;
		this.state = state;
	}

	/**
	 * Updates a single immutable object
	 */
	updateSingleSet = (type:string, dataKey:string):Object =>
		(this.state.set(type, this.action.payload[dataKey]));
	/**
	 * Updates vaultUrl
	 */
	onChangeInput = ():Object<{}> => {
		type Payload = {
			field:string,
			text:string,
		}
		const {
			field = '', text = ''
		}:Payload = this.action.payload;
		if (field !== 'vaultUrl' && field !== 'repoForLocationData') return this.state;

		return this.state
			.set(field, text);
	};
	/**
	 * Sets the error message
	 */
	setErrorMessage = ():Object => {
		const {
			status, message, type
		} = this.action.payload;

		return this.state
			.set('errorMessage', { status, message, type })
			.set('showError', true);
	};
	/**
	 * Checks if we have any auth data when logging in.
	 */
	onSetOauthToken = ():Object<{}> => {
		type Payload = {
			data:mixed,
			error:boolean,
		}
		const {
			data, error
		}:Payload = this.action.payload;

		if (error) return this.state;

		return this.state
			.set('user', fromJS(data));
	};
	/**
	 * Updates the user location object so we can upload it later
	 */
	onUpdateLocationData = ():Object<{}> => {
		type Payload = {
			data:mixed
		}

		const {
			data
		}:Payload = this.action.payload;

		let locationData = this.state.get('locationData');
		locationData = locationData.push(Map(data));

		return this.state
			.set('locationData', fromJS(locationData));
	};
	/**
	 * Clears all the users location data
	 */
	onClearLocationData = ():Object<{}> => {
		if (this.state.get('isPostingBackgroundLocation')) return this.state;
		return this.state.set('locationData', List());
	};
	/**
	 * Updates routes
	 */
	rootChange = ():Object => {
		type Payload = {
			key:string,
			passProps:mixed,
			animationType:string,
		}
		const {
			key, passProps, animationType
		}:Payload = this.action.payload;

		return this.state
			.set('route', {
				key, animationType, passProps
			});
	};
	/**
	 * Updates screenEvent
	 */
	screenEvent = ():Object => this.state.set('scene', this.action.payload);

	/**
	 * Parse data from the qr code scanner
	 */
	onParseQrCode = ():Object<{}> => {
		type Payload = {
			obj:mixed,
		}
		const {
			obj: { PIA_URL }
		}:Payload = this.action.payload;

		return this.state
			.set('vaultUrl', PIA_URL);
	};
	/**
	 * Resets the state
	 */
	onLogOut = ():Object<{}> =>
		this.state
			.set('user', Map())
			.set('vaultUrl', 'https://data-vault.eu')
			.set('locationData', List())
			.set('showToastMessage', false)
			.set('scene', {});
	/**
	 * Control how we rehydrate the store
	 */
	rehydrates = ():Object<{}> => {
		if (typeof this.action.payload === 'undefined') {
			return this.state;
		}

		const { core } = this.action.payload;
		const initialState = new InitialState;

		return core
			.set('route', initialState.get('route'))
			.set('isPosting', initialState.get('isPosting'))
			.set('isPostingBackgroundLocation', initialState.get('isPostingBackgroundLocation'))
			.set('scene', initialState.get('scene'))
			.set('showError', initialState.get('showError'))
			.set('errorMessage', initialState.get('errorMessage'))
			.set('showToastMessage', initialState.get('showToastMessage'))
			.set('backgroundDataEmpty', initialState.get('backgroundDataEmpty'));
	};
}

