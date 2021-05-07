import React, { useState } from 'react';
import './AddButton.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MaterialModal from '../../modal/MaterialModal';
import ReactTooltip from 'react-tooltip';

//button styles
const useStyles = makeStyles((theme) => ({
	root: {
		color: 'white',
		marginTop: '0rem',
		borderRadius: 50,
		height: '4rem',
		width: '4rem',
		boxShadow: theme.shadows[3],
	},

	AddIcon: {
		fontSize: '40px',
	},

	label: {
		textTransform: 'capitalize',
	},
}));

//responsible for showing button and triggering the opening of a modal when clicked
//passes data to MaterialModal
export default function AddButton(props) {
	const theme = useTheme();
	const classes = useStyles();

	const [openModal, setOpenModal] = useState(false);

	const AddButtonClickHandler = () => {
		setOpenModal(true);
		console.log('add button clicked');
	};

	const SetOpenModalToFalse = () => {
		setOpenModal(false);
		// props.forceUpdate();
	};
	// console.log(props.currentUser);
	// console.log('openModal =>' + openModal);
	return (
		<div className="add-button-main-container">
			<div className="add-button">
				<ReactTooltip id="addPet" place="bottom" effect="solid">
					Add Pet
				</ReactTooltip>
				<Button
					// variant="contained"
					data-tip
					data-for="addPet"
					className={classes.root}
					onClick={AddButtonClickHandler}
				>
					<AddIcon className={classes.AddIcon} />
				</Button>
				{openModal ? (
					<MaterialModal
						forceUpdate={props.forceUpdate}
						style={'classes.AddPetForm'}
						isAddPet={true}
						currentUser={props.currentUser}
						openModal={openModal}
						SetOpenModalToFalse={SetOpenModalToFalse}
					/>
				) : null}
			</div>
		</div>
	);
}
