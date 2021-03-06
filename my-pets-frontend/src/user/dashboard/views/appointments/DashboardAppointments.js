import React, { Component, useState, useEffect } from 'react';
import './DashboardAppointments.css';
import UpcomingAppointments from './UpcomingAppointments';
import PastAppointments from './PastAppointments';
import moment from 'moment';
import { getAllAppointments } from '../../../../util/APIUtils';

//sorts appointments and sends upcoming appts to UpcomingAppointments
//and past appts to PastAppointments
export default function DashboardAppointments(props) {
	const [loading, setLoading] = useState(true);
	const [upcomingClicked, setUpcomingClicked] = useState(true);
	const [pastClicked, setPastClicked] = useState(false);
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	// const [pets, setPets] = useState(props.currentUser.pets);
	// const [appointments, setAppointments] = useState(currentUser.appointments);
	const [sortedAppointments, setSortedAppointments] = useState('');
	const [upcomingAppointments, setUpcomingAppointments] = useState(
		props.upcomingAppointments
	);
	const [pastAppointments, setPastAppointments] = useState(
		props.pastAppointments
	);

	const [petPictures, setPetPictures] = useState(props.petPictures);
	const [hasAppointments, setHasAppointments] = useState(true);

	//getting all appointments and passing them to Upcoming and Past Appointments
	useEffect(() => {
		fetchAppointments();
	}, []);

	const fetchAppointments = () => {
		getAllAppointments(currentUser.id)
			.then((response) => {
				if (response.length < 1) {
					setHasAppointments(false);
				} else {
					sortAppointments(response);
				}
			})
			.catch((error) => {});
	};

	const sortAppointments = (appointments) => {
		//sorting appts from future to past
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
	};

	//used to switch between Upcoming and Past views
	const upcomingHandler = () => {
		setUpcomingClicked(true);
		setPastClicked(false);
	};

	const pastHandler = () => {
		setPastClicked(true);
		setUpcomingClicked(false);
	};

	return (
		<div className="food-main-container" id="appointments">
			<div className="title">
				<h1>Appointments</h1>
			</div>

			{hasAppointments === false ? (
				<div className="nopets">
					<h2>
						No Appointments found. To add an appointment entry,
						press the eye icon on your pet's card to go to their
						profile and add an appointment.
					</h2>
				</div>
			) : (
				<div>
					{loading === true ? (
						<h2>Loading upcoming and past appointments...</h2>
					) : (
						<div>
							<ul>
								<li
									key={0}
									onClick={upcomingHandler}
									style={{
										borderBottom:
											upcomingClicked === true
												? '3px solid #ff4f00'
												: null,
									}}
								>
									{' '}
									<h2>Upcoming</h2>
								</li>
								<li
									key={0}
									onClick={pastHandler}
									style={{
										borderBottom:
											pastClicked === true
												? '3px solid #ff4f00'
												: null,
									}}
								>
									<h2>Past</h2>
								</li>
							</ul>
							{upcomingClicked === true ? (
								<UpcomingAppointments
									petPictures={props.petPictures}
									currentUser={currentUser}
									upcomingAppointments={upcomingAppointments}
								/>
							) : null}

							{pastClicked === true ? (
								<PastAppointments
									petPictures={props.petPictures}
									currentUser={currentUser}
									pastAppointments={pastAppointments}
								/>
							) : null}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
