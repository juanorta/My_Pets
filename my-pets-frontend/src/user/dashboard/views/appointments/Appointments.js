import React, { Component, useState, useEffect } from 'react';
import './Appointments.css';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import { getAllAppointments } from '../../../../util/APIUtils';
import { TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	root: {
		color: 'black',
		'.MuiDataGrid-colCellCheckbox': {
			backgroundColor: 'red',
		},
		// marginTop: '0rem',
		// backgroundColor: 'blue',
		// borderRadius: ,
	},
	Button: {
		borderRadius: '69%',
		height: '3.4rem',
		width: '0rem',
		marginLeft: '-0.5rem',
		// backgroundColor: 'red',
	},
	EditIcon: {
		color: 'teal',
	},
	DeleteIcon: {
		color: 'red',
	},
	TextField: {
		color: 'black',
		'& .MuiInputBase-root.Mui-disabled': {
			color: 'black', // (default alpha is 0.38)
			fontSize: '0.85rem',
		},
	},
}));

export default function Appointments(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);

	useEffect(() => {
		getAllAppointments(currentUser.id)
			.then((response) => {
				//console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const columns = [
		{
			field: 'Date',
			headerName: 'Date',
			width: 130,

			renderCell: (params) => (
				<TextField
					className={classes.TextField}
					// style={{ color: 'black' }}
					InputProps={{ disableUnderline: true }}
					multiline
					disabled={true}
					value={params.value}
				/>
			),
		},
		{
			field: 'Pet',
			headerName: 'Pet',
			width: 90,
			renderCell: (params) => (
				<TextField
					className={classes.TextField}
					// style={{ color: 'black' }}
					InputProps={{ disableUnderline: true }}
					multiline
					disabled={true}
					value={params.value}
				/>
			),
		},
		{
			field: 'Time',
			headerName: 'Time',
			width: 90,
			renderCell: (params) => (
				<TextField
					className={classes.TextField}
					// style={{ color: 'black' }}
					InputProps={{ disableUnderline: true }}
					multiline
					disabled={true}
					value={params.value}
				/>
			),
		},
		{
			field: 'Type',
			headerName: 'Type',
			width: 130,
			renderCell: (params) => (
				<TextField
					className={classes.TextField}
					// style={{ color: 'black' }}
					InputProps={{ disableUnderline: true }}
					multiline
					disabled={true}
					value={params.value}
				/>
			),
		},
		{
			field: 'Reason',
			headerName: 'Reason',
			width: 130,
			renderCell: (params) => (
				<TextField
					className={classes.TextField}
					// style={{ color: 'black' }}
					InputProps={{ disableUnderline: true }}
					multiline
					disabled={true}
					value={params.value}
				/>
			),
		},
		{
			field: 'Notes',
			headerName: 'Notes',
			width: 130,
			renderCell: (params) => (
				<TextField
					className={classes.TextField}
					// style={{ color: 'black' }}
					InputProps={{ disableUnderline: true }}
					multiline
					disabled={true}
					value={params.value}
				/>
			),
		},
		{
			field: 'VetGroomer',
			headerName: 'Vet/Groomer',
			width: 130,
			renderCell: (params) => (
				<TextField
					className={classes.TextField}
					// style={{ color: 'black' }}
					InputProps={{ disableUnderline: true }}
					multiline
					disabled={true}
					value={params.value}
				/>
			),
		},
		{
			field: 'Edit',
			headerName: 'Edit',
			width: 77,
			renderCell: (params) => (
				<Button
					onClick={() => {
						//console.log(params);
					}}
					className={classes.Button}
				>
					<EditIcon className={classes.EditIcon} />
				</Button>

				// <EditButton
				// 	onClick={(params) => {
				// 		console.log(params);
				// 	}}
				// />
			),
		},
		{
			field: 'Delete',
			headerName: 'Delete',
			width: 94,
			renderCell: (params) => (
				<Button onClick={() => {}} className={classes.Button}>
					<DeleteIcon className={classes.DeleteIcon} />
				</Button>
			),
		},
	];

	//loading each row with a pet appointment object
	let rows = [];
	for (let i = 0; i < currentUser.appointments.length; i++) {
		let date = moment(currentUser.appointments[i].date).format(
			'MM/DD/YYYY'
		);
		rows[i] = {
			id: i,
			Date: date,
			Pet: currentUser.appointments[i].petName,
			Time:
				currentUser.appointments[i].time +
				currentUser.appointments[i].amOrPm,
			Type: currentUser.appointments[i].type,
			Reason: currentUser.appointments[i].reason,
			Notes: currentUser.appointments[i].notes,
			VetGroomer: currentUser.appointments[i].vetOrGroomerName,
		};
	}
	return (
		<div className="appointments-main-container" id="appointments">
			<div className="title">
				<h1>Appointments</h1>
			</div>
			<div
				className="appointments-table"
				style={{ height: 400, width: '100%' }}
			>
				<DataGrid
					className={classes.root}
					rows={rows}
					columns={columns}
					pageSize={5}
					rowHeight={55}
				/>
			</div>
		</div>
	);
}
