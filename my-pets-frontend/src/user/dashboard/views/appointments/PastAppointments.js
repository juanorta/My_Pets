import React, { Component, useState, useEffect } from 'react';
import './Appointments.css';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import { getAllAppointments } from '../../../../util/APIUtils';
import { IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import {
	mdiAccount,
	mdiDog,
	mdiFoodDrumstick,
	mdiScaleBathroom,
} from '@mdi/js';
import Icon from '@mdi/react';

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
	TextFieldPet: {
		color: 'black',

		'& .MuiInputBase-root.Mui-disabled': {
			color: 'black', // (default alpha is 0.38)
			fontSize: '0.85rem',
			fontWeight: 700,
		},

		marginTop: '1.25rem',
	},
}));

//receives pastAppointments from DashboardAppointments
export default function PastAppointments(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pastAppointments, setPastAppointments] = useState(
		props.pastAppointments
	);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
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
			width: 160,
			renderCell: (params) => (
				<div style={{ backgroundColor: 'transparent' }}>
					{params.row.Picture == '' ? (
						<IconButton className="icon-button-appt">
							<Icon
								path={mdiDog}
								title="Dog Profile"
								size={1.4}
								horizontal
								vertical
								rotate={180}
								color="#1b2737"
								// color="#ff4f00"
							/>
						</IconButton>
					) : (
						<IconButton className="icon-button-appt">
							<img
								className="appt-image"
								src={`data:image/jpeg;base64,${params.row.Picture}`}
							/>
						</IconButton>
					)}

					<TextField
						style={{ cursor: 'pointer' }}
						onClick={() => {
							console.log(params);
						}}
						className={classes.TextFieldPet}
						// style={{ color: 'red' }}
						InputProps={{ disableUnderline: true }}
						multiline
						disabled={true}
						value={params.value}
					/>
				</div>
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

	//only complete when the component finishes loading
	let rows = [];
	if (loading === false) {
		for (let i = 0; i < pastAppointments.length; i++) {
			let date = moment(pastAppointments[i].date).format('MM/DD/YYYY');
			rows[i] = {
				id: i,
				Date: date,
				Picture: pastAppointments[i].data,
				Pet: pastAppointments[i].petName,
				Time: pastAppointments[i].time + pastAppointments[i].amOrPm,
				Type: pastAppointments[i].type,
				Reason: pastAppointments[i].reason,
				Notes: pastAppointments[i].notes,
				VetGroomer: pastAppointments[i].vetOrGroomerName,
			};
		}
	}
	// console.log(sortedAppointments);
	return (
		<div className="dash-upcoming-appts">
			<div
				className="appointments-table"
				style={{ height: 450, width: '90%', marginLeft: '1rem' }}
			>
				<DataGrid
					className={classes.root}
					rows={rows}
					columns={columns}
					pageSize={5}
					rowHeight={65}
				/>
			</div>
		</div>
	);
}
