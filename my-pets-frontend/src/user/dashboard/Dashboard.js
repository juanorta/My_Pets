import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { addPet } from '../../util/APIUtils';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Pets from './views/pets/Pets';
import Appointments from './views/appointments/Appointments';
import Weights from './views/weights/Weights';
import AddButton from './AddPet/AddButton/AddButton';
// import '../dashboard/modal/AddPetModal';
import MaterialModal from './modal/MaterialModal';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Greeting from './views/greeting/Greeting';
import Overview from './views/overview/Overview';
import { getAllWeights } from '../../util/APIUtils';
import Food from './views/food/Food';
import DashboardAppointments from './views/appointments/DashboardAppointments';
import Preventatives from './views/preventatives/Preventatives';
import Medications from './views/medications/Medications';
import Vets from './views/Vets/Vets';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: 'teal',
		'&.MuiDataGrid-colCellWrapper': {
			backgroundColor: 'red',
		},
	},
	control: {
		padding: theme.spacing(2),
	},
}));

//main component. data is passed down to child components
export default function Dashboard(props) {
	const theme = useTheme();
	const classes = useStyles();
	const matches = useMediaQuery(theme.breakpoints.down('xs'));
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [weightObjects, setWeightObjects] = useState('');

	const [appointments, setAppointments] = useState(currentUser.appointments);
	const [sortedAppointments, setSortedAppointments] = useState('');
	const [upcomingAppointments, setUpcomingAppointments] = useState('');
	const [pastAppointments, setPastAppointments] = useState('');
	const [loading, setLoading] = useState(true);

	const [preventatives, setPreventatives] = useState(
		currentUser.preventatives
	);
	const [upcomingPreventatives, setUpcomingPreventatives] = useState('');
	const [pastPreventatives, setPastPreventatives] = useState('');

	const [medications, setMedications] = useState(currentUser.medications);
	const [currentMedications, setCurrentMedications] = useState('');
	const [pastMedications, setPastMedications] = useState('');

	useEffect(() => {
		sortAppointments();
		sortPreventatives();
		sortMedications();
		setLoading(false);
	}, []);

	const sortAppointments = () => {
		let sortedAppointmentsArray = appointments.slice();
		sortedAppointmentsArray.sort(function compare(a, b) {
			var dateA = new Date(a.date);
			var dateB = new Date(b.date);
			return dateB - dateA;
		});
		// console.log(sortedAppointmentsArray);

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
			// console.log(newDate);
			if (newDate > now) {
				// console.log('UPCOMING');
				// console.log(newDate);
				upcomingArray[j] = sortedAppointmentsArray[i];
				j++;
			} else if (sameDate == todayFormatted) {
				// console.log('SAME');
				// console.log(newDate);
				upcomingArray[j] = sortedAppointmentsArray[i];
				j++;
			} else {
				// console.log('PAST');
				// console.log(newDate);
				pastArray[k] = sortedAppointmentsArray[i];
				k++;
			}

			setUpcomingAppointments(upcomingArray);
			setPastAppointments(pastArray);
			setSortedAppointments(sortedAppointmentsArray);
			// setLoading(false);
		}
	};

	const sortPreventatives = () => {
		let sortedPreventatives = preventatives.slice();
		sortedPreventatives.sort(function compare(a, b) {
			var dateA = new Date(a.dueNext);
			var dateB = new Date(b.dueNext);
			return dateB - dateA;
		});

		var now = new Date();
		let upcomingArray = [];
		let pastArray = [];
		let j = 0;
		let k = 0;

		for (var i = 0; i < sortedPreventatives.length; i++) {
			var newDate = moment(sortedPreventatives[i].dueNext).toDate();
			var sameDate = moment(sortedPreventatives[i].dueNext).format(
				'MM/DD/YYYY'
			);

			var todayFormatted = moment(now).format('MM/DD/YYYY');
			// console.log(newDate);
			if (newDate > now) {
				// console.log('UPCOMING');
				// console.log(newDate);
				upcomingArray[j] = sortedPreventatives[i];
				j++;
			} else if (sameDate == todayFormatted) {
				// console.log('SAME');
				// console.log(newDate);
				upcomingArray[j] = sortedPreventatives[i];
				j++;
			} else {
				// console.log('PAST');
				// console.log(newDate);
				pastArray[k] = sortedPreventatives[i];
				k++;
			}
		}

		// console.log(sortedPreventatives);
		// console.log(upcomingArray);
		// console.log(pastArray);

		setUpcomingPreventatives(upcomingArray);
		setPastPreventatives(pastArray);
	};

	const sortMedications = () => {
		let sortedMedications = medications.slice();
		sortedMedications.sort(function compare(a, b) {
			var dateA = new Date(a.endDate);
			var dateB = new Date(b.endDate);
			return dateB - dateA;
		});

		var now = new Date();
		let currentArray = [];
		let pastArray = [];
		let j = 0;
		let k = 0;

		for (var i = 0; i < sortedMedications.length; i++) {
			var newDate = moment(sortedMedications[i].endDate).toDate();
			var sameDate = moment(sortedMedications[i].endDate).format(
				'MM/DD/YYYY'
			);

			var todayFormatted = moment(now).format('MM/DD/YYYY');
			// console.log(newDate);
			if (newDate > now) {
				// console.log('UPCOMING');
				// console.log(newDate);
				currentArray[j] = sortedMedications[i];
				j++;
			} else if (sameDate == todayFormatted) {
				// console.log('SAME');
				// console.log(newDate);
				currentArray[j] = sortedMedications[i];
				j++;
			} else {
				// console.log('PAST');
				// console.log(newDate);
				pastArray[k] = sortedMedications[i];
				k++;
			}
		}
		// console.log(medications);
		// console.log(sortedMedications);
		// console.log(currentArray);
		// console.log(pastArray);
		setCurrentMedications(currentArray);
		setPastMedications(pastArray);
	};

	// console.log(props);
	// console.log('weight object dash');
	// console.log(weightObjects);
	return (
		<div className="dashboard-main-container">
			<AddButton
				forceUpdate={props.forceUpdate}
				currentUser={props.currentUser}
			/>

			{/* <Greeting
				forceUpdate={props.forceUpdate}
				currentUser={props.currentUser}
			/> */}
			{loading === false ? (
				<div>
					{/* <Overview
						forceUpdate={props.forceUpdate}
						currentUser={props.currentUser}
						upcomingAppointments={upcomingAppointments}
						upcomingPreventatives={upcomingPreventatives}
						currentMedications={currentMedications}
					/> */}

					<Pets
						forceUpdate={props.forceUpdate}
						currentUser={props.currentUser}
					/>

					{/* <Appointments
				forceUpdate={props.forceUpdate}
				currentUser={props.currentUser}
			/> */}
					<DashboardAppointments
						upcomingAppointments={upcomingAppointments}
						pastAppointments={pastAppointments}
						forceUpdate={props.forceUpdate}
						currentUser={props.currentUser}
					/>
					<Weights
						forceUpdate={props.forceUpdate}
						currentUser={props.currentUser}
					/>
					<Food
						forceUpdate={props.forceUpdate}
						currentUser={props.currentUser}
						changeDefaultViewsAndRefresh={
							props.changeDefaultViewsAndRefresh
						}
					/>
					<Preventatives
						forceUpdate={props.forceUpdate}
						currentUser={props.currentUser}
						changeDefaultViewsAndRefresh={
							props.changeDefaultViewsAndRefresh
						}
						upcomingPreventatives={upcomingPreventatives}
						pastPreventatives={pastPreventatives}
					/>
					<Medications
						forceUpdate={props.forceUpdate}
						currentUser={props.currentUser}
						changeDefaultViewsAndRefresh={
							props.changeDefaultViewsAndRefresh
						}
						currentMedications={currentMedications}
						pastMedications={pastMedications}
					/>
					<Vets
						forceUpdate={props.forceUpdate}
						currentUser={props.currentUser}
						changeDefaultViewsAndRefresh={
							props.changeDefaultViewsAndRefresh
						}
					/>
				</div>
			) : null}
		</div>
	);
}
