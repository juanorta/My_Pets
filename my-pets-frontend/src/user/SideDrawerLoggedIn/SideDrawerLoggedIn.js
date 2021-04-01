import React, { Component, useState } from 'react';
import './SideDrawerLoggedIn.css';
import { NavLink } from 'react-router-dom';
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
import { TramOutlined } from '@material-ui/icons';
import { Link } from 'react-scroll';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import {
	mdiAccount,
	mdiDog,
	mdiFoodDrumstick,
	mdiScaleBathroom,
	mdiNeedle,
	mdiPill,
	mdiDoctor,
} from '@mdi/js';
import Icon from '@mdi/react';
import EventIcon from '@material-ui/icons/Event';
import AssessmentIcon from '@material-ui/icons/Assessment';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
	label: {
		textTransform: 'capitalize',
	},

	menuButton: {
		marginRight: theme.spacing(2),
		'&:hover': {
			backgroundColor: '#FF4F00',
			color: 'white',
		},
		color: '#1B2737',
	},
	closeMenuButton: {
		'&:hover': {
			backgroundColor: '#FF4F00',
		},
	},

	menuContents: {
		height: '4rem',
		color: 'white',
		'&:hover': {
			backgroundColor: '#3C4450',
			// backgroundColor: '#FF4F00',
		},
	},

	petMenuItem: {
		color: 'white',
		'&:hover': {
			// backgroundColor: '#FF4F00',
		},
	},
	apptMenuItem: {
		color: 'white',
		'&:hover': {
			// backgroundColor: '#FF4F00',
		},
	},
	weightsMenuItem: {
		color: 'white',
		'&:hover': {
			// backgroundColor: '#FF4F00',
		},
	},

	//class that sets background color to orange
	contentsActive: {
		height: '4rem',
		color: 'white',
		backgroundColor: '#FF4F00',
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

	active: {
		backgroundColor: 'black',
	},

	selected: {
		'&.Mui-selected': {
			backgroundColor: 'turquoise',
		},
	},
}));

