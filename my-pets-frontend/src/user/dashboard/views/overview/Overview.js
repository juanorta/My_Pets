import React, { useState, useEffect } from 'react';
import './Overview.css';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Link } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: 'transparent',
		height: 'auto',
		marginBottom: '-7rem',
	},
	tags: {
		backgroundColor: 'transparent',
		height: '69%',
		width: '40%',
		display: 'flex',
		justifyContent: 'center',
		marginTop: '1.5rem',
		marginLeft: '3rem',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5),
		},
	},
	paperXL: {
		backgroundColor: 'transparent',
		height: 270,
		width: 570,
		display: 'inline-block',
		margin: '1rem',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			transform: 'scale(1.01)',
		},
		borderRadius: 8,
		marginRight: '2rem',
	},
	paperLarge: {
		backgroundColor: 'transparent',
		height: 250,
		width: '90%',
		display: 'inline-block',
		margin: '1rem',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			transform: 'scale(1.01)',
		},
		borderRadius: 8,
		marginRight: '1rem',
	},
	paperSmall: {
		height: 280,
		width: 450,
		display: 'inline-block',
		margin: '1rem',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			transform: 'scale(1.05)',
		},
		borderRadius: 2,
		// justifyContent: 'center',
	},
	control: {
		padding: theme.spacing(2),
	},
	foodImageCard: {
		backgroundColor: 'red',
	},
	imageSection: {
		backgroundColor: 'teal',
	},
	editButton: {
		position: 'absolute',
		left: -15,
		top: -35,
		// marginLeft: '1rem',
		// height: '1.5rem',
		// width: '1.5rem',
	},
	button: {
		position: 'absolute',
		right: -18,
		top: -35,
		// marginLeft: '50%',
		// marginLeft: '12.3rem',
		// height: '1.5rem',
		// width: '1.5rem',
	},
	tagStyle: {
		backgroundColor: 'teal',

		marginBottom: '-2rem',
		color: 'white',
		fontWeight: 600,
		borderRadius: 6,
	},
	noPicture: {
		position: 'absolute',
		backgroundColor: 'transparent',
		marginTop: '-4rem',
		marginLeft: '3rem',
		// marginLeft: '3rem',
		color: '#1b2737',
	},
}));

export default function Overview(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [appointments, setAppointments] = useState(currentUser.appointments);
	const [medications, setMedications] = useState(currentUser.medications);
	const [preventatives, setPreventatives] = useState(
		currentUser.preventatives
	);
	const [upcomingAppointments, setUpcomingAppointments] = useState(
		props.upcomingAppointments
	);
	const [nextDuePreventatives, setNextDuePreventatives] = useState(
		props.upcomingPreventatives
	);
	const [endDateMedications, setEndDateMedications] = useState(
		props.currentMedications
	);

	useEffect(() => {}, []);

	return (
		<div
			className="appointments-main-container"
			id="overview"
			// style={{ marginTop: '3rem' }}
		>
			<div className="title">
				<h1>Overview</h1>
			</div>
			<Grid container justify="center" className={classes.root}>
				<Grid item lg={4}>
					<Paper elevation={8} className={classes.paperLarge}>
						<div className="overview-card">
							<div className="overview-left">
								<h3>Next Appointment</h3>

								<ul>
									<li>
										<img
											className="appt-image"
											style={{
												height: '4rem',
												width: '4rem',
											}}
											src={`data:image/jpeg;base64,${
												upcomingAppointments[
													upcomingAppointments.length -
														1
												].data
											}`}
										/>
									</li>
									<li className="overview-petname">
										{
											upcomingAppointments[
												upcomingAppointments.length - 1
											].petName
										}
									</li>
								</ul>
							</div>
							<div className="overview-right">
								<ul>
									<li>
										<h3>
											{
												upcomingAppointments[
													upcomingAppointments.length -
														1
												].date
											}
										</h3>
									</li>

									<li>
										<h3>
											{
												upcomingAppointments[
													upcomingAppointments.length -
														1
												].time
											}{' '}
											{
												upcomingAppointments[
													upcomingAppointments.length -
														1
												].amOrPm
											}
										</h3>
									</li>
									<li>
										<h3>
											{
												upcomingAppointments[
													upcomingAppointments.length -
														1
												].type
											}
										</h3>
									</li>
									<li>
										<h3>
											{
												upcomingAppointments[
													upcomingAppointments.length -
														1
												].vetOrGroomerName
											}
										</h3>
									</li>
								</ul>
								<h4 className="see-all" to="appointments">
									<a>See All</a>{' '}
								</h4>
							</div>
						</div>
					</Paper>
				</Grid>
				<Grid item lg={4}>
					<Paper elevation={8} className={classes.paperLarge}>
						<div className="overview-card">
							<div className="overview-left">
								<h3>Expiring Medication</h3>
								<ul style={{ marginTop: '2.5rem' }}>
									<li>
										<img
											className="appt-image"
											style={{
												height: '4rem',
												width: '4rem',
											}}
											src={`data:image/jpeg;base64,${
												endDateMedications[
													endDateMedications.length -
														1
												].data
											}`}
										/>
									</li>
									<li className="overview-petname">
										{
											endDateMedications[
												endDateMedications.length - 1
											].petName
										}
									</li>
								</ul>
							</div>
							<div className="overview-right">
								<ul
									className="right-medication"
									style={{ marginTop: '4rem' }}
								>
									<li>
										<h4>
											{
												endDateMedications[
													endDateMedications.length -
														1
												].medicationName
											}
										</h4>
									</li>

									<li>
										<h4>
											End Date:{' '}
											{
												endDateMedications[
													endDateMedications.length -
														1
												].endDate
											}
										</h4>
									</li>
								</ul>
								<h4
									className="see-all"
									style={{ marginTop: '4.5rem' }}
								>
									<Link
										activeClass="active"
										spy={true}
										to="appointments"
										smooth={true}
										duration={500}
										offset={-60}
										// onSetActive={() => {
										// 	setApptMenuItem(
										// 		classes.contentsActive
										// 	);
										// }}
										// onSetInactive={() => {
										// 	setApptMenuItem(
										// 		classes.menuContents
										// 	);
										// }}
									>
										<a>See All</a>{' '}
									</Link>
								</h4>
							</div>
						</div>
					</Paper>
				</Grid>
				<Grid item lg={4}>
					<Paper elevation={8} className={classes.paperLarge}>
						<div className="overview-card">
							<div className="overview-left">
								<h3>Next Preventative Due</h3>
								<ul style={{ marginTop: '2.5rem' }}>
									<li>
										<img
											className="appt-image"
											style={{
												height: '4rem',
												width: '4rem',
											}}
											src={`data:image/jpeg;base64,${
												nextDuePreventatives[
													nextDuePreventatives.length -
														1
												].data
											}`}
										/>
									</li>
									<li className="overview-petname">
										{
											nextDuePreventatives[
												nextDuePreventatives.length - 1
											].petName
										}
									</li>
								</ul>
							</div>
							<div className="overview-right">
								<ul
									className="right-medication"
									style={{ marginTop: '4rem' }}
								>
									<li>
										<h4>
											{
												nextDuePreventatives[
													nextDuePreventatives.length -
														1
												].name
											}
										</h4>
									</li>

									<li>
										<h4>
											Due Next:{' '}
											{
												nextDuePreventatives[
													nextDuePreventatives.length -
														1
												].dueNext
											}
										</h4>
									</li>
								</ul>
								<h4
									className="see-all"
									style={{ marginTop: '3.25rem' }}
								>
									<a>See All</a>{' '}
								</h4>
							</div>
						</div>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
