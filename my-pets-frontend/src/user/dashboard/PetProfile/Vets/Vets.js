import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import EditDeleteVetHandler from './EditDeleteVetHandler';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { getVetsByPet } from '../../../../util/APIUtils';

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

export default function Vets(props) {
	const theme = useTheme();

	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [vets, setVets] = useState('');
	const [isEditVet, setIsEditVet] = useState(false);
	const [isDeleteVet, setIsDeleteVet] = useState(false);
	const [rowData, setRowData] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const small = useMediaQuery(theme.breakpoints.down('sm'));
	const [loading, setLoading] = useState(true);
	const [value, setValue] = useState(0);

	useEffect(() => {
		fetchVets();
	}, [value]);

	const fetchVets = () => {
		getVetsByPet(currentUser.id, pet.id)
			.then((response) => {
				setVets(response);
				setLoading(false);
			})
			.catch((error) => {});
	};

	const ReloadComponent = () => {
		setValue(value + 1);
		setLoading(true);
	};

	let width = '70%';

	if (small) {
		width = '90%';
	}

	const SetOpenModalToFalse = () => {
		setOpenModal(false);
		setIsEditVet(false);
		setIsDeleteVet(false);
	};

	const columns = [
		{
			field: 'vetName',
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
			field: 'phoneNumber',
			headerName: 'Phone Number',
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
			field: 'location',
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
			field: 'Edit',
			headerName: 'Edit',
			width: 77,
			renderCell: (params) => (
				<Button
					onClick={() => {
						setOpenModal(true);
						setIsEditVet(true);
						setRowData(params.row);
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
						setIsDeleteVet(true);
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

	for (let i = 0; i < vets.length; i++) {
		rows[i] = {
			id: vets[i].id,

			vetName: vets[i].vetName,
			phoneNumber: vets[i].phoneNumber,
			location: vets[i].location,
			notes: vets[i].notes,
		};
	}
	return (
		<div className="appointments-profile-main-container">
			<div className="appointments-title">
				<h1>Veterinarians</h1>
			</div>
			<div
				style={{
					height: 400,
					width: width,
					margin: '0 auto',
					// backgroundColor: 'red',
				}}
			>
				{loading ? (
					<h2 className="loading">Loading vets...</h2>
				) : (
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={5}
						rowHeight={72}
					/>
				)}
			</div>
			{isEditVet ? (
				<EditDeleteVetHandler
					ReloadComponent={ReloadComponent}
					ReloadPet={props.ReloadPet}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					isEditVet={isEditVet}
					openModal={openModal}
					SetOpenModalToFalse={SetOpenModalToFalse}
					rowData={rowData}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}
			{isDeleteVet ? (
				<EditDeleteVetHandler
					ReloadComponent={ReloadComponent}
					ReloadPet={props.ReloadPet}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					isDeleteVet={isDeleteVet}
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
