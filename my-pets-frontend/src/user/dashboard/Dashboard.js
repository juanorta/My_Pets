import React, { useState, useEffect, lazy, Suspense } from 'react';
import './Dashboard.css';
import { addPet, getPet } from '../../util/APIUtils';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Pets from './views/pets/Pets';
import Appointments from './views/appointments/Appointments';
// import Weights from './views/weights/Weights';
import AddButton from './AddPet/AddButton/AddButton';
// import '../dashboard/modal/AddPetModal';
import MaterialModal from './modal/MaterialModal';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Greeting from './views/greeting/Greeting';
import Overview from './views/overview/Overview';
import { getAllWeights } from '../../util/APIUtils';
import moment from 'moment';

// const Pets = lazy(() => import('./views/pets/Pets'));

//lazy loading components
const DashboardAppointments = lazy(() =>
	import('./views/appointments/DashboardAppointments')
);

const Weights = lazy(() => import('./views/weights/Weights'));

const Food = lazy(() => import('./views/food/Food'));

const Preventatives = lazy(() => import('./views/preventatives/Preventatives'));

const Medications = lazy(() => import('./views/medications/Medications'));

const Vets = lazy(() => import('./views/Vets/Vets'));

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

	//const [appointments, setAppointments] = useState(currentUser.appointments);
	const [sortedAppointments, setSortedAppointments] = useState('');
	const [upcomingAppointments, setUpcomingAppointments] = useState('');
	const [pastAppointments, setPastAppointments] = useState('');
	const [loading, setLoading] = useState(true);

	// const [preventatives, setPreventatives] = useState(
	// 	currentUser.preventatives
	// );
	const [upcomingPreventatives, setUpcomingPreventatives] = useState('');
	const [pastPreventatives, setPastPreventatives] = useState('');

	//const [medications, setMedications] = useState(currentUser.medications);
	const [currentMedications, setCurrentMedications] = useState('');
	const [pastMedications, setPastMedications] = useState('');
	const [petPictures, setPetPictures] = useState('');

	useEffect(() => {
		// sortAppointments();
		// sortPreventatives();
		// sortMedications();
		// setLoading(false);
	}, []);

	const getPetPics = (pictures) => {
		// console.log('getting pet picks');
		// console.log(pictures);
		setPetPictures(pictures);
	};

	// const sortPreventatives = () => {
	// 	let sortedPreventatives = preventatives.slice();
	// 	sortedPreventatives.sort(function compare(a, b) {
	// 		var dateA = new Date(a.dueNext);
	// 		var dateB = new Date(b.dueNext);
	// 		return dateB - dateA;
	// 	});

	// 	var now = new Date();
	// 	let upcomingArray = [];
	// 	let pastArray = [];
	// 	let j = 0;
	// 	let k = 0;

	// 	for (var i = 0; i < sortedPreventatives.length; i++) {
	// 		var newDate = moment(sortedPreventatives[i].dueNext).toDate();
	// 		var sameDate = moment(sortedPreventatives[i].dueNext).format(
	// 			'MM/DD/YYYY'
	// 		);

	// 		var todayFormatted = moment(now).format('MM/DD/YYYY');
	// 		// console.log(newDate);
	// 		if (newDate > now) {
	// 			// console.log('UPCOMING');
	// 			// console.log(newDate);
	// 			upcomingArray[j] = sortedPreventatives[i];
	// 			j++;
	// 		} else if (sameDate == todayFormatted) {
	// 			// console.log('SAME');
	// 			// console.log(newDate);
	// 			upcomingArray[j] = sortedPreventatives[i];
	// 			j++;
	// 		} else {
	// 			// console.log('PAST');
	// 			// console.log(newDate);
	// 			pastArray[k] = sortedPreventatives[i];
	// 			k++;
	// 		}
	// 	}

	// 	// console.log(sortedPreventatives);
	// 	// console.log(upcomingArray);
	// 	// console.log(pastArray);

	// 	setUpcomingPreventatives(upcomingArray);
	// 	setPastPreventatives(pastArray);
	// };

	// const sortMedications = () => {
	// 	let sortedMedications = medications.slice();
	// 	sortedMedications.sort(function compare(a, b) {
	// 		var dateA = new Date(a.endDate);
	// 		var dateB = new Date(b.endDate);
	// 		return dateB - dateA;
	// 	});

	// 	var now = new Date();
	// 	let currentArray = [];
	// 	let pastArray = [];
	// 	let j = 0;
	// 	let k = 0;

	// 	for (var i = 0; i < sortedMedications.length; i++) {
	// 		var newDate = moment(sortedMedications[i].endDate).toDate();
	// 		var sameDate = moment(sortedMedications[i].endDate).format(
	// 			'MM/DD/YYYY'
	// 		);

	// 		var todayFormatted = moment(now).format('MM/DD/YYYY');
	// 		// console.log(newDate);
	// 		if (newDate > now) {
	// 			// console.log('UPCOMING');
	// 			// console.log(newDate);
	// 			currentArray[j] = sortedMedications[i];
	// 			j++;
	// 		} else if (sameDate == todayFormatted) {
	// 			// console.log('SAME');
	// 			// console.log(newDate);
	// 			currentArray[j] = sortedMedications[i];
	// 			j++;
	// 		} else {
	// 			// console.log('PAST');
	// 			// console.log(newDate);
	// 			pastArray[k] = sortedMedications[i];
	// 			k++;
	// 		}
	// 	}
	// 	// console.log(medications);
	// 	// console.log(sortedMedications);
	// 	// console.log(currentArray);
	// 	// console.log(pastArray);
	// 	setCurrentMedications(currentArray);
	// 	setPastMedications(pastArray);
	// };

	// console.log(props);
	// console.log('weight object dash');
	// console.log(weightObjects);

	// console.log('PET PICTURES');
	// console.log(petPictures);
	return (
		<div
			className="dashboard-main-container"
			style={{ overflowX: 'hidden !important' }}
		>
			<AddButton
				forceUpdate={props.forceUpdate}
				currentUser={props.currentUser}
			/>

			{/* <Greeting
				forceUpdate={props.forceUpdate}
				currentUser={props.currentUser}
			/> */}
			{/* {loading === false ? (
				<div> */}

			<Pets
				forceUpdate={props.forceUpdate}
				currentUser={props.currentUser}
				getPetPics={getPetPics}
			/>

			<Suspense fallback={<div>Loading Appointments...</div>}>
				{petPictures == '' ? null : (
					<DashboardAppointments
						// upcomingAppointments={upcomingAppointments}
						// pastAppointments={pastAppointments}
						forceUpdate={props.forceUpdate}
						currentUser={props.currentUser}
						petPictures={petPictures}
					/>
				)}
			</Suspense>

			<Suspense fallback={<div>Loading Weights...</div>}>
				<Weights
					forceUpdate={props.forceUpdate}
					currentUser={props.currentUser}
				/>
			</Suspense>
			<Suspense fallback={<div>Loading Food...</div>}>
				<Food
					forceUpdate={props.forceUpdate}
					currentUser={props.currentUser}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			</Suspense>
			<Suspense fallback={<div>Loading Preventatives...</div>}>
				{petPictures == '' ? null : (
					<Preventatives
						forceUpdate={props.forceUpdate}
						currentUser={props.currentUser}
						changeDefaultViewsAndRefresh={
							props.changeDefaultViewsAndRefresh
						}
						petPictures={petPictures}
						// upcomingPreventatives={upcomingPreventatives}
						// pastPreventatives={pastPreventatives}
					/>
				)}
			</Suspense>
			<Suspense fallback={<div>Loading Medications...</div>}>
				{petPictures == '' ? null : (
					<Medications
						forceUpdate={props.forceUpdate}
						currentUser={props.currentUser}
						changeDefaultViewsAndRefresh={
							props.changeDefaultViewsAndRefresh
						}
						petPictures={petPictures}
						// currentMedications={currentMedications}
						// pastMedications={pastMedications}
					/>
				)}
			</Suspense>

			<Suspense fallback={<div>Loading Vets...</div>}>
				{petPictures == '' ? null : (
					<Vets
						forceUpdate={props.forceUpdate}
						currentUser={props.currentUser}
						changeDefaultViewsAndRefresh={
							props.changeDefaultViewsAndRefresh
						}
						petPictures={petPictures}
					/>
				)}
			</Suspense>
		</div>
	);
}
