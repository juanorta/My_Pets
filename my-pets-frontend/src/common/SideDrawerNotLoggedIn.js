import React, { Component, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
	label: {
		textTransform: 'capitalize',
	},

	menuButton: {
		marginRight: theme.spacing(2),
		'&:hover': {
			backgroundColor: '#FF4F00',
		},
	},
	closeMenuButton: {
		'&:hover': {
			backgroundColor: '#FF4F00',
		},
	},
	menuContents: {
		color: 'white',
		'&:hover': {
			backgroundColor: '#FF4F00',
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

export default function SideDrawerNotLoggedIn(props) {
	//gettting styles
	const theme = useTheme();
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	//functions to handle drawer open/close
	const handleNotLoggedInDrawerOpen = () => {
		setOpen(true);
		// console.log('hey');
	};

	const handleNotLoggedInDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<IconButton
				style={{ color: '#1B2737' }}
				aria-label="open drawer"
				onClick={handleNotLoggedInDrawerOpen}
				edge="start"
				className={clsx(classes.menuButton, open && classes.hide)}
				// className={clsx(classes.menuButton, open && classes.hide)}
			>
				<MenuIcon />
			</IconButton>

			{/* side drawer */}
			<Drawer
				className={classes.drawer}
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton
						onClick={handleNotLoggedInDrawerClose}
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
				</List>
			</Drawer>
		</div>
	);
}
