import React, { useState } from 'react';
import './Appointments.css';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
	Button: {
		borderRadius: '69%',
		height: '3.4rem',
		width: '0rem',
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

export default function Appointments(props) {
	const classes = useStyles();
	const [pet, setPet] = useState(props.pet);

	let rows = [];
	for (let i = 0; i < pet.appointments.length; i++) {
		rows[i] = {
			id: i,
			Date: pet.appointments[i].date,
			Time: pet.appointments[i].time + pet.appointments[i].amOrPm,
			Type: pet.appointments[i].type,
			Reason: pet.appointments[i].reason,
			Notes: pet.appointments[i].notes,
			VetGroomer: pet.appointments[i].vetOrGroomerName,
		};
	}

	let columns = [];
	// for (let i = 0; i < pet.appointments.length; i++) {
	columns = [
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
			renderCell: () => (
				<Button className={classes.Button}>
					<EditIcon className={classes.EditIcon} />
				</Button>
			),
		},
		{
			field: 'Delete',
			headerName: 'Delete',
			renderCell: () => (
				<Button className={classes.Button}>
					<DeleteIcon className={classes.DeleteIcon} />
				</Button>
			),
		},
	];
	// }

	// const rows = [
	// 	{ id: 1, Date: 'Snow', Time: 'Jon', Type: 35 },
	// 	{ id: 2, Date: 'Lannister', Time: 'Cersei', Type: 42 },
	// 	{ id: 3, Date: 'Lannister', Time: 'Jaime', Type: 45 },
	// 	{ id: 4, Date: 'Stark', Time: 'Arya', Type: 16 },
	// 	{ id: 5, Date: 'Targaryen', Time: 'Daenerys', Type: 34 },
	// 	{ id: 6, Date: 'Melisandre', Time: null, Type: 150 },
	// 	{ id: 7, Date: 'Clifford', Time: 'Ferrara', Type: 44 },
	// 	{ id: 8, Date: 'Frances', Time: 'Rossini', Type: 36 },
	// 	{ id: 9, Date: 'Roxie', Time: 'Harvey', Type: 65 },
	// ];

	console.log(props);
	return (
		<div className="appointments-profile-main-container">
			<div className="appointments-title">
				<h1>Appointments</h1>
			</div>
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
					// checkboxSelection
					rowHeight={72}
					onCellClick={(CellParams) => {
						console.log(CellParams);
					}}
				/>
			</div>
			;
		</div>
	);
}
