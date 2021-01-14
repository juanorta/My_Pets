import React, { Component } from 'react';
import './Login.css';
import {
	GOOGLE_AUTH_URL,
	FACEBOOK_AUTH_URL,
	GITHUB_AUTH_URL,
	ACCESS_TOKEN,
} from '../../constants';
//import { login } from '../../util/APIUtils';
import { login } from '../../util/APIUtils';
//import { login } from '../../util/APIUtils';
import { Link, Redirect } from 'react-router-dom';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';

class Login extends Component {
	componentDidMount() {
		// If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
		// Here we display the error and then remove the error query parameter from the location.
		if (this.props.location.state && this.props.location.state.error) {
			setTimeout(() => {
				Alert.error(this.props.location.state.error, {
					timeout: 5000,
				});
				this.props.history.replace({
					pathname: this.props.location.pathname,
					state: {},
				});
			}, 100);
		}
	}

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
					<h1 className="login-title">Log in to My Pets</h1>
					<SocialLogin />
					<div className="or-separator">
						<h3 className="or-text">OR</h3>
					</div>
					<LoginForm {...this.props} />
					<h3 className="signup-link">
						New user? <Link to="/signup">Sign up!</Link>
					</h3>
				</div>
			</div>
		);
	}
}

class SocialLogin extends Component {
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
									<img src={googleLogo} />{' '}
								</div>
								Log in with Google
							</div>
						</a>
					</li>
					<li>
						<a
							className="btn btn-block social-btn facebook"
							href={FACEBOOK_AUTH_URL}
						>
							<div className="social-link facebook">
								<div className="fb-logo">
									<img src={fbLogo} />{' '}
								</div>
								Log in with Facebook
							</div>
						</a>
					</li>
					<li>
						<a className="btn btn-block social-btn github">
							<div className="social-link github">
								<div className="github-logo">
									<img src={githubLogo} />{' '}
								</div>
								Log in with Github
							</div>
						</a>
					</li>
				</ul>
				{/* <div className="test">
					<img src={githubLogo}></img>
				</div> */}
			</div>
		);
	}
}

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const inputName = target.name;
		const inputValue = target.value;

		this.setState({
			[inputName]: inputValue,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		const loginRequest = Object.assign({}, this.state);
		login(loginRequest)
			.then((response) => {
				localStorage.setItem(ACCESS_TOKEN, response.accessToken);
				Alert.success("You're successfully logged in!");
				this.props.history.push('/');
			})
			.catch((error) => {
				Alert.error(
					(error && error.message) ||
						'Oops! Something went wrong. Please try again!'
				);
			});
	}

	render() {
		return <div></div>;
	}
}

export default Login;
