import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Notes } from '@material-ui/icons';
import EditDeleteFoodButtonHandler from './EditDeleteFoodButtonHandler';

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

export default function Appointments(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [isEditFood, setIsEditFood] = useState(false);
	const [isDeleteFood, setIsDeleteFood] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [rowData, setRowData] = useState('');

	//defining columns fields
	//using TextField in order to prevent cell data from extending past cell width
	//disabling TextField in order to prevent user from altering data
	//taking in params.value (row cell value) as TextField value
	//using renderCell to show JSX
	const columns = [
		{
			field: 'Food',
			headerName: 'Food Name ',
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
			field: 'Type',
			headerName: 'Type',
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
			field: 'WetDry',
			headerName: 'Wet/Dry',
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
			field: 'Flavor',
			headerName: 'Flavor',
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
			field: 'Location',
			headerName: 'Location',
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
			field: 'Edit',
			headerName: 'Edit',
			width: 77,
			renderCell: (params) => (
				<Button
					onClick={() => {
						console.log(params);
						setOpenModal(true);
						setIsEditFood(true);
						setRowData(params.row);
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
				<Button
					onClick={() => {
						// console.log(params);
						setOpenModal(true);
						setIsDeleteFood(true);
						setRowData(params.row);
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
	for (let i = 0; i < pet.food.length; i++) {
		rows[i] = {
			id: i,
			Food: pet.food[i].foodName,
			Type: pet.food[i].type,
			WetDry: pet.food[i].wetOrDry,
			Flavor: pet.food[i].flavor,
			Location: pet.food[i].whereToBuy,
			Notes: pet.food[i].notes,
		};
		// console.log(pet.food[i].wetOrDry);
	}

	//sets all flags to false
	const SetOpenModalToFalse = () => {
		setOpenModal(false);
		setIsEditFood(false);
		setIsDeleteFood(false);
		// props.forceUpdate();
	};

	// console.log('params : ' editParams);
	return (
		<div className="appointments-profile-main-container">
			<div className="appointments-title">
				<h1>Food</h1>
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
					rowHeight={72}
				/>
			</div>
			{isEditFood ? (
				<EditDeleteFoodButtonHandler
					isEditFood={isEditFood}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					openModal={openModal}
					SetOpenModalToFalse={SetOpenModalToFalse}
					rowData={rowData}
				/>
			) : null}
			{isDeleteFood ? (
				<EditDeleteFoodButtonHandler
					isDeleteFood={isDeleteFood}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					openModal={openModal}
					SetOpenModalToFalse={SetOpenModalToFalse}
					rowData={rowData}
				/>
			) : null}
		</div>
	);
}
