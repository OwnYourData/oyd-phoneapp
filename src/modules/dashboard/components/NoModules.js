import React from 'react';
import * as UI from '../../uiSystem/';
import { linkTo } from '../../../utils/index';

class NoModules extends React.PureComponent {
	render = () => (
		<UI.CenterView>
			<UI.Text
				text={this.props.i18n.t('dashboard.noModules')}
			/>
			<UI.Spacer height={10} />
			<UI.Button
				fullWidth={false}
				type='secondary small'
				onPress={() => linkTo(this.props.vaultUrl)}
				text={this.props.i18n.t('dashboard.dataVaultLink')}
			/>
			<UI.Text
				text={this.props.i18n.t('dashboard.connect')}
			/>
		</UI.CenterView>);
}

export default NoModules;
