import { AsyncStorage } from 'react-native';
import { captureSentryMessage } from '../../../utils/captureSentryMessage';

const storeVaultUrl = async (vaultUrl:string):Object => {
	try {
		await AsyncStorage.setItem('vaultUrl', vaultUrl);
		return true;
	} catch (error) {
		await captureSentryMessage({
			error: JSON.stringify(error),
			message: 'async: storeVaultUrl method',
			status: 0,
			type: 'n/a'
		});
		return false;
	}
};

export default storeVaultUrl;
