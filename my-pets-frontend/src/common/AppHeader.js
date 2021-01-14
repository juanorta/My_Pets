import React, { Component, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PetsIcon from '@material-ui/icons/Pets';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
		// '&:active': {
		// 	backgroundColor: 'blue',
		// },
		fontFamily: 'Poppins',
		fontWeight: '600',
	},
	avatarButton: {
		color: 'white',
		background: 'transparent',
		height: 62,
		borderRadius: 3,
		border: 0,
		padding: '0 30px',
		boxShadow: 'none',
	},
	label: {
		textTransform: 'capitalize',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
		'&:hover': {
			backgroundColor: '#FF6019',
		},
	},
	closeMenuButton: {
		'&:hover': {
			backgroundColor: '#FF6019',
		},
	},
	menuContents: {
		color: 'white',
		'&:hover': {
			backgroundColor: '#FF6019',
		},
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: '#1B2737',
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

//hides navbar after some scrolling
function HideOnScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

//navbar + side drawer
export default function AppHeader(props) {
	console.log(props.authenticated);
	console.log(props.currentUser);

	let drawerAuthenticated = false;
	const theme = useTheme();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [logoutClicked, setLogoutClicked] = useState(false);
	const [open, setOpen] = React.useState(false);

	//hook that gets set to true when the dashboard page gets loaded for the first time
	//used to trigger a slide-open animation on first load
	const [
		dashboardLoadedForFirstTime,
		setDashboardLoadedForFirstTime,
	] = useState(false);

	//waiting 250ms to open the side drawer if the page hasn't been loaded yet
	setTimeout(function () {
		if (
			props.authenticated &&
			window.innerWidth >= 768 &&
			dashboardLoadedForFirstTime == false
		) {
			setDashboardLoadedForFirstTime(true);
			setOpen(true);
		}
	}, 250);

	let menuIconClass = 'menu-icon';

	//functions to handle events
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
		setLogoutClicked(true);
	};

	const handleLogoutClose = () => {
		setOpen(false);
		props.onLogout();
	};

	//console.log(window.innerWidth);
	// if (window.innerWidth <= 768) {
	// 	handleDrawerOpen();
	// }

	if (props.authenticated) {
		menuIconClass = 'menu-icon-authenticated';
	}

	//console.log(menuIconClass);

	return (
		<React.Fragment>
			<CssBaseline />
			<HideOnScroll {...props}>
				<AppBar
					position="fixed"
					style={{
						background: 'white',
						boxShadow: 'none',
					}}
				>
					<Toolbar
						className="app-header-wrapper"
						style={{ color: 'red' }}
					>
						<div className={menuIconClass}>
							<IconButton
								style={{ color: '#1B2737' }}
								aria-label="open drawer"
								onClick={handleDrawerOpen}
								edge="start"
								className={clsx(
									classes.menuButton,
									open && classes.hide
								)}
							>
								{/* {props.authenticated ? (
									<Avatar
										alt="Remy Sharp"
										src={props.currentUser.imageUrl}
									/>
								) : ( */}

								<MenuIcon />

								{/* //)} */}
							</IconButton>
						</div>
						<div className="app-header">
							<ul className="app-branding">
								<li>
									<NavLink
										to="/"
										onClick={() => {
											setOpen(false);
										}}
									>
										<Button
											classes={{
												root: classes.root, // class name, e.g. `classes-nesting-root-x`
												label: classes.label, // class name, e.g. `classes-nesting-label-x`
											}}
											style={{ fontSize: '20px' }}
										>
											<PetsIcon
												style={{
													minWidth: '40px',
												}}
											/>
											My Pets
										</Button>
									</NavLink>
								</li>
							</ul>
							<div className="app-options">
								<nav className="app-nav">
									{props.authenticated ? (
										<ul>
											<li>
												<a className="avatar">
													<Button
														onClick={handleClick}
														classes={{
															root:
																classes.avatarButton, // class name, e.g. `classes-nesting-root-x`
															label:
																classes.label, // class name, e.g. `classes-nesting-label-x`
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
															root: classes.root, // class name, e.g. `classes-nesting-root-x`
															label:
																classes.label, // class name, e.g. `classes-nesting-label-x`
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
															root: classes.root, // class name, e.g. `classes-nesting-root-x`
															label:
																classes.label, // class name, e.g. `classes-nesting-label-x`
														}}
														style={{
															fontSize: '17px',

															border:
																'2px solid #FF6019',
														}}
													>
														{/* <PersonAddIcon
															style={{
																minWidth:
																	'40px',
															}}
														/> */}
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

			{/*  side drawer */}
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton
						onClick={handleDrawerClose}
						style={{ color: 'white' }}
						className={clsx(classes.closeMenuButton)}
					>
						{theme.direction === 'ltr' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider style={{ backgroundColor: '#FF6019' }} />
				<List>
					{props.authenticated ? (
						<NavLink to="/login" className="navlink">
							{window.innerWidth < 768 ? (
								<div>
									<ListItem style={{ color: 'white' }}>
										<ListItemIcon>
											<img
												style={{
													marginTop: '-1.25rem',
													height: '2rem',
													width: '2rem',
												}}
												className="avatar-picture-img"
												src={props.currentUser.imageUrl}
											/>
										</ListItemIcon>
										{props.currentUser.name}
									</ListItem>
									<Divider
										style={{ backgroundColor: '#FF6019' }}
									/>
								</div>
							) : null}
							<ListItem
								button
								className={clsx(classes.menuContents)}
							>
								<ListItemIcon style={{ color: 'white' }}>
									<VpnKeyIcon />
								</ListItemIcon>
								Dashboard
							</ListItem>
							{/* <Divider style={{ backgroundColor: '#FF6019' }} /> */}
							<ListItem
								button
								onClick={handleLogoutClose}
								className={clsx(classes.menuContents)}
							>
								<ListItemIcon style={{ color: 'white' }}>
									<ExitToAppIcon />
								</ListItemIcon>
								Log Out
							</ListItem>
						</NavLink>
					) : (
						<div>
							<NavLink
								to="/login"
								className="navlink"
								onClick={() => {
									setOpen(false);
								}}
							>
								<ListItem
									button
									style={{
										color: 'white',
									}}
								>
									<ListItemIcon
										style={{
											color: 'white',
										}}
									>
										<VpnKeyIcon />
									</ListItemIcon>
									Login
								</ListItem>
							</NavLink>

							<NavLink
								to="/signup"
								className="navlink"
								onClick={() => {
									setOpen(false);
								}}
							>
								<ListItem
									button
									style={{
										color: 'white',
									}}
								>
									<ListItemIcon
										style={{
											color: 'white',
										}}
									>
										<PersonAddIcon />
									</ListItemIcon>
									Sign Up
								</ListItem>
							</NavLink>
						</div>
					)}
				</List>
			</Drawer>
		</React.Fragment>
	);
}
