import React from 'react';
import styled from 'styled-components/native';
import { normalize } from '../';

const Image = styled.Image`
	width: ${normalize(98)};
	height: ${normalize(98)};
	overflow: hidden;
`;

type Props = {
	uri?:string,
	img?:string,
	cover?:boolean,
	style?:mixed,
};

const ImageUI =
	({
		uri, img, cover, style
	}:Props) =>
		<Image
			source={img || { uri }}
			resizeMode={cover ? 'cover' : 'contain'}
			style={style}
		/>;

ImageUI.defaultProps = {
	uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
	img: '',
	cover: true,
	style: {}
};

export default ImageUI;
