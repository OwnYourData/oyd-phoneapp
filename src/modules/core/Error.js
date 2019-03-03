import React from 'react';
import { captureSentryMessage } from '../../utils/captureSentryMessage';
import * as UI from '../uiSystem/index';

type Props = {
	error:string,
	status:string,
	message:string,
	type:string,
	onRootSingleScreenApp:void,
	onHideError:void,
	dismissLightBox:void,
	i18n:mixed,
}

class Error extends React.PureComponent<Props> {
	dismissLightBox = async () => {
		try {
			if (this.props.type === 'logout') {
				this.props.onRootSingleScreenApp({ key: 'CORE', passProps: { white: true }, animationType: 'fade' });
			}
			this.props.onHideError({ showError: false });
			this.props.dismissLightBox();
		} catch (error) {
			await captureSentryMessage({
				error, message: 'Showing error pop up'
			});
		}
	};
	render = () => (
		<UI.FullWidth>
			<UI.CenterView wdth='80%' pad={20}>
				<UI.Spacer height={10} />
				{this.props.type === 'logout' ?
					<UI.Text
						left={false}
						type='p itl'
						text={this.props.message}
					/>
					:
					<UI.Text
						left={false}
						type='p itl'
						text={`Status: ${this.props.status}\nMessage: ${this.props.message}`}
					/>
				}
				<UI.Spacer height={30} />
				<UI.Block>
					<UI.Button
						onPress={() => this.dismissLightBox()}
						fullWidth={false}
						type='primary pill'
						text={this.props.i18n.t('auth.close')}
					/>
				</UI.Block>
			</UI.CenterView>
		</UI.FullWidth>);
}

export default Error;
