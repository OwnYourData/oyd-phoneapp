import React from 'react';
import styled from 'styled-components/native';
import { width } from '../../../utils/index';


const View = styled.View`
    justify-content: center;
    align-items: center;
    width: ${width};
	background-color: transparent;
`;

type Props = {
	children?:any
};

const FullWidth = (props:Props) =>
	<View>
		{props.children}
	</View>;

FullWidth.defaultProps = {
	children: null
};

export default FullWidth;
