import React from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { normalize } from '../';

const fruit = [{
	value: 'Banana'
}, {
	value: 'Mango'
}, {
	value: 'Pear'
}];

type Props = {
	onChangeText?:void,
	selectedValue?:mixed,
	data?:mixed,
	label?:string
}

const DropdownUI =
	({
		data, label, selectedValue, onChangeText
	}:Props) =>
		<Dropdown
			itemTextStyle={{ fontFamily: 'Calibri', color: '#7F7F7F' }}
			fontSize={normalize(14)}
			labelFontSize={normalize(14)}
			textColor='#000000'
			itemColor='#000000'
			label={label}
			data={data}
			value={selectedValue}
			onChangeText={onChangeText}
		/>;

DropdownUI.defaultProps = {
	label: '',
	selectedValue: '',
	onChangeText: () => (true),
	data: fruit
};

export default DropdownUI;
