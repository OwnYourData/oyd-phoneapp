import React from 'react';
import * as UI from '../uiSystem/index';

class Help extends React.PureComponent {
	render = () => (
		<UI.FullWidth>
			<UI.CenterView wdth='80%' pad={20}>
				<UI.Spacer height={10} />
				<UI.Text
					left={false}
					type='p itl'
					text={this.props.i18n.t('auth.qrDescription')}
				/>
				<UI.Spacer height={30} />
				<UI.Block>
					<UI.Button
						onPress={() => this.props.dismissLightBox()}
						fullWidth={false}
						type='primary pill'
						text={this.props.i18n.t('auth.close')}
					/>
				</UI.Block>
			</UI.CenterView>
		</UI.FullWidth>);
}

export default Help;
