import React from 'react';
import { CenterView, Text, Button, Block, Spacer } from '../';

type Props = {
	version?:string,
	text?:string,
	linkText?:string,
	link?:void,
};
//
// justify-content: flex-end;
const Footer =
	({
		version, text, linkText, link
	}:Props) =>
		<Block>
			<CenterView>
				{version !== '' && <Text
					text={version}
				/>}
				<CenterView row>
					<Text
						text={text}
					/>
					<Button
						fullWidth={false}
						type='secondary small'
						text={linkText}
						onPress={link}
					/>
				</CenterView>
				<Spacer height={20} />
			</CenterView>
		</Block>;

Footer.defaultProps = {
	version: '',
	text: '',
	linkText: '',
	link: () => (true)
};

export default Footer;
