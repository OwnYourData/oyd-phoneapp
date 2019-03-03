import { Navigation } from 'react-native-navigation';
import { name } from '../../app.json';
import { width } from '../utils/index';

const animated = false;
const primary = '#000000';
const white = '#ffffff';
const blue = '#4472C4';

const navigatorStyle = col => ({
	navigatorStyle: {
		navBarHidden: true, // make the nav bar hidden
		drawUnderTabBar: false, // draw the screen content under the tab bar (the tab bar is always translucent)
		statusBarBlur: true, // blur the area under the status bar, works best with navBarHidden:true
		tabBarHidden: false, // make the screen content hide the tab bar (remembered across pushes)
		statusBarHideWithNavBar: false, // hide the status bar if the nav bar is also hidden, useful for navBarHidden:true
		statusBarHidden: false, // make the status bar hidden regardless of nav bar state
		statusBarTextColorScheme: 'light', // text color of status bar, 'dark' / 'light' (remembered across pushes)
		statusBarTextColorSchemeSingleScreen: 'light', // same as statusBarTextColorScheme but does NOT remember across pushes
		screenBackgroundColor: col, // Default screen color, visible before the actual react views is rendered
		disabledBackGesture: false, // disable the back gesture (swipe gesture) in order to pop the top screen. Default is false. iOS Only

		// Android only
		navigationBarColor: '#000000', // change the background color of the bottom native navigation bar.
		navBarTitleTextCentered: true, // default: false. centers the title.
		topBarElevationShadowEnabled: true, // default: true. Disables TopBar elevation shadow on Lolipop and above
		statusBarColor: '#4263b2', // change the color of the status bar.
		collapsingToolBarCollapsedColor: '#0f2362' // Collapsing Toolbar scrim color.
	}
});

const navigatorButtons = {
	leftButtons: [
		{
			// icon: leftButton,
			id: 'sideMenu'
		}
	]
};

const navProps = (col = primary, key = '') => ({
	title: key,
	...navigatorStyle(col),
	navigatorButtons,
});

export default class {
	static routeTo = (props, key, passProps = {}) => {
		props.navigator.push({
			screen: `${name}.${key}`,
			passProps,
			...navProps(white, key)
		});
	};

	static resetTo = (props, key) => {
		props.navigator.resetTo({
			screen: `${name}.${key}`,
			...navProps(white, key)
		});
	};

	static popToRoot = props => props.navigator.popToRoot({ animated });

	static startSingleScreenApp = (key, animationType = 'slide-down', passProps = {}) => {
		Navigation.startSingleScreenApp({
			screen: {
				screen: `${name}.${key}`,
				...navProps(passProps.white ? white : blue, key)
			},
			passProps,
			animated,
			animationType, // 'none', 'slide-down', 'fade'
			appStyle: {
				hideBackButtonTitle: true // Hide back button title. Default is false. If `backButtonTitle` provided so it will take into account and the `backButtonTitle` value will show. iOS only
			}

		});
	};

	static showLightBox = (key, passProps = {}) => (
		Navigation.showLightBox({
			screen: `${name}.${key}`,
			passProps,
			...navProps(),
			style: {
				backgroundBlur: 'dark', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
				width: width * 0.8
			}
		})
	);

	static dismissLightBox = (passProps = {}) => (Navigation.dismissLightBox({ passProps }));

	static showModal = (key, passProps) => (
		Navigation.showModal({
			screen: `${name}.${key}`,
			passProps,
			...navProps(),
			animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
		})
	);

	static dismissModal = () => (Navigation.dismissModal({ animationType: 'slide-down' }));

	static dismissAllModals = () => (Navigation.dismissAllModals({ animationType: 'slide-down' }));
}
