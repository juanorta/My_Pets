import React, { useState } from 'react';
import './AddBtnPetProfile.css';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MaterialModal from '../../modal/MaterialModal';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MaterialModalProfile from '../../modal/MaterialModalProfile/MaterialModalProfile';

//button styles
const useStyles = makeStyles((theme) => ({
	root: {
		color: 'white',
		marginTop: '0rem',
		borderRadius: 38,
		height: '4rem',
		width: '4rem',
	},

	AddIcon: {
		fontSize: '40px',
	},

	MenuItem: {
		backgroundColor: 'white',
		'&:hover': {
			backgroundColor: '#FF4F00',
			color: 'white',
		},
	},
	label: {
		textTransform: 'capitalize',
	},
}));

//responsible for showing button and triggering the opening of a modal when clicked
//passes data to MaterialModal
export default function AddBtnPetProfile(props) {
	const theme = useTheme();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [isAppointment, setIsAppointment] = useState(false);
	const [isWeight, setIsWeight] = useState(false);
	const [isFood, setIsFood] = useState(false);
	const [pet, setPet] = useState(props.pet);

	const addButtonHandler = (event) => {
		setAnchorEl(event.currentTarget);
		console.log('profile add clicked');
	};

	//sets the modal and respective option flag to true.
	//these hooks will then get passed down to MaterialModalProfile
	//MaterialModalProfile will take in isWeight, isAppointment, or
	//isFood and will decide which form to show based off which one
	//is set to true

	const newAppointmentHandler = () => {
		setOpenModal(true);
		setIsAppointment(true);
		setIsWeight(false);
		setIsFood(false);
		setAnchorEl(null);
	};

	const newWeightHandler = () => {
		console.log('weight clicked');
		setOpenModal(true);
		setIsWeight(true);
		setIsAppointment(false);
		setIsFood(false);
		setAnchorEl(null);
	};

	const newFoodHandler = () => {
		setOpenModal(true);
		setIsFood(true);
		setIsAppointment(false);
		setIsWeight(false);
		setAnchorEl(null);
	};

	//sets all flags to false
	const SetOpenModalToFalse = () => {
		setOpenModal(false);
		setIsAppointment(false);
		setIsWeight(false);
		setIsFood(false);
		// props.forceUpdate();
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className="add-button-profile-main-container">
			<div className="add-button">
				<Button className={classes.root} onClick={addButtonHandler}>
					<AddIcon className={classes.AddIcon} />
				</Button>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem
						className={classes.MenuItem}
						onClick={newAppointmentHandler}
					>
						New Appointment
					</MenuItem>
					<MenuItem
						className={classes.MenuItem}
						onClick={newWeightHandler}
					>
						New Weight
					</MenuItem>
					<MenuItem
						className={classes.MenuItem}
						onClick={newFoodHandler}
					>
						New Food/Treat
					</MenuItem>
				</Menu>

				{/* depending on which option the user clicked, it will trigger which type of
					'is' flag is sent to the MaterialModalProfile
				*/}
				{openModal && isAppointment ? (
					<MaterialModalProfile
						currentUser={props.currentUser}
						openModal={openModal}
						SetOpenModalToFalse={SetOpenModalToFalse}
						isAppointment={isAppointment}
						pet={pet}
						forceUpdate={props.forceUpdate}
					/>
				) : null}

				{openModal && isWeight ? (
					<MaterialModalProfile
						currentUser={props.currentUser}
						openModal={openModal}
						SetOpenModalToFalse={SetOpenModalToFalse}
						isWeight={isWeight}
						pet={pet}
						forceUpdate={props.forceUpdate}
					/>
				) : null}

				{openModal && isFood ? (
					<MaterialModalProfile
						currentUser={props.currentUser}
						openModal={openModal}
						SetOpenModalToFalse={SetOpenModalToFalse}
						isFood={isFood}
						pet={pet}
						forceUpdate={props.forceUpdate}
					/>
				) : null}
			</div>
		</div>
	);
}
