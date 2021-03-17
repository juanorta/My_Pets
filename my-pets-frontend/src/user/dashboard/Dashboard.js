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

			{/* <Overview /> */}

			<Pets
				forceUpdate={props.forceUpdate}
				currentUser={props.currentUser}
			/>

			<Appointments
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
		</div>
	);
}
