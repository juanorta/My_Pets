import React, { Component, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './AppHeader.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PetsIcon from '@material-ui/icons/Pets';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';
import SideDrawerNotLoggedIn from './SideDrawerNotLoggedIn';
import SideDrawerLoggedIn from '../user/SideDrawerLoggedIn/SideDrawerLoggedIn';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 300;

//styles
const useStyles = makeStyles((theme) => ({
	root: {
		background: 'transparent',
		borderRadius: 3,
		border: 0,
		color: '#1B2737',
		height: 48,
		padding: '0 30px',
		boxShadow: 'none',
		'&:hover': {
			// backgroundColor: 'green',
			// color: 'white',
		},

		fontFamily: 'Poppins',
		fontWeight: '600',
	},

	label: {
		textTransform: 'capitalize',
	},
}));

//hides navbar after some scrolling
function HideOnScroll(props) {
	const { children, window } = props;
	let trigger = useScrollTrigger({ target: window ? window() : undefined });
	let appear = false;
	let direction = 'down';
	let inn = !trigger;

	//disables the hide on scroll effect if the user is logged in
	if (props.authenticated === true) {
		appear = true;
		direction = '';
		inn = true;
	}

	return (
		<Slide appear={appear} direction={direction} in={inn}>
			{children}
		</Slide>
	);
}

//navbar
export default function AppHeader(props) {
	let drawerAuthenticated = false;
	const theme = useTheme();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [logoutClicked, setLogoutClicked] = useState(false);
	const [open, setOpen] = React.useState(false);
	const small = useMediaQuery(theme.breakpoints.down('sm'));

	let location = useLocation().pathname;
	console.log(location);

	let menuIconClass = 'menu-icon';

	//functions to handle events
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogoutClose = () => {
		setOpen(false);
		props.onLogout();
	};

	if (props.authenticated) {
		menuIconClass = 'menu-icon-authenticated';
	}

	return (
		<React.Fragment>
			<CssBaseline />

			<HideOnScroll {...props}>
				<AppBar
					position="fixed"
					style={{
						background: 'transparent',
						boxShadow: 'none',
					}}
				>
					<Toolbar
						className="app-header-wrapper"
						style={{ color: 'red' }}
					>
						{/* will load 2 different side drawers depending if user is authenticated or not*/}
						<div className={menuIconClass}>
							{props.authenticated ? (
								<SideDrawerLoggedIn
									handleLogoutClose={handleLogoutClose}
									authenticated={props.authenticated}
									name={props.currentUser.name}
									imageUrl={props.currentUser.imageUrl}
								/>
							) : (
								<SideDrawerNotLoggedIn />
							)}
						</div>

						{/* goes to home when logo is clicked */}
						<div className="app-header">
							<ul className="app-branding">
								{location != '/' &&
								location != '/login' &&
								location != '/signup' ? null : (
									<li>
										<NavLink
											to="/"
											onClick={() => {
												setOpen(false);
											}}
										>
											<Button
												classes={{
													root: classes.root,
													label: classes.label,
												}}
												style={{ fontSize: '20px' }}
											>
												<PetsIcon
													style={{
														minWidth: '40px',
													}}
												/>
												My Pet Family
											</Button>
										</NavLink>
									</li>
								)}
							</ul>

							<div className="app-options">
								{/* will load different navbar content depending if user is authenticated */}
								<nav className="app-nav">
									{props.authenticated ? (
										<ul>
											<li>
												<a className="avatar">
													<Button
														onClick={handleClick}
														classes={{
															root: classes.avatarButton,
															label: classes.label,
														}}
														style={{
															fontSize: '17px',
															width: '20px',
															borderRadius: 28,
														}}
													>
														<img
															className="avatar-picture-img"
															src={
																props
																	.currentUser
																	.imageUrl
															}
														/>
													</Button>
													<Menu
														id="simple-menu"
														anchorEl={anchorEl}
														keepMounted
														open={Boolean(anchorEl)}
														onClose={handleClose}
													>
														<MenuItem
															onClick={
																handleLogoutClose
															}
														>
															<ExitToAppIcon
																style={{
																	minWidth:
																		'40px',
																}}
															/>
															Logout
														</MenuItem>
													</Menu>
												</a>
											</li>
										</ul>
									) : (
										<ul className="login-signup">
											<li>
												<NavLink to="/login">
													<Button
														classes={{
															root: classes.root,
															label: classes.label,
														}}
														style={{
															fontSize: '17px',
														}}
													>
														<VpnKeyIcon
															style={{
																minWidth:
																	'40px',
															}}
														/>
														Login
													</Button>
												</NavLink>
											</li>
											<li>
												<NavLink to="/signup">
													<Button
														classes={{
															root: classes.root,
															label: classes.label,
														}}
														style={{
															fontSize: '17px',

															border: '2px solid #FF4F00',
														}}
													>
														Sign Up
													</Button>
												</NavLink>
											</li>
										</ul>
									)}
								</nav>
							</div>
						</div>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
		</React.Fragment>
	);
}
