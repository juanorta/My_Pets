import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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

export default function CurrentMedications(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [currentMedications, setCurrentMedications] = useState(
		props.currentMedications
	);
	const [loading, setLoading] = useState(true);

	const columns = [
		{
			field: 'endDate',
			headerName: 'End Date',
			width: 150,
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
			field: 'startDate',
			headerName: 'Start Date',
			width: 150,

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
			field: 'name',
			headerName: 'Name',
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
			field: 'dosageInstructions',
			headerName: 'Dosage Instructions',
			width: 180,
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
						// setOpenModal(true);
						// setIsEditWeight(true);
						// setRowData(params.row);
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
						// setOpenModal(true);
						// setIsDeleteWeight(true);
						// setRowData(params.row);
					}}
					className={classes.Button}
				>
					<DeleteIcon className={classes.DeleteIcon} />
				</Button>
			),
		},
	];

	let rows = [];

	for (let i = 0; i < currentMedications.length; i++) {
		let date1 = moment(currentMedications[i].endDate).format('MM/DD/YYYY');
		let date2 = moment(currentMedications[i].startDate).format(
			'MM/DD/YYYY'
		);

		rows[i] = {
			id: i,

			endDate: date1,
			startDate: date2,
			name: currentMedications[i].medicationName,
			type: currentMedications[i].dosageInstructions,
		};
	}

	const SetOpenModalToFalse = () => {
		// setOpenModal(false);
		// setOpenModal(false);
		// setIsEditWeight(false);
		// setIsDeleteWeight(false);
		// props.forceUpdate();
	};
	// console.log(sortedWeights);
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
				sortModel={[
					{
						field: 'endDate',
						sort: 'asc',
					},
				]}
				// sortModel={[
				// 	{
				// 		field: 'commodity',
				// 		sort: 'asc',
				// 	},
				// ]}
				// onCellClick={(CellParams) => {}}
			/>
			{/* {isEditWeight ? (
				<EditDeleteFoodButtonHandler
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
			) : null} */}
		</div>
	);
}
