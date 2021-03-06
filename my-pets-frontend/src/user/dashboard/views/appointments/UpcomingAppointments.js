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

//gets upcoming appointments from DashboardAppointments
export default function UpcomingAppointments(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [upcomingAppointments, setUpcomingAppointments] = useState(
		props.upcomingAppointments
	);

	const [loading, setLoading] = useState(true);
	const [petPictures, setPetPictures] = useState(props.petPictures);

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
						onClick={() => {}}
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
	];

	//loading each row with a pet appointment object

	//only complete when the component finishes loading

	//if i have a hash set with key = petid, and value = data,
	//Picture: set.lookup(petId)

	const findPictureById = (id) => {
		for (var i = 0; i < petPictures.length; i++) {
			if (petPictures[i].id == id) {
				if (petPictures[i].petImage == null) {
					return '';
				} else return petPictures[i].petImage.data;
			} else {
			}
		}
	};

	let rows = [];
	if (loading === false) {
		for (let i = 0; i < upcomingAppointments.length; i++) {
			let date = moment(upcomingAppointments[i].date).format(
				'MM/DD/YYYY'
			);

			let picture = findPictureById(upcomingAppointments[i].petAptId);

			rows[i] = {
				id: i,
				Date: date,
				Picture: picture,
				Pet: upcomingAppointments[i].petName,
				Time:
					upcomingAppointments[i].time +
					upcomingAppointments[i].amOrPm,
				Type: upcomingAppointments[i].type,
				Reason: upcomingAppointments[i].reason,
				Notes: upcomingAppointments[i].notes,
				VetGroomer: upcomingAppointments[i].vetOrGroomerName,
			};
		}
	}
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
					rowHeight={75}
					sortModel={[
						{
							field: 'Date',
							sort: 'asc',
						},
					]}
				/>
			</div>
		</div>
	);
}
