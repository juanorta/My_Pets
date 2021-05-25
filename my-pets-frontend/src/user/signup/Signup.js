import React, { Component } from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom';
import {
	GOOGLE_AUTH_URL,
	FACEBOOK_AUTH_URL,
	GITHUB_AUTH_URL,
} from '../../constants/index';
import { signup } from '../../util/APIUtils';
//import fbLogo from '../../img/fb-logo.png';
//import googleLogo from '../../img/google-logo.png';
//import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';

class Signup extends Component {
	render() {
		if (this.props.authenticated) {
			return (
				<Redirect
					to={{
						pathname: '/',
						state: { from: this.props.location },
					}}
				/>
			);
		}

		return (
			<div className="login-container">
				<div className="login-content">
					<h1 className="login-title">Create a new account</h1>
					<SocialSignup />
					<div className="or-separator">
						<h3 className="or-text">OR</h3>
					</div>
					<h3 className="login-link">
						Already have an account? <Link to="/login">Login!</Link>
					</h3>
				</div>
			</div>
		);
	}
}

class SocialSignup extends Component {
	render() {
		return (
			<div className="social-login">
				<ul>
					<li>
						<a
							className="btn btn-block social-btn google"
							href={GOOGLE_AUTH_URL}
						>
							<div className="social-link google">
								<div className="google-logo">
									<img
										src={googleLogo}
										style={{ marginTop: '-0.3rem' }}
									/>{' '}
								</div>
								Sign up with Google
							</div>
						</a>
					</li>
					<li>
						<h3>Demo Account Credentials:</h3>
						<h3 className="credential">
							mypetfamily.demo@gmail.com
						</h3>
						<h3 className="credential">Mypetfamilydemo1!</h3>
					</li>
				</ul>
			</div>
		);
	}
}

export default Signup;
