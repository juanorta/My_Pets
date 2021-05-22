import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Notes } from '@material-ui/icons';
import EditDeleteFoodButtonHandler from '../EditDeleteFoodButtonHandler';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

export default function FoodTable(props) {
	const theme = useTheme();
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [isEditFood, setIsEditFood] = useState(false);
	const [isDeleteFood, setIsDeleteFood] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [rowData, setRowData] = useState('');
	const small = useMediaQuery(theme.breakpoints.down('sm'));

	let width = '70%';

	if (small) {
		width = '90%';
	}

	//defining columns fields
	//using TextField in order to prevent cell data from extending past cell width
	//disabling TextField in order to prevent user from altering data
	//taking in params.value (row cell value) as TextField value
	//using renderCell to show JSX
	const columns = [
		{
			field: 'foodName',
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
			field: 'type',
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
			field: 'wetOrDry',
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
			field: 'flavor',
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
			field: 'whereToBuy',
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
			field: 'notes',
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
	for (let i = 0; i < props.food.length; i++) {
		rows[i] = {
			id: i,
			foodName: props.food[i].foodName,
			type: props.food[i].type,
			wetOrDry: props.food[i].wetOrDry,
			flavor: props.food[i].flavor,
			whereToBuy: props.food[i].whereToBuy,
			notes: props.food[i].notes,
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
		<div
			className="appointments-profile-main-container"
			// style={{ backgroundColor: 'red' }}
		>
			{/* <div className="appointments-title">
				<h1>Food</h1>
			</div> */}
			{/* <div className="spacer" style={{ marginBottom: '0rem' }}></div> */}
			<div
				style={{
					height: 400,
					width: width,
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
					ReloadComponent={props.ReloadComponent}
					food={props.food}
					ReloadPet={props.ReloadPet}
					isEditFood={isEditFood}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					openModal={openModal}
					SetOpenModalToFalse={SetOpenModalToFalse}
					rowData={rowData}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}
			{isDeleteFood ? (
				<EditDeleteFoodButtonHandler
					ReloadComponent={props.ReloadComponent}
					food={props.food}
					ReloadPet={props.ReloadPet}
					isDeleteFood={isDeleteFood}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					openModal={openModal}
					SetOpenModalToFalse={SetOpenModalToFalse}
					rowData={rowData}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}
		</div>
	);
}
