import React from 'react';
import { TextField } from 'react-native-material-textfield';
import { normalize } from '../';

type Props = {
	label?:string,
	value?:boolean,
	secureTextEntry?:boolean
}

class TextInputUI extends React.PureComponent {
	render = () => {
		const {
			label, value, onChangeText, secureTextEntry
		}:Props = this.props;
		return (
			<TextField
				labelTextStyle={{ fontFamily: 'Calibri', color: '#7F7F7F' }}
				titleTextStyle={{ fontFamily: 'Arial' }}
				secureTextEntry={secureTextEntry}
				textColor='#000000'
				fontSize={normalize(14)}
				labelFontSize={normalize(14)}
				label={label}
				value={value}
				onChangeText={onChangeText}
			/>);
	};
}

TextInputUI.defaultProps = {
	label: '',
	value: '',
	secureTextEntry: false
};

export default TextInputUI;
