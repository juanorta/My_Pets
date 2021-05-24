import React, { useState, useEffect } from 'react';
import './DeleteConfirmation.css';
import Button from '@material-ui/core/Button';
import { deletePet } from '../../../../../util/APIUtils';
import Alert from 'react-s-alert';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//a confirmation display
//will delete selected pet if user clicks 'Yes'
export default function DeleteConfirmation(props) {
	const theme = useTheme();

	const [deleted, setDeleted] = useState(false);
	const small = useMediaQuery(theme.breakpoints.down('sm'));

	const deleteHandleClose = () => {
		props.handleClose();
	};

	function agreeClickHandler(id, petId) {
		Alert.success('PET DELETED');
		deletePet(id, petId);
		props.handleClose();

		// history.pushState('/');
		// Alert.closeAll();
		setDeleted(true);
		// return <Redirect to="/" />;
		setTimeout(() => {
			Alert.closeAll();
			props.forceUpdate();
		}, 500);
	}

	const close = () => {
		props.handleClose();
	};

	return (
		<div className="delete-confirmation-main-container">
			<h1 className="delete-modal-title">
				Are you sure you want to delete {props.pet.petName} from your
				list?
			</h1>
			<div className="delete-button-group">
				<Button
					variant="contained"
					style={{ backgroundColor: '#FF4F00' }}
					onClick={deleteHandleClose}
				>
					No
				</Button>

				<NavLink to="/" className="navlink">
					<Button
						variant="contained"
						style={{ backgroundColor: '#1B2737' }}
						onClick={() => {
							agreeClickHandler(
								props.currentUser.id,
								props.pet.id
							);
						}}
					>
						Yes
					</Button>
				</NavLink>
			</div>
			{/* {deleted ? <Redirect to="/" /> : null} */}
		</div>
	);
}
