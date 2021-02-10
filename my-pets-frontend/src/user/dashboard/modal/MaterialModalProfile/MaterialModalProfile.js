import React, { useState } from 'react';
import './MaterialModalProfile.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import AddAppointmentForm from '../../../dashboard/AddPet/form/AddAppointmentForm/AddAppointmentForm';
import AddWeightForm from '../../../dashboard/AddPet/form/AddWeightForm/AddWeightForm';
import AddFoodForm from '../../../dashboard/AddPet/form/AddFoodForm/AddFoodForm';

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

export default function MaterialModalProfile(props) {
	const classes = useStyles();

	const [currentUser, setCurrentUser] = useState(props.currentUser);
	//hooks that are passed from parent components
	//used to display appropriate content
	const [open, setOpen] = useState(props.openModal);
	const [isAppointment, setIsAppointment] = useState(props.isAppointment);
	const [isWeight, setIsWeight] = useState(props.isWeight);
	const [isFood, setIsFood] = useState(props.isFood);
	const [user, setUser] = useState('ok');
	const [pet, setPet] = useState(props.pet);
	// const [paperStyle, setPaperStyle] = useState(props.style);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		props.SetOpenModalToFalse();
		setIsAppointment(false);
	};

	//used to display appropriate content
	let style = classes.AddForm;

	console.log(props);
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
						{isAppointment ? (
							<AddAppointmentForm
								handleClose={handleClose}
								currentUser={currentUser}
								pet={pet}
								forceUpdate={props.forceUpdate}
							/>
						) : null}
						{isWeight ? (
							<AddWeightForm
								handleClose={handleClose}
								currentUser={currentUser}
								pet={pet}
								forceUpdate={props.forceUpdate}
							/>
						) : null}
						{isFood ? (
							<AddFoodForm
								handleClose={handleClose}
								currentUser={currentUser}
								pet={pet}
								forceUpdate={props.forceUpdate}
							/>
						) : null}
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
