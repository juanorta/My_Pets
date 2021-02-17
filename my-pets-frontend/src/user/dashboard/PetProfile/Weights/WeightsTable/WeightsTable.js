import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import EditDeleteFoodButtonHandler from '../EditDeleteWeightButtonHandler';

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

export default function WeightsTable(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [isEditWeight, setIsEditWeight] = useState(false);
	const [isDeleteWeight, setIsDeleteWeight] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [rowData, setRowData] = useState('');

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
			field: 'Weight',
			headerName: 'Weight',
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
						console.log(params.row);
						setOpenModal(true);
						setIsEditWeight(true);
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
						// console.log(params.row);
						setOpenModal(true);
						setIsDeleteWeight(true);
						setRowData(params.row);
					}}
					className={classes.Button}
				>
					<DeleteIcon className={classes.DeleteIcon} />
				</Button>
			),
		},
	];

	let rows = [];
	for (let i = 0; i < pet.weights.length; i++) {
		let date = moment(pet.weights[i].dateWeighed).format('MM/DD/YYYY');
		rows[i] = {
			id: i,
			Date: date,
			Weight: pet.weights[i].weightValue + pet.weights[i].unit,
			Notes: pet.weights[i].notes,
		};
	}
	console.log(pet.weights);

	const SetOpenModalToFalse = () => {
		// setOpenModal(false);
		setOpenModal(false);
		setIsEditWeight(false);
		setIsDeleteWeight(false);
		// props.forceUpdate();
	};
	return (
		<div
			style={{
				height: 400,
				width: '70%',
				margin: '0 auto',
				// backgroundColor: 'red',
			}}
		>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowHeight={72}
				// onCellClick={(CellParams) => {}}
			/>
			{isEditWeight ? (
				<EditDeleteFoodButtonHandler
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					isEditWeight={isEditWeight}
					openModal={openModal}
					SetOpenModalToFalse={SetOpenModalToFalse}
					rowData={rowData}
				/>
			) : null}
			{isDeleteWeight ? (
				<EditDeleteFoodButtonHandler
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					isDeleteWeight={isDeleteWeight}
					openModal={openModal}
					SetOpenModalToFalse={SetOpenModalToFalse}
					rowData={rowData}
				/>
			) : null}
		</div>
	);
}
