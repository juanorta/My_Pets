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
import AddButton from './AddButton/AddButton';
// import '../dashboard/modal/AddPetModal';
import MaterialModal from './modal/MaterialModal';

const useStyles = makeStyles({
	root: {
		width: '60rem',
		borderRadius: '10px',
		height: 400,
		marginLeft: '25%',
		marginTop: '5rem',
		boxShadow: '0 1px 6px rgba(0, 0, 0, 0.67);',
		// fontFamily: 'Poppins',
	},

	typography: {
		fontFamily: 'Poppins',
		fontWeight: '400',
	},

	table: {
		minWidth: 150,
		// borderRadius: "25%"
	},
});

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'Name', headerName: 'Name', width: 130 },
	{ field: 'Breed', headerName: 'Breed', width: 130 },
	{
		field: 'age',
		headerName: 'Age',
		type: 'string',
		width: 90,
	},
	{
		field: 'Sex',
		headerName: 'Sex',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 160,

		valueGetter: (params) =>
			`${params.getValue('firstName') || ''} ${
				params.getValue('lastName') || ''
			}`,
	},
];

const rows = [
	{ id: 1, Name: 'Snow', Breed: 'Jon', age: 35, Sex: 'Male' },
	{ id: 2, Name: 'Lannister', Breed: 'Cersei', age: 42 },
	{ id: 3, Name: 'Lannister', Breed: 'Jaime', age: 45 },
	{ id: 4, Name: 'Stark', Breed: 'Arya', age: 16 },
	{ id: 5, Name: 'Targaryen', Breed: 'Daenerys', age: null },
	{ id: 6, Name: 'Melisandre', Breed: null, age: 150 },
	{ id: 7, Name: 'Clifford', Breed: 'Ferrara', age: 44 },
	{ id: 8, Name: 'Frances', Breed: 'Rossini', age: 36 },
	{ id: 9, Name: 'Roxie', Breed: 'Harvey', age: 65 },
];

export default function Dashboard(props) {
	const theme = useTheme();
	const classes = useStyles();
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
			{/* <h1>Pets</h1
			<TableContainer className={classes.root}>
				<DataGrid
					className={classes.typography}
					// style={{ borderRadius: '15' }}
					rows={rows}
					columns={columns}
					pageSize={5}
				/>
			</TableContainer> */}
		</div>
	);
}
