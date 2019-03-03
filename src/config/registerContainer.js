import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { all } from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';

import { name as appname } from '../../app.json';
import { nav } from './';
import {
	injectLocale,
	mergeActions,
	callApi,
	listenTo,
} from '../utils';

/**
 * Properties required to connect to redux
 */
type SceneProps = {
	sagas:void,
	actions:mixed,
	coreActions:mixed,
	component:void,
	stateToProps:mixed
}
/**
 * Method to connect the module routes to redux
 */
export default (store:mixed, sceneProps:SceneProps):Object<{}> => {
	const {
		actions,
		coreActions,
		sagas,
		namespace,
		i18n,
		component,
		stateToProps
	} = sceneProps;

	let locale = {};
	if (i18n) {
		locale = injectLocale(i18n);
	}

	/**
	 * If the module has saga add them to the middlewear
	 */
	if (sagas) {
		const wrappedSagas = sagas.map((saga) => {
			const sagaWatcher = typeof saga[2] === 'function' ? callApi : listenTo;
			return sagaWatcher(saga[0], saga[1], store, saga[2]);
		});

		store.runSaga(function* s() {
			yield all(wrappedSagas);
		});
	}

	/**
	 * Make navigation methods available to the component state
	 */
	const mapMobileRoutingProps = {
		routeTo: nav.routeTo,
		resetTo: nav.resetTo,
		popToRoot: nav.popToRoot,
		showLightBox: nav.showLightBox,
		dismissLightBox: nav.dismissLightBox,
		showModal: nav.showModal,
		dismissModal: nav.dismissModal,
		dismissAllModals: nav.dismissAllModals
	};
	/**
	 * Make modules state available to the component state
	 */
	const mapStateToProps = state => ({
		i18n: locale,
		...mapMobileRoutingProps,
		...stateToProps(state)
	});
	/**
	 * Make core actions available to the component state
	 */
	let actions$ = coreActions;
	if (actions) {
		/**
		 * Make modules action available to the component state
		 */
		const creators = [actions$, actions];
		actions$ = mergeActions(creators);
	}
	/**
	 * Make actions available in the store for sagas to use
	 */
	Object.assign(store.actions, actions$);
	/**
	 * Bind actions to redux
	 */

	const mapDispatchToProps = dispatch => (bindActionCreators(actions$, dispatch));
	/**
	 * Connect module to redux
	 */
	const ConnectComponent = connect(mapStateToProps, mapDispatchToProps)(component);
	/**
	 * Connect module to redux
	 */
	Navigation.registerComponent(`${appname}.${namespace}`, () => ConnectComponent, store, Provider);
	/**
	 * Return the component to use when registering with the navigation
	 */
	return ConnectComponent;
};
