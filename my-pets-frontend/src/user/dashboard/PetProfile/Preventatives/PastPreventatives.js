import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import EditDeletePrevBtnHandler from './EditDeletePrevBtnHandler';
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

export default function PastPreventatives(props) {
	const theme = useTheme();

	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [preventatives, setPreventatives] = useState(props.preventatives);
	const [pastPreventatives, setPastPreventatives] = useState(
		props.pastPreventatives
	);
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [isEditPrev, setIsEditPrev] = useState(false);
	const [isDeletePrev, setIsDeletePrev] = useState(false);
	const [rowData, setRowData] = useState('');
	const small = useMediaQuery(theme.breakpoints.down('sm'));

	let width = '70%';

	if (small) {
		width = '90%';
	}

	const columns = [
		{
			field: 'dueNext',
			headerName: 'Due Next',
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
			field: 'lastGiven',
			headerName: 'Last Given',
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
			field: 'type',
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
						// console.log(params.row);
						setOpenModal(true);
						setIsEditPrev(true);
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
						setIsDeletePrev(true);
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

	for (let i = 0; i < pastPreventatives.length; i++) {
		let date1 = moment(pastPreventatives[i].dueNext).format('MM/DD/YYYY');
		let date2 = moment(pastPreventatives[i].lastGiven).format('MM/DD/YYYY');
		rows[i] = {
			id: pastPreventatives[i].id,
			dueNext: date1,
			lastGiven: date2,
			name: pastPreventatives[i].name,
			type: pastPreventatives[i].type,
			notes: pastPreventatives[i].notes,
		};
	}

	const SetOpenModalToFalse = () => {
		setOpenModal(false);
		setIsEditPrev(false);
		setIsDeletePrev(false);
	};
	// console.log(sortedWeights);
	// console.log(pastPreventatives);
	console.log('unsorted preventatives');
	console.log(preventatives);
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
			{isEditPrev ? (
				<EditDeletePrevBtnHandler
					ReloadPet={props.ReloadPet}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					isEditPrev={isEditPrev}
					openModal={openModal}
					SetOpenModalToFalse={SetOpenModalToFalse}
					rowData={rowData}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}

			{isDeletePrev ? (
				<EditDeletePrevBtnHandler
					ReloadPet={props.ReloadPet}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					isDeletePrev={isDeletePrev}
					openModal={openModal}
					SetOpenModalToFalse={SetOpenModalToFalse}
					rowData={rowData}
					defaultViewHandler={props.defaultViewHandler}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}
		</div>
	);
}
