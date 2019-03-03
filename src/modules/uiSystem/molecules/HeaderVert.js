import React from 'react';
import styled from 'styled-components/native';
import normalise from '../helpers/normalize';
import { isIos } from '../../../utils/index';
import { t, Text, Icon } from '../';

const Wrapper = styled.View`
    align-items: center;
    height: 100%; 
    padding-vertical: ${normalise(isIos ? 30 : 30)}px;
    background-color: ${t.colors.blue};
    flex-direction: column;
    justify-content: space-between;
    width: ${props => normalise(props.width)}px;
`;

const TextWrapper = styled.View`
	transform: rotate(-90deg);
	width: 200px;
`;
const Left = styled.TouchableOpacity`
	margin-left: 5px;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 50px;
	height:100%;
`;

const IconBtn = styled.TouchableOpacity`
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
		 title, showBack, onPress
	 }:Props) =>
		<Wrapper width={isIos ? 70 : 50}>
			{showBack &&
			<IconBtn onPress={onPress}>
				<Icon
					style={{ marginRight: 5 }}
					name='angle-left'
					color='#ffffff'
					size={16}
				/>
			</IconBtn>}
			<Left onPress={onPress}>
				<TextWrapper>
					<Text
						type='h2 white'
						text={title}
					/>
				</TextWrapper>
			</Left>
		</Wrapper>;

Header.defaultProps = {
	title: '',
	showBack: false,
	showIconButton: false
};

export default Header;
