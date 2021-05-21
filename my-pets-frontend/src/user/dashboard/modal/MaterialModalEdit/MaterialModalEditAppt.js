import React, { useState } from 'react';
import '../MaterialModalProfile/MaterialModalProfile.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import AddAppointmentForm from '../../../dashboard/AddPet/form/AddAppointmentForm/AddAppointmentForm';
import EditAppointmentForm from '../../AddPet/form/EditAppointmentForm';
import EditFoodForm from '../../AddPet/form/EditFoodForm';
import EditWeightForm from '../../AddPet/form/EditWeightForm';
import EditPreventativeForm from '../../AddPet/form/EditPreventativeForm';
import EditMedicationForm from '../../AddPet/form/EditMedicationForm';
import EditVetForm from '../../AddPet/form/EditVetForm';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		// border: 'none',
	},
	AddForm: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid none',
		outline: 'none',
		borderRadius: '20px',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		height: '35rem',
		width: '55rem',
	},
	AddFormSmall: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid none',
		outline: 'none',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		height: '100%',
		width: '100%',
		zIndex: '6000',
	},
	EditFood: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid none',
		outline: 'none',
		borderRadius: '20px',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		height: '37rem',
		width: '55rem',
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
}));

//will open different forms depending on props received
export default function MaterialModalProfile(props) {
	const theme = useTheme();

	const classes = useStyles();

	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [sortedWeights, setSortedWeights] = useState(props.sortedWeights);
	const [rowData, setRowData] = useState(props.rowData);
	//hooks that are passed from parent components
	//used to display appropriate content
	const [open, setOpen] = useState(props.openModal);

	//will display certain content whether a hook is true or false
	const [isEditAppt, setIsEditAppt] = useState(props.isEditAppt);
	const [isEditFood, setIsEditFood] = useState(props.isEditFood);
	const [isEditWeight, setIsEditWeight] = useState(props.isEditWeight);
	const [isEditPrev, setIsEditPrev] = useState(props.isEditPrev);
	const [isEditMedication, setIsEditMedication] = useState(
		props.isEditMedication
	);
	const [isEditVet, setIsEditVet] = useState(props.isEditVet);
	const [user, setUser] = useState('ok');
	const [fromDash, setFromDash] = useState(props.fromDash);
	const small = useMediaQuery(theme.breakpoints.down('sm'));

	// const [paperStyle, setPaperStyle] = useState(props.style);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		props.SetOpenModalToFalse();
	};

	//used to display appropriate content
	let style = classes.AddForm;
	if (isEditFood) {
		style = classes.EditFood;
	}

	if (small) {
		style = classes.AddFormSmall;
	}

	console.log('edit vet' + isEditVet);

	// console.log(props.changeDefaultViewsAndRefresh);
	// console.log('open => ' + open);

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
				}}
			>
				<Fade in={open}>
					<div className={style}>
						{isEditAppt ? (
							<EditAppointmentForm
								ReloadAppointment={props.ReloadAppointment}
								appointments={props.appointments}
								ReloadPet={props.ReloadPet}
								forceUpdate={props.forceUpdate}
								currentUser={currentUser}
								pet={pet}
								rowData={rowData}
								handleClose={handleClose}
								defaultViewHandler={props.defaultViewHandler}
								changeDefaultViewsAndRefresh={
									props.changeDefaultViewsAndRefresh
								}
							/>
						) : null}
						{isEditFood ? (
							<EditFoodForm
								ReloadPet={props.ReloadPet}
								forceUpdate={props.forceUpdate}
								currentUser={currentUser}
								pet={pet}
								rowData={rowData}
								handleClose={handleClose}
								defaultViewHandler={props.defaultViewHandler}
								changeDefaultViewsAndRefresh={
									props.changeDefaultViewsAndRefresh
								}
							/>
						) : null}
						{isEditWeight ? (
							<EditWeightForm
								ReloadPet={props.ReloadPet}
								forceUpdate={props.forceUpdate}
								currentUser={currentUser}
								pet={pet}
								rowData={rowData}
								handleClose={handleClose}
								sortedWeights={sortedWeights}
								changeDefaultViewsAndRefresh={
									props.changeDefaultViewsAndRefresh
								}
							/>
						) : null}
						{isEditPrev ? (
							<EditPreventativeForm
								ReloadPet={props.ReloadPet}
								forceUpdate={props.forceUpdate}
								currentUser={currentUser}
								pet={pet}
								rowData={rowData}
								handleClose={handleClose}
								changeDefaultViewsAndRefresh={
									props.changeDefaultViewsAndRefresh
								}
								fromDash={fromDash}
							/>
						) : null}
						{isEditMedication ? (
							<EditMedicationForm
								ReloadPet={props.ReloadPet}
								forceUpdate={props.forceUpdate}
								currentUser={currentUser}
								pet={pet}
								rowData={rowData}
								handleClose={handleClose}
								changeDefaultViewsAndRefresh={
									props.changeDefaultViewsAndRefresh
								}
							/>
						) : null}
						{isEditVet ? (
							<EditVetForm
								ReloadPet={props.ReloadPet}
								forceUpdate={props.forceUpdate}
								currentUser={currentUser}
								pet={pet}
								rowData={rowData}
								handleClose={handleClose}
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
