import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { truncate } from 'lodash';

import * as UI from '../';

const Wrapper = styled.TouchableOpacity`
	padding: ${UI.normalize(10)}px;
	margin-bottom: ${UI.normalize(10)}px;
	width: 100%;
`;

const List = styled.View`
	flex-direction: row;
	width: 100%;
	
`;

const TextWrapper = styled.View`
    padding-horizontal: ${UI.normalize(10)}px;
    flex: 1;
`;
const View = styled.View``;

type Props = {
	onPress:void,
	title?:string,
	sub?:string,
	uri?:string
};

const renderText = (textType, text) => <UI.Text
	type={textType}
	text={text}
/>;

const ListItem =
	({
		title, sub, uri, onPress
	}:Props) =>
		<Wrapper
			onPress={onPress}
			style={{
				backgroundColor: 'white',
				...Platform.select({
					ios: {
						shadowColor: 'rgba(0,0,0, .2)',
						shadowOffset: { height: 0, width: 0 },
						shadowOpacity: 1,
						shadowRadius: 1
					},
					android: {
						elevation: 3
					}
				})
			}}
		>
			<List>
				{typeof uri === 'string' && uri !== '' && <UI.Image uri={uri} />}
				<TextWrapper>
					<View>{renderText('h2 bld', title)}</View>
					<View>{renderText('h3', truncate(sub, {
						length: 60,
						omission: '...'
					}))}
					</View>
				</TextWrapper>
			</List>
		</Wrapper>;

ListItem.defaultProps = {
	title: '',
	sub: '',
	uri: ''
};

export default ListItem;
