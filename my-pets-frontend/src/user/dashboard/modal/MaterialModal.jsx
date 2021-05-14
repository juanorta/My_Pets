import React, { useState } from 'react';
import './MaterialModal.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import AddPetForm from '../AddPet/form/AddPetForm';
import DeleteConfirmation from '../views/pets/deleteConfirmation/DeleteConfirmation';
import EditPet from '../views/pets/EditPet/EditPet';
import DeleteApptConfirmation from '../views/pets/deleteConfirmation/DeleteApptConfirmation';
import DeleteFoodConfirmation from '../views/pets/deleteConfirmation/DeleteFoodConfirmation';
import DeleteWeightConfirmation from '../views/pets/deleteConfirmation/DeleteWeightConfirmation';
import DeletePrevConfirmation from '../views/pets/deleteConfirmation/DeletePrevConfirmation';
import DeleteMedicationConfirmation from '../views/pets/deleteConfirmation/DeleteMedicationConfirmation';
import DeleteVetConfirmation from '../views/pets/deleteConfirmation/DeleteVetConfirmation';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

		// border: 'none',
	},
	backDrop: {
		background: 'rgba(255,255,255,0.2)',
	},
	AddPetForm: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid none',
		outline: 'none',
		borderRadius: '20px',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		height: '35rem',
		width: '55rem',
	},
	AddPetFormSmall: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid none',
		outline: 'none',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		height: '100%',
		width: '100%',
		zIndex: '6000',
	},
	DeleteConfirmation: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid none',
		outline: 'none',
		borderRadius: '20px',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		height: '15rem',
		width: '35rem',
	},
	DeleteConfirmationSmall: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid none',
		outline: 'none',
		borderRadius: '20px',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		height: '14rem',
		width: '19rem',
	},
}));

//reusable modal used to display AddPetForm, DeleteConfirmation, and EditPetForm

//receives data from AddButton
//modal is customized and uses 'AddPetForm' style when isAddPet prop is true
//isAddPet is true when AddButton is clicked

//also receives data from PetList
//modal is customized and uses 'DeleteConfirmation' style when deleteButtonPressed is true
//deleteButtonPressed is true when the 'delete' button on the pet card is pressed

//will display appropriate form/view depending on option clicked
export default function MaterialModal(props) {
	const theme = useTheme();
	const classes = useStyles();

	//hooks that are passed from parent components
	//used to display appropriate content
	const [open, setOpen] = useState(props.openModal);
	const [isAddPet, setIsAddPet] = useState(props.isAddPet);
	const [isDeletePetConfirmation, setDeletePetConfirmation] = useState(
		props.deleteButtonPressed
	);
	const [isEditPet, setIsEditPet] = useState(props.editButtonPressed);
	const [isDeleteAppt, setIsDeleteAppt] = useState(props.isDeleteAppt);
	const [isDeleteFood, setIsDeleteFood] = useState(props.isDeleteFood);
	const [isDeleteWeight, setIsDeleteWeight] = useState(props.isDeleteWeight);
	const [sortedWeights, setSortedWeights] = useState(props.sortedWeights);
	const [isDeletePrev, setIsDeletePrev] = useState(props.isDeletePrev);
	const [isDeleteMedication, setIsDeleteMedication] = useState(
		props.isDeleteMedication
	);
	const [isDeleteVet, setIsDeleteVet] = useState(props.isDeleteVet);
	const small = useMediaQuery(theme.breakpoints.down('sm'));
	// const [paperStyle, setPaperStyle] = useState(props.style);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setIsAddPet(false);
		props.SetOpenModalToFalse();
		setDeletePetConfirmation(false);
		setIsEditPet(false);
		// setPaperStyle('');
	};

	//used to display appropriate content
	let style = '';

	if (isAddPet || isEditPet === true) {
		style = classes.AddPetForm;
		if (small) {
			style = classes.AddPetFormSmall;
		}
	} else if (
		isDeletePetConfirmation === true ||
		isDeleteAppt === true ||
		isDeleteFood === true ||
		isDeleteWeight === true ||
		isDeletePrev ||
		isDeleteMedication ||
		isDeleteVet
	) {
		style = classes.DeleteConfirmation;

		if (small) {
			style = classes.DeleteConfirmationSmall;
		}
	}

	// console.log(props);
	// console.log('open => ' + open);
	// console.log(props.changeDefaultViewsAndRefresh);

	return (
		<div className="add-pet-modal-main-container">
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
					// classes: {
					// 	root: classes.backDrop,
					// },
				}}
			>
				<Fade in={open}>
					<div className={style}>
						{isAddPet ? (
							<AddPetForm
								forceUpdate={props.forceUpdate}
								handleClose={handleClose}
								currentUser={props.currentUser}
								handleClose={handleClose}
							/>
						) : null}

						{isEditPet ? (
							<EditPet
								forceUpdate={props.forceUpdate}
								currentUser={props.currentUser}
								handleClose={handleClose}
								pet={props.pet}
							/>
						) : null}

						{isDeletePetConfirmation ? (
							<DeleteConfirmation
								forceUpdate={props.forceUpdate}
								handleClose={handleClose}
								currentUser={props.currentUser}
								pet={props.pet}
							/>
						) : null}
						{isDeleteAppt ? (
							<DeleteApptConfirmation
								forceUpdate={props.forceUpdate}
								handleClose={handleClose}
								currentUser={props.currentUser}
								pet={props.pet}
								rowData={props.rowData}
								changeDefaultViewsAndRefresh={
									props.changeDefaultViewsAndRefresh
								}
							/>
						) : null}
						{isDeleteFood ? (
							<DeleteFoodConfirmation
								forceUpdate={props.forceUpdate}
								handleClose={handleClose}
								currentUser={props.currentUser}
								pet={props.pet}
								rowData={props.rowData}
								changeDefaultViewsAndRefresh={
									props.changeDefaultViewsAndRefresh
								}
							/>
						) : null}
						{isDeleteWeight ? (
							<DeleteWeightConfirmation
								forceUpdate={props.forceUpdate}
								handleClose={handleClose}
								currentUser={props.currentUser}
								pet={props.pet}
								rowData={props.rowData}
								sortedWeights={sortedWeights}
								changeDefaultViewsAndRefresh={
									props.changeDefaultViewsAndRefresh
								}
							/>
						) : null}
						{isDeletePrev ? (
							<DeletePrevConfirmation
								forceUpdate={props.forceUpdate}
								handleClose={handleClose}
								currentUser={props.currentUser}
								pet={props.pet}
								rowData={props.rowData}
								sortedWeights={sortedWeights}
								changeDefaultViewsAndRefresh={
									props.changeDefaultViewsAndRefresh
								}
							/>
						) : null}
						{isDeleteMedication ? (
							<DeleteMedicationConfirmation
								forceUpdate={props.forceUpdate}
								handleClose={handleClose}
								currentUser={props.currentUser}
								pet={props.pet}
								rowData={props.rowData}
								sortedWeights={sortedWeights}
								changeDefaultViewsAndRefresh={
									props.changeDefaultViewsAndRefresh
								}
							/>
						) : null}
						{isDeleteVet ? (
							<DeleteVetConfirmation
								forceUpdate={props.forceUpdate}
								handleClose={handleClose}
								currentUser={props.currentUser}
								pet={props.pet}
								rowData={props.rowData}
								sortedWeights={sortedWeights}
								changeDefaultViewsAndRefresh={
									props.changeDefaultViewsAndRefresh
								}
							/>
						) : null}
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
