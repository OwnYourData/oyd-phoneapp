import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isIos } from '../../../utils/index';

type Props = {
	style?:mixed,
	name?:string,
	size?:number,
	color?:string
};

const IconUI = ({ name, size, color, style }:Props) =>
	<Icon
		style={{ ...style, marginLeft: 5, marginBottom: isIos ? 8 : 0 }}
		name={name}
		size={size}
		color={color}
	/>;

IconUI.defaultProps = {
	style: {},
	name: 'external-link',
	size: 12,
	color: '#807F7F'
};

export default IconUI;
