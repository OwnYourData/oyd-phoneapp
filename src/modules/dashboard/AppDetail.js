import React from 'react';
import { WebView } from 'react-native';
import * as UI from '../uiSystem/';
import { height } from '../../utils/index';

type Props = {
	uri:string,
	title:string,
	onError:void,
	props:any
}

const AppDetail = ({ uri, title, ...props }:Props) =>
	<UI.Module
		{...props}
		showBack
		showHeader
		hideFooter
		headerTitle={title}
	>
		<WebView
			style={{ height }}
			onError={error => props.onError({
				error, status: 0, message: 'error on showing modules web view', type: 'n/a'
			})}
			startInLoadingState
			renderLoading={() => <UI.CenterView><UI.Spinner /></UI.CenterView>}
			source={{ uri }}
		/>
	</UI.Module>;

export default AppDetail;
