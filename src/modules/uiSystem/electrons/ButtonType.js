import React from 'react';
import { Platform } from 'react-native';
import { Button as Ripple } from 'react-native-material-buttons';
import styled from 'styled-components/native';
import { t, normalize } from '../index';

const RippleButton = styled(Ripple)`
	background-color: ${t.colors.white};
	opacity: ${props => (props.disabled ? '0.5' : 1)};
	border-color: ${props => (props.border ? '#4e72be' : '#ffffff')};
	border-width: ${props => (props.border ? '2' : '0')};
	border-style: solid;
	border-radius: ${props => (props.border && (Platform.OS === 'ios' || Platform.Version >= 23) ? normalize(10) : 0)};
	justify-content: center;
	align-items: center;
	padding-vertical: ${props => props.paddingV};
	overflow: hidden;
	${props => props.flexRow && 'flex-direction: row'};
	${props => props.fullWidth && 'width: 100%'};
`;

type Props = {
	children:any,
	paddingV?:number,
	border?:boolean,
	flexRow?:boolean,
	disabled?:boolean,
	fullWidth?:boolean,
	onPress?:void,
	props:any
};

class ButtonType extends React.PureComponent {
	render() {
		const {
			children, disabled, onPress, ...props
		}:Props = this.props;
		return (
			<RippleButton
				{...props}
				shadeBorderRadius={0}
				disabled={disabled}
				rippleColor='rgb(0, 0, 0)'
				onPress={onPress}
			>
				{children}
			</RippleButton>
		);
	}
}

ButtonType.defaultProps = {
	disabled: false,
	flexRow: false,
	fullWidth: true,
	border: false,
	paddingV: 0,
	onPress: () => (true)
};

export default ButtonType;
