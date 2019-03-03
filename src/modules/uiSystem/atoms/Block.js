import React from 'react';
import styled from 'styled-components/native';
import normalise from '../helpers/normalize';

const View = styled.View`
    width: ${props => props.wdth};
    padding: ${props => normalise(props.pad)}px;
    ${props => props.row && 'flex-direction: row;'};
`;

type Props = {
	children?:any,
	pad?:number,
	wdth?:string,
	row?:boolean
};

const BlockView = (props:Props) =>
	<View
		pad={props.pad}
		wdth={props.wdth}
		row={props.row}
	>
		{props.children}
	</View>;

BlockView.defaultProps = {
	children: null,
	pad: 0,
	wdth: '100%',
	row: false
};

export default BlockView;
