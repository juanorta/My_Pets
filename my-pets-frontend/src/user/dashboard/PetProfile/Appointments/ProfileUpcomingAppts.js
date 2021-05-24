import React, { useEffect, useState } from 'react';
import './Appointments.css';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialModalProfile from '../../modal/MaterialModalProfile/MaterialModalProfile';
import MaterialModalEditAppt from '../../modal/MaterialModalEdit/MaterialModalEditAppt';
import EditDeleteApptButtonHandler from './EditDeleteApptButtonHandler';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	Button: {
		borderRadius: '69%',
		height: '3.4rem',
		width: '0rem',
		marginLeft: '-0.5rem',
		// backgroundColor: 'red',
	},
	EditIcon: {
		color: '#1b2737',
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

export default function ProfileUpcomingAppts(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [upcomingAppointments, setUpcomingAppointments] = useState(
		props.upcomingAppointments
	);
	const [isEditAppt, setIsEditAppt] = useState(false);
	const [isDeleteAppt, setIsDeleteAppt] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [editParams, setEditParams] = useState('');

	useEffect(() => {}, []);

	//defining columns fields
	//using TextField in order to prevent cell data from extending past cell width
	//disabling TextField in order to prevent user from altering data
	//taking in params.value (row cell value) as TextField value
	//using renderCell to show JSX
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
						setOpenModal(true);
						setIsEditAppt(true);
						setEditParams(params.row);
					}}
					className={classes.Button}
				>
					<EditIcon className={classes.EditIcon} />
				</Button>
			),
		},
		{
			field: 'Delete',
			headerName: 'Delete',
			width: 94,
			renderCell: (params) => (
				<Button
					onClick={() => {
						setOpenModal(true);
						setIsDeleteAppt(true);
						setEditParams(params.row);
					}}
					className={classes.Button}
				>
					<DeleteIcon className={classes.DeleteIcon} />
				</Button>
			),
		},
	];

	//loading each row with a pet appointment object
	let rows = [];
	for (let i = 0; i < upcomingAppointments.length; i++) {
		let date = moment(upcomingAppointments[i].date).format('MM/DD/YYYY');
		rows[i] = {
			id: i,
			Date: date,
			Time: upcomingAppointments[i].time + upcomingAppointments[i].amOrPm,
			Type: upcomingAppointments[i].type,
			Reason: upcomingAppointments[i].reason,
			Notes: upcomingAppointments[i].notes,
			VetGroomer: upcomingAppointments[i].vetOrGroomerName,
		};
	}

	const cellClickHandler = (params) => {
		if (params.field == 'Edit') {
			editHandler(params);
		} else if (params.field == 'Delete') {
			deleteHandler(params);
		}
	};

	const editHandler = (params) => {
		setOpenModal(true);
		setIsEditAppt(true);
		setIsDeleteAppt(false);
	};

	const deleteHandler = (params) => {
		setOpenModal(true);
		setIsDeleteAppt(true);
		setIsEditAppt(true);
	};

	//sets all flags to false
	const SetOpenModalToFalse = () => {
		// setOpenModal(false);
		setOpenModal(false);
		setIsEditAppt(false);
		setIsDeleteAppt(false);
		// props.forceUpdate();
	};

	return (
		<div className="appointments-profile-main-container">
			<h2>upcoming</h2>
			<div
				style={{
					height: 400,
					width: '70%',
					margin: '0 auto',
				}}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					rowHeight={72}
					// onCellClick={(CellParams) => {}}
				/>
			</div>
			{isEditAppt ? (
				<EditDeleteApptButtonHandler
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					isEditAppt={isEditAppt}
					openModal={openModal}
					SetOpenModalToFalse={SetOpenModalToFalse}
					editParams={editParams}
					defaultViewHandler={props.defaultViewHandler}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}

			{isDeleteAppt ? (
				<EditDeleteApptButtonHandler
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					isDeleteAppt={isDeleteAppt}
					openModal={openModal}
					SetOpenModalToFalse={SetOpenModalToFalse}
					editParams={editParams}
					defaultViewHandler={props.defaultViewHandler}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}
		</div>
	);
}
