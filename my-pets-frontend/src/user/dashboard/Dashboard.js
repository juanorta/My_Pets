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
	const [sortedAppointments, setSortedAppointments] = useState('');
	const [upcomingAppointments, setUpcomingAppointments] = useState('');
	const [pastAppointments, setPastAppointments] = useState('');
	const [loading, setLoading] = useState(true);
	const [upcomingPreventatives, setUpcomingPreventatives] = useState('');
	const [pastPreventatives, setPastPreventatives] = useState('');
	const [currentMedications, setCurrentMedications] = useState('');
	const [pastMedications, setPastMedications] = useState('');
	const [petPictures, setPetPictures] = useState('');

	useEffect(() => {}, []);

	//storing pictures from Pets to be reused in DashboardAppointments, Preventatives,
	//Medications, and Vets
	const getPetPics = (pictures) => {
		setPetPictures(pictures);
	};

	return (
		<div
			className="dashboard-main-container"
			style={{ overflowX: 'hidden !important' }}
		>
			<AddButton
				forceUpdate={props.forceUpdate}
				currentUser={props.currentUser}
			/>

			<Pets
				forceUpdate={props.forceUpdate}
				currentUser={props.currentUser}
				getPetPics={getPetPics}
			/>

			<Suspense fallback={<div>Loading Appointments...</div>}>
				{petPictures == '' ? null : (
					<DashboardAppointments
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
