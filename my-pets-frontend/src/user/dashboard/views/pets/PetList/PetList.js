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

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: 280,
		width: 250,
		display: 'inline-block',
		margin: '1rem',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			transform: 'scale(1.05)',
		},
	},
	control: {
		padding: theme.spacing(2),
	},
}));

export default function PetList(props) {
	const theme = useTheme();
	const classes = useStyles();

	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pets, setPets] = useState(props.currentUser.pets);
	const [openModal, setOpenModal] = useState(false);
	const [deleteButtonPressed, setDeleteButtonPressed] = useState(false);
	const [pet, setPet] = useState('');

	console.log('dashboard');
	console.log(props.currentUser.pets);

	const SetOpenModalToFalse = () => {
		setOpenModal(false);
		props.forceUpdate();
		// console.log(props.currentUser.pets);
	};

	function deletePetHandler(petObj, currentUser) {
		// setPet(petObj);
		setPet(petObj);
		// console.log(petObj);
		// console.log(currentUser);
		setOpenModal(true);
		// console.log('delete called');
		setDeleteButtonPressed(true);
	}

	console.log('delete');
	console.log(deleteButtonPressed);
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
				<Grid item lg={12} xs={12}>
					{pets.map((pet) => (
						<Paper className={classes.paper} elevation={8}>
							<div className="pet-card">
								<h4>id: {pet.id}</h4>
								<h4>name: {pet.petName}</h4>
								<h4>type: {pet.petType}</h4>
								<h4>breed: {pet.breed}</h4>
								<h4>sex: {pet.sex}</h4>
								<h4>age: {pet.age}</h4>
							</div>

							<div className="card-options">
								<Button
									data-tip
									data-for="editTip"
									style={{ color: '#1B2737' }}
								>
									<EditIcon />
								</Button>

								<Button
									data-tip
									data-for="viewTip"
									style={{ color: '#FF4F00' }}
								>
									<VisibilityIcon />
								</Button>

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
						</Paper>
					))}
				</Grid>
				{openModal ? (
					<MaterialModal
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
