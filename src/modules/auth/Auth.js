import React from 'react';
import * as UI from '../uiSystem/';
import { Header, Login, ScanQR } from './components/';

class Auth extends React.PureComponent {
	render = () => (
		<UI.Module {...this.props}>
			<UI.ScrollView {...this.props}>
				<UI.CenterView pad={20}>
					<Header {...this.props} />
					<ScanQR {...this.props} />
					<Login {...this.props} />
				</UI.CenterView>
			</UI.ScrollView>
		</UI.Module>);
}

export default Auth;
