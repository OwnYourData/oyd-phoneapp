import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Footer } from '../';
import { linkTo, getUsedLocale } from '../../../utils';
import { version } from '../../../../package.json';


type Props = {
	children:any,
};

class ScrollView extends React.PureComponent<Props> {
	render = () => (
		this.props.children &&
		<KeyboardAwareScrollView

			contentContainerStyle={{
				justifyContent: 'space-between',
				flexGrow: 1
			}}
		>
			{this.props.children}
			{!this.props.hideFooter && <Footer
				link={() => linkTo(`https://OwnYourData.eu/${getUsedLocale()}`)}
				version={this.props.showVersion ? `${this.props.i18n.t('core.version')}${version}` : ''}
				text={this.props.i18n.t('core.footer')}
				linkText={this.props.i18n.t('core.footerLink')}
			/>}
		</KeyboardAwareScrollView>
	);
}

ScrollView.defaultProps = {
	children: []
};

export default ScrollView;
