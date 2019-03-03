import React from 'react';
import styled from 'styled-components/native';
import { isIos } from '../../../utils/index';
import { t, normalize } from '../index';

const textAlign = isLeft => (isLeft ? 'left' : 'right');

const Text = styled.Text`
	flex-wrap: wrap;
	textDecorationStyle: solid;
	background-color: ${t.colors.trans};
	color: ${props => t.colors[props.color]};
	text-align: ${props => (props.center ? 'center' : textAlign(props.left))};
	font-family: ${props => t.font[props.font]};
	text-decoration-line: ${props => props.textDecorationLine};
	font-size: ${props => normalize(props.size)};
	line-height: ${props => normalize(props.lineHeight + 4)};
	padding-top: ${isIos ? 5 : 0}px;
`;

type Props = {
	text:string,
	uppercase?:string,
	font:string,
	textDecorationLine?:string,
	color:string,
	size:number,
	center?:boolean,
	left?:boolean,
	lineHeight?:number,
	props:any
};

class TypeFace extends React.PureComponent {
	render() {
		const { text, ...props }:Props = this.props;
		let text$ = text;

		text$ = (text !== '' && props.uppercase) ? text$.toUpperCase() : text$;

		return (
			<Text
				{...props}
				allowFontScaling
				textAlignVertical='center'
				includeFontPadding={false}
				textBreakStrategy='highQuality'

			>
				{text$}
			</Text>
		);
	}
}

TypeFace.defaultProps = {
	text: 'Type Face Component',
	uppercase: false,
	font: 'reg',
	textDecorationLine: 'none',
	color: 'primary',
	size: 0,
	center: false,
	left: true,
	lineHeight: 18
};

export default TypeFace;
