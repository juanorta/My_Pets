import React, { Component } from 'react';
//import { ACCESS_TOKEN } from '../../constants';
import { ACCESS_TOKEN } from '../../constants/index';
import { Redirect } from 'react-router-dom';

class OAuth2RedirectHandler extends Component {
	getUrlParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

		var results = regex.exec(this.props.location.search);
		console.log(regex);
		console.log(this.props.location);
		console.log('results: ' + results);
		return results === null
			? ''
			: decodeURIComponent(results[1].replace(/\+/g, ' '));
		console.log('results2: ' + results);
	}

	render() {
		console.log('oauth2redirecthandler');
		const token = this.getUrlParameter('token');
		const error = this.getUrlParameter('error');
		console.log(token);
		if (token) {
			localStorage.setItem(ACCESS_TOKEN, token);
			return (
				<Redirect
					to={{
						pathname: '/',
						state: { from: this.props.location },
					}}
				/>
			);
		} else {
			return (
				<Redirect
					to={{
						pathname: '/login',
						state: {
							from: this.props.location,
							error: error,
						},
					}}
				/>
			);
		}
	}
}

export default OAuth2RedirectHandler;