export default function SideDrawerLoggedIn(props) {
	//gettting styles
	const theme = useTheme();
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const [menuClass, setMenuClass] = useState(classes.menuContents);
	const [petMenuItem, setPetMenuItem] = useState(classes.menuContents);
	const [apptMenuItem, setApptMenuItem] = useState(classes.menuContents);
	const [weightsMenuItem, setWeightsMenuItem] = useState(
		classes.menuContents
	);
	const [foodMenuItem, setFoodMenuItem] = useState(classes.menuContents);
	const [preventativesMenuItem, setPreventativesMenuItem] = useState(
		classes.menuContents
	);
	const [medicationsMenuItem, setMedicationsMenuItem] = useState(
		classes.menuContents
	);
	const [vetsMenuItem, setVetsMenuItem] = useState(classes.menuContents);

	const [overviewMenuItem, setOverviewMenuItem] = useState(
		classes.menuContents
	);

	//hook that gets set to true when the dashboard page gets loaded for the first time
	//used to trigger a slide-open animation on first load
	const [
		dashboardLoadedForFirstTime,
		setDashboardLoadedForFirstTime,
	] = useState(false);

	//waiting 250ms to open the side drawer if the page hasn't been loaded yet
	// setTimeout(function () {
	// 	if (
	// 		props.authenticated &&
	// 		window.innerWidth >= 768 &&
	// 		dashboardLoadedForFirstTime == false
	// 	) {
	// 		setDashboardLoadedForFirstTime(true);
	// 		setOpen(true);
	// 	}
	// }, 400);

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

	// console.log('props below');
	// console.log(props.name);
	// console.log(props.imageUrl);
	// console.log(props.authenticated);
	// displayed only when user is logged in
	// let menuClass = classes.menuContents;
	// console.log(menuClass);
	return (
		<div>
			<IconButton
				// style={{ color: '#1B2737' }}
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
							<Divider style={{ backgroundColor: '#FF4F00' }} />
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

					<Link
						activeClass="active"
						spy={true}
						to="overview"
						smooth={true}
						duration={500}
						offset={-60}
						onSetActive={() => {
							setOverviewMenuItem(classes.contentsActive);
						}}
						onSetInactive={() => {
							setOverviewMenuItem(classes.menuContents);
						}}
					>
						<ListItem button className={overviewMenuItem}>
							<ListItemIcon style={{ color: 'white' }}>
								<AssessmentIcon />
							</ListItemIcon>
							Overview
						</ListItem>
					</Link>

					<Link
						activeClass="active"
						spy={true}
						to="pets"
						smooth={true}
						duration={500}
						offset={-60}
						onSetActive={() => {
							setPetMenuItem(classes.contentsActive);
						}}
						onSetInactive={() => {
							setPetMenuItem(classes.menuContents);
						}}
					>
						<ListItem button className={petMenuItem}>
							<ListItemIcon style={{ color: 'white' }}>
								<PetsIcon />
							</ListItemIcon>
							Pets
						</ListItem>
					</Link>

					<Link
						activeClass="active"
						spy={true}
						to="appointments"
						smooth={true}
						duration={500}
						offset={-60}
						onSetActive={() => {
							setApptMenuItem(classes.contentsActive);
						}}
						onSetInactive={() => {
							setApptMenuItem(classes.menuContents);
						}}
					>
						<ListItem button className={apptMenuItem}>
							<ListItemIcon style={{ color: 'white' }}>
								<EventIcon />
							</ListItemIcon>
							Appointments
						</ListItem>
					</Link>

					<Link
						activeClass="active"
						spy={true}
						to="weights"
						smooth={true}
						duration={500}
						offset={-60}
						onSetActive={() => {
							setWeightsMenuItem(classes.contentsActive);
						}}
						onSetInactive={() => {
							setWeightsMenuItem(classes.menuContents);
						}}
					>
						<ListItem button className={weightsMenuItem}>
							<ListItemIcon style={{ color: 'white' }}>
								<Icon
									// className={iconClass2}
									path={mdiScaleBathroom}
									title="Scale"
									size={1}
									horizontal
									vertical
									rotate={180}
									// color="#1b2737"
								/>
							</ListItemIcon>
							<a>Weights</a>
						</ListItem>
					</Link>
					<Link
						activeClass="active"
						spy={true}
						to="food"
						smooth={true}
						duration={500}
						offset={-60}
						onSetActive={() => {
							setFoodMenuItem(classes.contentsActive);
						}}
						onSetInactive={() => {
							setFoodMenuItem(classes.menuContents);
						}}
					>
						<ListItem button className={foodMenuItem}>
							<ListItemIcon style={{ color: 'white' }}>
								<Icon
									// className={iconClass3}
									path={mdiFoodDrumstick}
									title="food"
									size={1}
									horizontal
									vertical
									rotate={180}
									// color="#1b2737"
								/>
							</ListItemIcon>
							<a>Food</a>
						</ListItem>
					</Link>

					<Link
						activeClass="active"
						spy={true}
						to="preventatives"
						smooth={true}
						duration={500}
						offset={-60}
						onSetActive={() => {
							setPreventativesMenuItem(classes.contentsActive);
						}}
						onSetInactive={() => {
							setPreventativesMenuItem(classes.menuContents);
						}}
					>
						<ListItem button className={preventativesMenuItem}>
							<ListItemIcon style={{ color: 'white' }}>
								<Icon
									// className={iconClass4}
									path={mdiNeedle}
									title="food"
									size={1}
									horizontal
									vertical
									rotate={180}
									// color="#1b2737"
								/>
							</ListItemIcon>
							<a>Preventatives</a>
						</ListItem>
					</Link>
					<Link
						activeClass="active"
						spy={true}
						to="medications"
						smooth={true}
						duration={500}
						offset={-60}
						onSetActive={() => {
							setMedicationsMenuItem(classes.contentsActive);
						}}
						onSetInactive={() => {
							setMedicationsMenuItem(classes.menuContents);
						}}
					>
						<ListItem button className={medicationsMenuItem}>
							<ListItemIcon style={{ color: 'white' }}>
								<Icon
									// className={iconClass4}
									path={mdiPill}
									title="food"
									size={1}
									horizontal
									vertical
									rotate={180}
									// color="#1b2737"
								/>
							</ListItemIcon>
							<a>Medications</a>
						</ListItem>
					</Link>
					<Link
						activeClass="active"
						spy={true}
						to="vets"
						smooth={true}
						duration={500}
						offset={-60}
						onSetActive={() => {
							setVetsMenuItem(classes.contentsActive);
						}}
						onSetInactive={() => {
							setVetsMenuItem(classes.menuContents);
						}}
					>
						<ListItem button className={vetsMenuItem}>
							<ListItemIcon style={{ color: 'white' }}>
								<Icon
									// className={iconClass4}
									path={mdiDoctor}
									title="food"
									size={1}
									horizontal
									vertical
									rotate={180}
									// color="#1b2737"
								/>
							</ListItemIcon>
							<a>Vets</a>
						</ListItem>
					</Link>

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
