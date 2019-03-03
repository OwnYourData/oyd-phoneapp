import React from 'react';
import * as UI from '../../uiSystem/';

class Header extends React.PureComponent {
	render = () => (
		<UI.CenterView>
			<UI.Spacer height={10} />
			<UI.Logo />
			<UI.CenterView row>
				<UI.Text
					text={this.props.i18n.t('auth.logIntoDataVault')}
				/>
				<UI.Text
					text='('
				/>
				<UI.Button
					onPress={() => this.props.showLightBox('AUTH/HELP')}
					fullWidth={false}
					type='secondary small'
					text={this.props.i18n.t('auth.helpBtn')}
				/>
				<UI.Text
					text='):'
				/>
			</UI.CenterView>
		</UI.CenterView>);
}

export default Header;
