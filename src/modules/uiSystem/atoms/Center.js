import React from 'react';
import styled from 'styled-components/native';
import normalise from '../helpers/normalize';
import { height } from '../../../utils/index';


const View = styled.View`
    justify-content: center;
    align-items: center;
    width: ${props => props.wdth};
    padding: ${props => normalise(props.pad)}px;
    background-color: ${props => props.bg};
    ${props => props.row && 'flex-direction: row;'}
    ${props => props.fullHeight && `height: ${height};`}
    
    border-color: ${props => (props.border ? '#D9D9D9' : '#ffffff')};
	border-width: ${props => (props.border ? '1' : '0')};
	border-style: solid;
`;

type Props = {
	children?:any,
	bg?:string,
	pad?:number,
	wdth?:string,
	row?:boolean,
	border?:boolean,
	fullHeight?:boolean
};

const CenterView = (props:Props) =>
	<View
		bg={props.bg}
		pad={props.pad}
		wdth={props.wdth}
		row={props.row}
		border={props.border}
		fullHeight={props.fullHeight}
	>
		{props.children}
	</View>;

CenterView.defaultProps = {
	children: null,
	bg: '#ffffff',
	pad: 0,
	wdth: '100%',
	row: false,
	border: false,
	fullHeight: false
};

export default CenterView;
