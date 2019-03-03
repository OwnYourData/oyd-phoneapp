import { List } from 'immutable';
import { Core } from '../../core/reducers';
import InitialState from '../../core/initialState';

export default class extends Core {
	constructor(action:mixed, state:mixed) {
		super(action, state);
		this.action = action;
		this.state = state;
	}
	/**
	 * Sets the module list
	 */
	onSetModuleList = ():Object<{}> => {
		type Payload = {
			data:mixed,
			error:boolean,
		}

		const {
			data, error
		}:Payload = this.action.payload;

		if (error) {
			return this.state
				.set('isFetching', false)
				.set('hasError', error);
		}

		return this.state
			.set('appList', List(data))
			.set('isFetching', false)
			.set('hasError', error);
	};
	/**
	 * Resets the state
	 */
	onLogOut = ():Object<{}> =>
		this.state
			.set('appList', List())
			.set('isFetching', false)
			.set('hasError', false);
	/**
	 * Control how we rehydrate the store
	 */
	rehydrates = ():Object<{}> => {
		if (typeof this.action.payload === 'undefined') {
			return this.state;
		}

		const { dashboard } = this.action.payload;

		return dashboard
			.set('isFetching', false)
			.set('hasError', false);
	};
}
