import { Linking } from 'react-native';

export const linkTo = url => (Linking.canOpenURL(url).then((supported) => {
	if (!supported) {
		alert('Can\'t handle url: ' + url);// eslint-disable-line
	} else {
		return Linking.openURL(url);
	}
}).catch(err => console.log('An error occurred', err)));
