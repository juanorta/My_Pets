import React, { Component, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
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
import HomeIcon from '@material-ui/icons/Home';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
	label: {
		textTransform: 'capitalize',
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
		fontFamily: 'Poppins',
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
}));

export default function SideDrawerLoggedIn(props) {
	//gettting styles
	const theme = useTheme();
	const classes = useStyles();

	const [open, setOpen] = useState(false);

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

	//functions to handle drawer open/close
	const handleLoggedInDrawerOpen = () => {
		setOpen(true);
		console.log('hey');
	};

	const handleLoggedInDrawerClose = () => {
		setOpen(false);
	};

	const handleLogoutClose = () => {
		setOpen(false);
	};

	console.log('props below');
	console.log(props.name);
	console.log(props.imageUrl);
	console.log(props.authenticated);

	// displayed only when user is logged in
	return (
		<div>
			<IconButton
				style={{ color: '#1B2737' }}
				aria-label="open drawer"
				onClick={handleLoggedInDrawerOpen}
				edge="start"
				className={clsx(classes.menuButton, open && classes.hide)}
				// className={clsx(classes.menuButton, open && classes.hide)}
			>
				<MenuIcon />
			</IconButton>

			{/* side drawer */}
			{/* displays Home and Log Out */}
			<Drawer
				className={classes.drawer}
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
				variant={'persistent'}
			>
				<div className={classes.drawerHeader}>
					<IconButton
						onClick={handleLoggedInDrawerClose}
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

				<List>
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
										src={props.imageUrl}
									/>
								</ListItemIcon>
								{props.name}
							</ListItem>
							<Divider style={{ backgroundColor: '#FF6019' }} />
						</div>
					) : null}
					<NavLink to="/" className="navlink">
						<ListItem button className={clsx(classes.menuContents)}>
							<ListItemIcon style={{ color: 'white' }}>
								<HomeIcon />
							</ListItemIcon>
							Home
						</ListItem>
					</NavLink>

					<ListItem
						button
						onClick={props.handleLogoutClose}
						className={clsx(classes.menuContents)}
					>
						<ListItemIcon style={{ color: 'white' }}>
							<ExitToAppIcon />
						</ListItemIcon>
						Log Out
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
}
