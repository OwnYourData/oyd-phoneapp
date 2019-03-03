import React from 'react';
import {
	Alert,
	View,
	AppState
} from 'react-native';
import RNRestart from 'react-native-restart';
import { connect } from 'react-redux';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import Orientation from 'react-native-orientation';
import Toast from 'react-native-easy-toast';

import { Header, HeaderVert } from '../';
import { isIos } from '../../../utils';
// const OrientationNative = NativeModules.Orientation;
// const LocalEventEmitter = new NativeEventEmitter(OrientationNative);

const errorHandler = (e, isFatal) => {
	if (isFatal) {
		Alert.alert(
			'Unexpected JS Exception error occurred',
			`Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}\nWe will need to restart the app.`,
			[{ text: 'Restart', onPress: () => RNRestart.Restart() }]
		);
	} else {
		console.log(e);
	}
};

setJSExceptionHandler(errorHandler);

type Props = {
	navigator:mixed,
	children:any,
	spring?:boolean,
	noFadeIn?:boolean,
	showIconButton?:boolean,
	hideFooter?:boolean,
	showVersion?:boolean,
	showHeader?:boolean,
	showBack?:boolean,
	i18n:mixed,
	onScreenChangedEvent:void,
	onPressIconButton?:void,
	props:mixed,
	headerTitle?:string,
	toastMessage?:string,
	showToastMessage?:boolean
};

class ModuleLayout extends React.Component<Props> {
	constructor(props:Props) {
		super(props);
		this.state = {
			error: false,
			showHeader: true,
			showVertHeader: false
		};
		this.props = props;
		this.toast = null;
		props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	componentDidMount() {
		this.onCheckOrientation();
		if (!isIos) AppState.addEventListener('change', this.onHandleAppStateChange);
	}

	componentWillReceiveProps(nextProps) {
		if (
			!this.props.core.get('user').get('access_token') && nextProps.core.get('user').get('access_token') &&
			nextProps.auth.get('credentials').value
		) {
			this.props.onEncryptCredentials({
				nonce: nextProps.auth.get('credentials').nonce,
				cipher: nextProps.auth.get('credentials').value,
			});
		}

		if (nextProps.core.get('route').key !== 'AUTH' &&
			!nextProps.core.get('user').get('access_token')
		) {
			this.props.onRootSingleScreenApp({ key: 'AUTH' });
		}
	}

	componentDidUpdate(nextProps) {
		if (!('event' in this.props.core.get('scene'))) return;
		const { key, event: { id } } = this.props.core.get('scene');
		if (key === 'DASHBOARD/APP_DETAIL' && id === 'willAppear' && isIos) {
			this.onCheckOrientation();
		}
		this.checkErrors();
		if (nextProps.showToastMessage) this.showToast();
	}

	componentWillUnmount() {
		AppState.removeListener('change', this.onHandleAppStateChange);
		Orientation.removeOrientationListener(this.orientationDidChange);
		Orientation.lockToPortrait();
	}

	onHandleAppStateChange = (nextAppState) => {
		console.log('nextAppState', nextAppState);
		if (nextAppState === 'active') {
			this.onCheckOrientation();
		}
		if (nextAppState === 'background') {
			Orientation.removeOrientationListener(this.orientationDidChange);
		}
	};

	onCheckOrientation() {
		console.log('this.props.core.get(\'scene\').key ', this.props.core.get('scene').key);

		if (this.props.core.get('scene').key === 'DASHBOARD' || this.props.core.get('scene').key === 'DASHBOARD/APP_DETAIL') {
			Orientation.unlockAllOrientations();
			Orientation.addOrientationListener(this.orientationDidChange);
		} else {
			Orientation.lockToPortrait();
		}
	}

	onNavigatorEvent = (event) => {
		const route = this.props.testID.split('.');
		this.props.onScreenChangedEvent({ event, key: route[1] });
	};

	onPressBackBtn = () => {
		if (this.props.showBack) {
			this.props.navigator.pop({ animated: true });
		}
	};


	orientationDidChange = (orientation) => {
		console.log('this.props.core.get(\'scene\').key 2', this.props.core.get('scene').key);

		if (this.props.core.get('scene').key === 'DASHBOARD' || this.props.core.get('scene').key === 'DASHBOARD/APP_DETAIL') {
			if (orientation === 'LANDSCAPE') {
				return this.setState({ showHeader: false, showVertHeader: true });
			}
		}

		this.setState({ showHeader: true, showVertHeader: false });
	};


	showToast = () => this.toast.show(this.props.toastMessage, 1000);

	update = () => this.checkErrors();

	checkErrors = () => {
		if (this.props.core.showError && !this.state.error) {
			const {
				status, message, error, type
			} = this.props.core.errorMessage;
			this.setState({ error: true }, this.props.showLightBox(
				'CORE/ERROR',
				{
					error, status, message, type
				}
			));
		}
	};

	render() {
		return (
			<View style={this.state.showHeader ? { flex: 1 } : { flex: 1, flexDirection: 'row' }}>
				{this.state.showVertHeader &&
				<HeaderVert
					title={this.props.headerTitle}
					showBack={this.props.showBack}
					showIconButton={this.props.showIconButton}
					onPress={this.onPressBackBtn}
					onPressIconButton={this.props.onPressIconButton}
				/>}
				{this.state.showHeader && this.props.showHeader &&
				<Header
					title={this.props.headerTitle}
					showBack={this.props.showBack}
					showIconButton={this.props.showIconButton}
					onPress={this.onPressBackBtn}
					onPressIconButton={this.props.onPressIconButton}
				/>}
				<View style={{ flex: 1 }}>
					{this.props.children}
					<Toast
						ref={(toast) => {
							this.toast = toast;
						}}
					/>
				</View>
			</View>
		);
	}
}

ModuleLayout.defaultProps = {
	onPressIconButton: () => (true),
	showBack: false,
	showIconButton: false,
	showHeader: false,
	spring: false,
	noFadeIn: false,
	hideFooter: false,
	showVersion: false,
	headerTitle: '',
	toastMessage: '',
	showToastMessage: false
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(ModuleLayout);
