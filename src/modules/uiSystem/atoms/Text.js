import React from 'react';

import { TypeFace } from '../';

const getText =
	(text:string, size:number, font:string, color:string, left:boolean, uppercase:number = false, lineHeight = 16, underline = false) =>
		(<TypeFace
			left={left}
			center={!left}
			text={text}
			size={size}
			font={font}
			color={color}
			uppercase={uppercase}
			lineHeight={lineHeight}
			textDecorationLine={underline ? 'underline' : 'none'}
		/>);

type Props = {
	type?:string,
	text:string,
	left?:boolean
};

const Text =
	({ text, type, left = true }:Props) => {
		switch (type) {
			case 'p red':
				return (getText(text, 14, 'reg', 'red', left));

			case 'p':
				return (getText(text, 14, 'reg', 'primary', left));
			case 'h1':
				return (getText(text, 20, 'reg', 'primary', left));
			case 'h2':
				return (getText(text, 18, 'reg', 'primary', left));
			case 'h2 bld':
				return (getText(text, 18, 'bld', 'primary', left));
			case 'h2 bld blu':
				return (getText(text, 18, 'bld', 'blue', left));
			case 'h3':
				return (getText(text, 16, 'reg', 'primary', left));
			case 'h3 bld blu':
				return (getText(text, 16, 'bld', 'blue', left));
			case 'h4':
				return (getText(text, 14, 'reg', 'primary', left));
			case 'h4 bld':
				return (getText(text, 14, 'bld', 'primary', left));
			case 'small':
				return (getText(text, 12, 'reg', 'primary', left));

			case 'h2 white':
				return (getText(text, 18, 'reg', 'white', left));

			case 'p underline':
				return (getText(text, 14, 'reg', 'primary', left, false, 16, true));
			case 'h1 underline':
				return (getText(text, 20, 'reg', 'primary', left, false, 22, true));
			case 'h2 underline':
				return (getText(text, 18, 'reg', 'primary', left, false, 20, true));
			case 'h3 underline':
				return (getText(text, 16, 'reg', 'primary', left, false, 18, true));
			case 'h4 underline':
				return (getText(text, 14, 'reg', 'primary', left, false, 16, true));
			case 'small underline':
				return (getText(text, 12, 'reg', 'primary', left, false, 14, true));

			case 'p itl':
				return (getText(text, 14, 'itl', 'primary', left, false, 18, false));
			case 'h1 itl':
				return (getText(text, 20, 'itl', 'primary', left));
			case 'h2 itl':
				return (getText(text, 18, 'itl', 'primary', left));
			case 'h3 itl':
				return (getText(text, 16, 'itl', 'primary', left));
			case 'small itl':
				return (getText(text, 12, 'itl', 'primary', left));


			default:
				return (getText(text, 14, 'reg', 'primary', left));
		}
	};

Text.defaultProps = {
	text: 'Type Face Component',
	type: 'p',
	left: true
};

export default Text;
