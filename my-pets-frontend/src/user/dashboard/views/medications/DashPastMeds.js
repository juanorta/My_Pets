import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { IconButton, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import Icon from '@mdi/react';
import {
	mdiAccount,
	mdiDog,
	mdiFoodDrumstick,
	mdiScaleBathroom,
} from '@mdi/js';

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

export default function DashCurrentMeds(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [medications, setMedications] = useState(props.medications);
	const [pastMedications, setPastMedications] = useState(
		props.pastMedications
	);

	const columns = [
		{
			field: 'petName',
			headerName: 'Pet',
			width: 160,
			renderCell: (params) => (
				<div style={{ backgroundColor: 'transparent' }}>
					{params.row.data == '' ? (
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
								src={`data:image/jpeg;base64,${params.row.data}`}
							/>
						</IconButton>
					)}
					<TextField
						className={classes.TextFieldPet}
						// style={{ color: 'black' }}
						InputProps={{ disableUnderline: true }}
						multiline
						disabled={true}
						value={params.value}
					/>
				</div>
			),
		},
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
	];

	let rows = [];

	for (let i = 0; i < pastMedications.length; i++) {
		let date1 = moment(pastMedications[i].endDate).format('MM/DD/YYYY');
		let date2 = moment(pastMedications[i].startDate).format('MM/DD/YYYY');
		rows[i] = {
			id: pastMedications[i].id,
			endDate: date1,
			startDate: date2,
			name: pastMedications[i].medicationName,
			dosageInstructions: pastMedications[i].dosageInstructions,
			petName: pastMedications[i].petName,
			data: pastMedications[i].data,
		};
	}

	const SetOpenModalToFalse = () => {
		// setOpenModal(false);
		// setIsEditPrev(false);
		// setIsDeletePrev(false);
	};

	// console.log(upcomingPreventatives);
	// console.log(sortedWeights);
	// console.log('upcoming');
	// console.log(upcomingPreventatives);
	return (
		<div
			className="appointments-table"
			style={{
				height: 400,
				width: '90%',
				marginLeft: '1rem',
				// margin: '0 auto',
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
						field: 'name',
						sort: 'asc',
					},
				]}
			/>
		</div>
	);
}
