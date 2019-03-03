import React from 'react';
import Spinner from 'react-native-spinkit';
import styled from 'styled-components/native';

const View = styled.View`
	align-items: center;
	justify-content: center;
	height: ${props => props.height}
`;

type Props = {
	color?:string,
	isVisible?:boolean,
	height?:number
}

const SpinnerUI = ({ color, height, isVisible }:Props) =>
	<View height={height}>
		<Spinner
			isVisible={isVisible}
			size={30}
			type='ThreeBounce'
			color={color}
		/>
	</View>;

SpinnerUI.defaultProps = {
	color: '#807F7F',
	isVisible: true,
	height: 50
};

export default SpinnerUI;
