import React, { Component } from 'react';
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

//main component. data is passed down to child components
export default function Dashboard(props) {
	// console.log(props);
	return (
		<div className="dashboard-main-container">
			<AddButton
				forceUpdate={props.forceUpdate}
				currentUser={props.currentUser}
			/>
			<Pets
				forceUpdate={props.forceUpdate}
				currentUser={props.currentUser}
			/>
			<Appointments />
			<Weights />
		</div>
	);
}
