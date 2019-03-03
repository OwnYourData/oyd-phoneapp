import React from 'react';
import { storiesOf } from '@storybook/react-native';

import * as Atomic from '../';

storiesOf('Logo', module)
	.add('Color', () =>
		<Atomic.Logo />)
	.add('White', () =>
		<Atomic.Logo isWhite />);

storiesOf('Text', module)
	.addDecorator(getStory => <Atomic.CenterView>{getStory()}</Atomic.CenterView>)
	.add('p red', () =>
		<Atomic.Text
			type='p red'
			text='Error text'
		/>)
	.add('p', () =>
		<Atomic.Text
			text='Regular text'
		/>)
	.add('h1', () =>
		<Atomic.Text
			type='h1'
			text='H1 text'
		/>)
	.add('h2', () =>
		<Atomic.Text
			type='h2'
			text='H2 text'
		/>)
	.add('h3', () =>
		<Atomic.Text
			type='h3'
			text='H3 text'
		/>)
	.add('small', () =>
		<Atomic.Text
			type='small'
			text='Small text'
		/>);

storiesOf('Button', module)
	.addDecorator(getStory => <Atomic.CenterView>{getStory()}</Atomic.CenterView>)
	.add('primary', () =>
		<Atomic.Button
			type='primary'
			text='Scan QR Code'
		/>)
	.add('primary pill', () =>
		<Atomic.Button
			type='primary pill'
			text='Upload location data now'
		/>)
	.add('secondary', () =>
		<Atomic.Button
			type='secondary'
			text='Enter login data'
		/>)
	.add('secondary small', () =>
		<Atomic.Button
			type='secondary small'
			text='OwnYourData.eu'
		/>)
	.add('secondary icon', () =>
		<Atomic.Button
			type='secondary icon'
			text='Sign up for new data vault'
		/>);

storiesOf('Spinner', module)
	.addDecorator(getStory => <Atomic.CenterView>{getStory()}</Atomic.CenterView>)
	.add('Spinner', () =>
		<Atomic.Spinner />);

storiesOf('TextInput', module)
	.add('Input', () =>
		<Atomic.TextInput
			label='Repo for location data:'
			value='oyd.location'
		/>);

storiesOf('Dropdown', module)
	.add('Drop down', () =>
		<Atomic.Dropdown
			selectedValue='Mango'
			label='Location data read interval:'
		/>);


storiesOf('ListItem', module)
	.add('List Item', () =>
		<Atomic.ListItem
			uri='https://facebook.github.io/react-native/docs/assets/favicon.png'
			title='Annotate'
			sub='Add comments and notes to places you visit'
		/>);
