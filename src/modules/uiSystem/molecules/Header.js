import React from 'react';
import styled from 'styled-components/native';
import normalise from '../helpers/normalize';
import { isIos } from '../../../utils/index';
import { t, Text, Icon } from '../';

const Wrapper = styled.View`
    align-items: center;
    width: 100%; 
    padding-horizontal: ${normalise(isIos ? 10 : 0)}px;
	padding-top: ${normalise(isIos ? 20 : 0)}px;
    background-color: ${t.colors.blue};
    flex-direction: row;
    justify-content: space-between;
    height: ${props => normalise(props.height)}px;
`;

const View = styled.View``;

const TextWrapper = styled.View`
	margin-left: 5px;
	padding-bottom: ${isIos ? 5 : 0}px;
`;
const Left = styled.TouchableOpacity`
	margin-left: 5px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 50px;
`;

const IconButton = styled.TouchableHighlight`
	width: 50px;
	height: 50px;
	align-items: center;
	justify-content: center;
`;

type Props = {
	onPress:void,
	onPressIconButton:void,
	title?:string,
	showBack?:boolean,
	showIconButton?:boolean
};

const Header =
	({
		title, showBack, showIconButton, onPress, onPressIconButton
	}:Props) =>
		<Wrapper height={isIos ? 70 : 50}>
			<Left onPress={onPress}>
				{showBack &&
				<Icon
					style={{ marginRight: 5 }}
					name='angle-left'
					color='#ffffff'
					size={16}
				/>}
				<TextWrapper>
					<Text
						type='h2 white'
						text={title}
					/>
				</TextWrapper>
			</Left>
			{showIconButton &&
			<IconButton
				onPress={onPressIconButton}
				underlayColor={t.colors.blue}
				activeOpacity={0.5}
			>
				<View>
					<Icon
						name='user-circle-o'
						color='#ffffff'
						size={18}
					/>
				</View>
			</IconButton>}
		</Wrapper>;

Header.defaultProps = {
	title: '',
	showBack: false,
	showIconButton: false
};

export default Header;
