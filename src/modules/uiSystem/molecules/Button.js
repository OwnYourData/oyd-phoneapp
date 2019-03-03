import React from 'react';

import * as UI from '../';

const getText =
	(text:string, textType:string, disabled:boolean, onPress:void, border:boolean = false, paddingV = 0, icon = false, fullWidth = true) =>
		(
			<UI.ButtonType
				disabled={disabled}
				text={text}
				border={border}
				onPress={onPress}
				paddingV={paddingV}
				flexRow={icon}
				fullWidth={fullWidth}
			>
				{icon && <UI.Spacer width={22} height={5} />}
				<UI.Text
					type={textType}
					text={text}
				/>
				{icon && <UI.Icon />}
			</UI.ButtonType>
		);

type Props = {
	type?:string,
	text:string,
	disabled?:boolean,
	fullWidth?:boolean,
	onPress?:void
};

const Button =
	({
		text, type, onPress, fullWidth = true, disabled = false
	}:Props) => {
		switch (type) {
			case 'primary':
				return (getText(text.toUpperCase(), 'h2 bld blu', disabled, onPress, true, 12, false, fullWidth));
			case 'primary pill':
				return (getText(text, 'h2 bld blu', disabled, onPress, true, 5, false, fullWidth));
			case 'secondary':
				return (getText(text, 'h3 underline', disabled, onPress, false, 2, false, fullWidth));
			case 'secondary icon':
				return (getText(text, 'h3 underline', disabled, onPress, false, 2, true, fullWidth));
			case 'secondary small':
				return (getText(text, 'h4 underline', disabled, onPress, false, 2, false, fullWidth));

			default:
				return (getText(text, 'h2', disabled, onPress, true, 12, false, fullWidth));
		}
	};

Button.defaultProps = {
	text: 'Type Face Component',
	type: 'p',
	onPress: () => (true),
	disabled: false,
	fullWidth: true
};

export default Button;
