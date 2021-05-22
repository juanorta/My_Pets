import React, { useState, useEffect } from 'react';
import './PetList.css';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {
	DataGrid,
	ColDef,
	ValueGetterParams,
	CellParams,
	GridApi,
} from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import DeleteConfirmation from '../deleteConfirmation/DeleteConfirmation';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactTooltip from 'react-tooltip';
import MaterialModal from '../../../modal/MaterialModal';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import PetProfile from '../../../PetProfile/PetProfile';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		// backgroundColor: 'red',
	},
	paper: {
		height: 320,
		width: 270,
		display: 'inline-block',
		margin: '1rem',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			transform: 'scale(1.05)',
		},
		borderRadius: 6,
	},
	paperSmall: {
		height: 360,
		// width: '90%',
		width: 340,
		display: 'inline-block',
		margin: '1rem',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			transform: 'scale(1.0)',
		},
		borderRadius: '1%',
		// backgroundColor: 'red',
		// justifyContent: 'center',
	},
	control: {
		padding: theme.spacing(2),
	},
}));

//displays list of pets as cards
//each card has 3 options: edit pet, view profile, delete pet
//each option will display a unique modal for further action when clicked
export default function PetList(props) {
	const theme = useTheme();
	const classes = useStyles();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	//getting the current user and list of pets from Pets component
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pets, setPets] = useState(props.pets);

	//hook used to close modal
	const [openModal, setOpenModal] = useState(false);

	const [openEditModal, setEditOpenModal] = useState(false);

	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	//hook that is later sent to MaterialModal to load the correct modal for pet deletion
	const [deleteButtonPressed, setDeleteButtonPressed] = useState(false);

	const [editButtonPressed, setEditButtonPressed] = useState(false);

	//hook used to store a single pet
	const [pet, setPet] = useState('');

	// console.log('dashboard');
	// console.log(props.currentUser.pets);

	//function that is later passed to MaterialModal so that setOpenModal can be reset after each use
	const SetOpenModalToFalse = () => {
		setOpenModal(false);
		setEditOpenModal(false);
		setOpenDeleteModal(false);
		// props.forceUpdate();
		// console.log(props.currentUser.pets);
	};

	//used to send the correct pet information to MaterialModal
	function deletePetHandler(petObj, currentUser) {
		setPet(petObj);
		setOpenModal(true);
		setOpenDeleteModal(true);
		setEditOpenModal(false);
		setDeleteButtonPressed(true);
	}

	function editPetHandler(petObj, currentUser) {
		console.log('edit pressed');
		console.log(petObj);
		setPet(petObj);
		setOpenModal(true);
		setEditOpenModal(true);
		setEditButtonPressed(true);
		setOpenDeleteModal(false);
	}

	function viewProfileHandler(petObj, currentUser) {
		console.log('view profile pressed');
		console.log(petObj);
		// <PetProfile />;
	}

	// console.log('delete');
	// console.log(deleteButtonPressed);
	// console.log(pets);
	// const data = pets[0].petImage.data;
	return (
		<div className="pet-table-main-container">
			<Grid
				container
				justify="center"
				className={classes.root}
				spacing={2}
			>
				{/* <ul className="pet-list"> */}
				<ReactTooltip id="editTip" place="top" effect="solid">
					Edit pet information
				</ReactTooltip>
				<ReactTooltip id="viewTip" place="top" effect="solid">
					View profile
				</ReactTooltip>
				<ReactTooltip id="deleteTip" place="top" effect="solid">
					Delete pet
				</ReactTooltip>
				<Grid item lg={12} xs={12} sm={12}>
					{pets.map((pet) => (
						<Paper
							className={
								matches ? classes.paperSmall : classes.paper
							}
							elevation={5}
						>
							<div className="pet-card">
								{pet.petImage == null ? (
									<div className="no-picture"></div>
								) : (
									<img
										className="image"
										src={`data:image/jpeg;base64,${pet.petImage.data}`}
									/>
								)}

								{/* <h4>id: {pet.id}</h4>
								<h4>name: {pet.petName}</h4>
								<h4>type: {pet.petType}</h4>
								<h4>breed: {pet.breed}</h4>
								<h4>sex: {pet.sex}</h4>
								<h4>age: {pet.age}</h4> */}
							</div>

							<div className="card-options">
								<h4>{pet.petName}</h4>
								<div className="buttons">
									<Button
										data-tip
										data-for="editTip"
										style={{ color: '#1b2737' }}
										onClick={() => {
											editPetHandler(pet, currentUser);
										}}
									>
										<EditIcon />
									</Button>

									<NavLink
										to={`/petprofile/${pet.id}/${pet.petName}`}
										// to={{
										// 	pathname: `/petprofile/${pet.id}/${pet.petName}`,
										// 	currentUser: currentUser,
										// }}
									>
										<Button
											data-tip
											data-for="viewTip"
											style={{ color: '#FF4F00' }}
											className="view-profile-button"
										>
											<VisibilityIcon />
										</Button>
									</NavLink>

									<Button
										data-tip
										data-for="deleteTip"
										style={{ color: 'red' }}
										onClick={() => {
											deletePetHandler(pet, currentUser);
										}}
									>
										<DeleteIcon />
									</Button>
								</div>
							</div>
						</Paper>
					))}
				</Grid>

				{openEditModal && editButtonPressed ? (
					<MaterialModal
						forceUpdate={props.forceUpdate}
						currentUser={currentUser}
						pet={pet}
						SetOpenModalToFalse={SetOpenModalToFalse}
						openModal={openModal}
						openEditModal={openEditModal}
						editButtonPressed={editButtonPressed}
					/>
				) : null}

				{openDeleteModal && deleteButtonPressed ? (
					<MaterialModal
						forceUpdate={props.forceUpdate}
						currentUser={currentUser}
						pet={pet}
						SetOpenModalToFalse={SetOpenModalToFalse}
						openModal={openModal}
						deleteButtonPressed={deleteButtonPressed}
					/>
				) : null}

				{/* </ul> */}
			</Grid>
		</div>
	);
}
