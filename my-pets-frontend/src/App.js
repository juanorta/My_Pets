import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../src/common/AppHeader';
import Home from '../src/home/Home';
import Login from '../src/user/login/Login';
import Signup from '../src/user/signup/Signup';
import Dashboard from '../src/user/dashboard/Dashboard';
import OAuth2RedirectHandler from '../src/user/oauth2/OAuth2RedirectHandler';
import NotFound from '../src/common/NotFound';
import LoadingIndicator from '../src/common/LoadingIndicator';
import { getAllWeights, getCurrentUser } from '../src/util/APIUtils';
import { ACCESS_TOKEN } from '../src/constants/index';
import PrivateRoute from '../src/common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import PetProfile from './user/dashboard/PetProfile/PetProfile';
import PrivateRouteProfile from './common/PrivateRouteProfile';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: false,
			currentUser: null,
			loading: false,
			number: 0,
			defaultView: 'APPOINTMENTS',
		};

		this.loadCurrentlyLoggedInUser =
			this.loadCurrentlyLoggedInUser.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.changeDefaultViewsAndRefresh =
			this.changeDefaultViewsAndRefresh.bind(this);
	}

	loadCurrentlyLoggedInUser() {
		this.setState({
			loading: true,
		});

		getCurrentUser()
			.then((response) => {
				this.setState(
					{
						currentUser: response,
						authenticated: true,
						loading: false,
					},
					() => {}
				);
			})
			.catch((error) => {
				this.setState({
					loading: false,
				});
			});
	}

	changeDefaultViewsAndRefresh(view) {
		this.setState({
			defaultView: view,
		});
	}

	handleLogout() {
		localStorage.removeItem(ACCESS_TOKEN);
		this.setState({
			authenticated: false,
			currentUser: null,
		});
		Alert.success("You're safely logged out!");
	}

	componentDidMount() {
		this.loadCurrentlyLoggedInUser();
	}

	refresh() {
		// this.loadCurrentlyLoggedInUser();
		this.forceUpdate();
		// this.componentDidMount();
	}

	render() {
		if (this.state.loading) {
			return <LoadingIndicator />;
		}

		return (
			<div className="app">
				<div className="app-top-box">
					<AppHeader
						currentUser={this.state.currentUser}
						authenticated={this.state.authenticated}
						onLogout={this.handleLogout}
					/>
				</div>
				<div className="app-body">
					<Switch>
						{this.state.authenticated ? (
							<div>
								<PrivateRoute
									authenticated={this.state.authenticated}
									currentUser={this.state.currentUser}
									exact
									path="/"
									component={Dashboard}
									forceUpdate={this.loadCurrentlyLoggedInUser}
									changeDefaultViewsAndRefresh={
										this.changeDefaultViewsAndRefresh
									}
								></PrivateRoute>

								<PrivateRouteProfile
									exact
									authenticated={this.state.authenticated}
									currentUser={this.state.currentUser}
									path="/petprofile/:petID/:petName"
									component={PetProfile}
									forceUpdate={this.loadCurrentlyLoggedInUser}
									changeDefaultViewsAndRefresh={
										this.changeDefaultViewsAndRefresh
									}
									defaultView={this.state.defaultView}
								></PrivateRouteProfile>
							</div>
						) : (
							<Route exact path="/" component={Home}></Route>
						)}

						<Route
							path="/login"
							render={(props) => (
								<Login
									authenticated={this.state.authenticated}
									{...props}
								/>
							)}
						></Route>
						<Route
							path="/signup"
							render={(props) => (
								<Signup
									authenticated={this.state.authenticated}
									{...props}
								/>
							)}
						></Route>
						<Route
							path="/oauth2/redirect"
							component={OAuth2RedirectHandler}
						></Route>
						<Route component={NotFound}></Route>
					</Switch>
				</div>
				<Alert
					stack={{ limit: 3 }}
					timeout={3000}
					position="top-right"
					effect="slide"
					offset={65}
				/>
			</div>
		);
	}
}

export default App;
