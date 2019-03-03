import React from 'react';
import * as UI from '../../uiSystem/';

const getUri = ({ url, uid, secret }, vaultUrl, privateKey, nonce) =>
	(`${url}/?PIA_URL=${vaultUrl}&APP_KEY=${uid}&APP_SECRET=${secret}&MASTER_KEY=${privateKey}&NONCE=${nonce}`);

type Props = {
	routeTo:void,
	vaultUrl:string,
	appList:Array<mixed>
}

class ModuleList extends React.PureComponent<Props> {
	render = () => (
		<UI.CenterView pad={10}>
			{this.props.appList.map(item =>
				<UI.ListItem
					onPress={() => this.props.routeTo(this.props, 'DASHBOARD/APP_DETAIL', { title: item.name, uri: getUri(item, this.props.vaultUrl, this.props.privateKey, this.props.nonce) })}
					key={Math.random()}
					title={item.name}
					sub={item.description}
					uri={item.picture}
				/>)}

		</UI.CenterView>);
}

export default ModuleList;
