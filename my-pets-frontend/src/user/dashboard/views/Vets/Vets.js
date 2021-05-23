import React, { useState, useEffect } from 'react';
import './Vets.css';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import { TextField, IconButton } from '@material-ui/core';
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
import { getAllVets } from '../../../../util/APIUtils';

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

export default function Vets(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [petPictures, setPetPictures] = useState(props.petPictures);
	const [hasVets, setHasVets] = useState(true);

	const [vets, setVets] = useState('');
	// console.log(vets);

	useEffect(() => {
		fetchVets();
	}, []);

	const SetOpenModalToFalse = () => {
		// setOpenModal(false);
		// setIsEditVet(false);
		// setIsDeleteVet(false);
	};

	const fetchVets = () => {
		getAllVets(currentUser.id)
			.then((response) => {
				// console.log('ALL VETS');
				// console.log(response);
				if (response.length < 1) {
					setHasVets(false);
				} else {
					setVets(response);
				}
				// setPreventatives(response);
				// sortPreventatives(response);
			})
			.catch((error) => {});
	};

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
			field: 'vetName',
			headerName: 'Vet Name',
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
	];

	const findPictureById = (id) => {
		console.log('hello');
		for (var i = 0; i < petPictures.length; i++) {
			if (petPictures[i].id == id) {
				if (petPictures[i].petImage == null) {
					return '';
				}
				//	console.log(petPictures[i].petImage.data);
				else return petPictures[i].petImage.data;
			} else {
				//console.log('nah');
			}
		}
	};

	let rows = [];

	for (let i = 0; i < vets.length; i++) {
		let picture = findPictureById(vets[i].petVetId);
		rows[i] = {
			id: vets[i].id,
			petName: vets[i].petName,
			vetName: vets[i].vetName,
			phoneNumber: vets[i].phoneNumber,
			location: vets[i].location,
			notes: vets[i].notes,
			data: picture,
		};
	}
	return (
		<div className="food-main-container vets" id="vets">
			<div className="title">
				<h1>Veterinarians</h1>
			</div>
			{hasVets === false ? (
				<div className="nopets">
					<h2>
						No veterinarians found. To add a veterinarian, press the
						eye icon on your pet's card to go to their profile and
						add a veterinarian.
					</h2>
				</div>
			) : (
				<div
					className="appointments-table"
					style={{
						height: 400,
						width: '90%',
						marginLeft: '1rem',
						// backgroundColor: 'red',
					}}
				>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={5}
						rowHeight={72}
					/>
				</div>
			)}

			<div className="spacer"> </div>
		</div>
	);
}
