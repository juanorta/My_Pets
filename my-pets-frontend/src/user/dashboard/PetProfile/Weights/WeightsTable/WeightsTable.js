import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import EditDeleteFoodButtonHandler from '../EditDeleteWeightButtonHandler';
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

export default function WeightsTable(props) {
	const theme = useTheme();
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [isEditWeight, setIsEditWeight] = useState(false);
	const [isDeleteWeight, setIsDeleteWeight] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [rowData, setRowData] = useState('');
	const [sortedWeights, setSortedWeights] = useState(props.sortedWeights);
	const small = useMediaQuery(theme.breakpoints.down('sm'));

	let width = '70%';

	if (small) {
		width = '90%';
	}
	// console.log('unsorted weights');
	// console.log(pet.weights);
	// console.log('sorted weights');
	// console.log(sortedWeights);

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
	let j = 0;
	for (let i = sortedWeights.length - 1; i >= 0; i--) {
		let date = moment(sortedWeights[i].dateWeighed).format('MM/DD/YYYY');
		rows[j] = {
			id: i,
			Date: date,
			Weight: sortedWeights[i].weightValue + sortedWeights[i].unit,
			Notes: sortedWeights[i].notes,
		};
		j++;
	}
	// console.log(pet.weights);

	const SetOpenModalToFalse = () => {
		// setOpenModal(false);
		setOpenModal(false);
		setIsEditWeight(false);
		setIsDeleteWeight(false);
		// props.forceUpdate();
	};
	// console.log(sortedWeights);
	return (
		<div
			style={{
				height: 400,
				width: width,
				margin: '0 auto',
				// backgroundColor: 'red',
			}}
		>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowHeight={72}
				// sortModel={[
				// 	{
				// 		field: 'commodity',
				// 		sort: 'asc',
				// 	},
				// ]}
				// onCellClick={(CellParams) => {}}
			/>
			{isEditWeight ? (
				<EditDeleteFoodButtonHandler
					ReloadPet={props.ReloadPet}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					isEditWeight={isEditWeight}
					openModal={openModal}
					SetOpenModalToFalse={SetOpenModalToFalse}
					rowData={rowData}
					sortedWeights={sortedWeights}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}
			{isDeleteWeight ? (
				<EditDeleteFoodButtonHandler
					ReloadPet={props.ReloadPet}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					isDeleteWeight={isDeleteWeight}
					openModal={openModal}
					SetOpenModalToFalse={SetOpenModalToFalse}
					rowData={rowData}
					sortedWeights={sortedWeights}
					defaultViewHandler={props.defaultViewHandler}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}
		</div>
	);
}
