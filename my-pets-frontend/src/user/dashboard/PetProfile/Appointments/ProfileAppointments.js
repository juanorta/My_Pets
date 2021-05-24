import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';
import ProfileUpcomingAppts from './ProfileUpcomingAppts';
import ProfilePastAppts from './ProfilePastAppts';

const useStyles = makeStyles((theme) => ({
	upcoming: {
		color: '#1b2737',
	},
	upcomingSelected: {
		borderBottom: '3px solid #ff4f00',
	},
	past: {
		color: '#1b2737',
	},

	pastSelected: {
		borderBottom: '3px solid #ff4f00',
	},
}));

export default function ProfileAppointments(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [upcomingSelected, setUpcomingSelected] = useState(true);
	const [pastSelected, setPastSelected] = useState(false);
	const [upcomingStyle, setUpcomingStyle] = useState(
		classes.upcomingSelected
	);
	const [pastStyle, setPastStyle] = useState(classes.past);

	const [appointments, setAppointments] = useState(pet.appointments);
	const [sortedAppointments, setSortedAppointments] = useState('');
	const [upcomingAppointments, setUpcomingAppointments] = useState('');
	const [pastAppointments, setPastAppointments] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let sortedAppointmentsArray = appointments.slice();
		sortedAppointmentsArray.sort(function compare(a, b) {
			var dateA = new Date(a.date);
			var dateB = new Date(b.date);
			return dateB - dateA;
		});

		//putting appointments in 'upcoming' or 'past' arrays
		var now = new Date();
		let upcomingArray = [];
		let pastArray = [];
		let j = 0;
		let k = 0;
		for (var i = 0; i < sortedAppointmentsArray.length; i++) {
			var newDate = moment(sortedAppointmentsArray[i].date).toDate();
			var sameDate = moment(sortedAppointmentsArray[i].date).format(
				'MM/DD/YYYY'
			);
			var todayFormatted = moment(now).format('MM/DD/YYYY');
			if (newDate > now) {
				upcomingArray[j] = sortedAppointmentsArray[i];
				j++;
			} else if (sameDate == todayFormatted) {
				upcomingArray[j] = sortedAppointmentsArray[i];
				j++;
			} else {
				pastArray[k] = sortedAppointmentsArray[i];
				k++;
			}
		}
		setUpcomingAppointments(upcomingArray);
		setPastAppointments(pastArray);
		setSortedAppointments(sortedAppointmentsArray);
		setLoading(false);
	}, []);

	const upcomingHandler = () => {
		setUpcomingSelected(true);
		setPastSelected(false);
		setUpcomingStyle(classes.upcomingSelected);
		setPastStyle(classes.past);
	};

	const pastHandler = () => {
		setPastSelected(true);
		setUpcomingSelected(false);
		setPastStyle(classes.pastSelected);
		setUpcomingStyle(classes.upcoming);
	};

	return (
		<div className="weights-profile-main-container">
			<div className="weights-title">
				<h1>Appointments</h1>
				<ul className="view-selector-group">
					<li className={upcomingStyle} onClick={upcomingHandler}>
						<h2 style={{ fontWeight: '500' }}>Upcoming</h2>
					</li>
					<li className={pastStyle} onClick={pastHandler}>
						<h2 style={{ fontWeight: '500' }}>Past</h2>
					</li>
				</ul>
			</div>

			{loading === false && upcomingSelected === true ? (
				<ProfileUpcomingAppts
					upcomingAppointments={upcomingAppointments}
					pet={pet}
					currentUser={currentUser}
					forceUpdate={props.forceUpdate}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
					defaultViewHandler={props.defaultViewHandler}
				/>
			) : null}
			{loading === false && pastSelected === true ? (
				<ProfilePastAppts
					pastAppointments={pastAppointments}
					pet={pet}
					currentUser={currentUser}
					forceUpdate={props.forceUpdate}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
					defaultViewHandler={props.defaultViewHandler}
				/>
			) : null}
		</div>
	);
}
