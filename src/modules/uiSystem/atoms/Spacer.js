import React from 'react';
import styled from 'styled-components/native';

const View = styled.View`
	height: ${props => props.height};
	width: ${props => props.width};
`;

type Props = {
	width?:any
};

const Spacer = ({ height, width }:Props) => <View height={height} width={width} />;

Spacer.defaultProps = {
	width: '100%'
};

export default Spacer;
