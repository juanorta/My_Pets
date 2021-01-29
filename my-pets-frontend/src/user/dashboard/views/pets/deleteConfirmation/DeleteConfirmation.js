import React, { useState, useEffect } from 'react';
import './DeleteConfirmation.css';
import Button from '@material-ui/core/Button';
import { deletePet } from '../../../../../util/APIUtils';
import Alert from 'react-s-alert';

//a confirmation display
//will delete selected pet if user clicks 'Yes'
export default function DeleteConfirmation(props) {
	// console.log('delete confirmation');
	// console.log(props);

	const deleteHandleClose = () => {
		props.handleClose();
	};

	function agreeClickHandler(id, petId) {
		deletePet(id, petId);
		props.handleClose();
		Alert.success('PET DELETED');

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
					style={{ backgroundColor: '#FF4F00' }}
					onClick={deleteHandleClose}
				>
					No
				</Button>
				<Button
					style={{ backgroundColor: '#1B2737' }}
					onClick={() => {
						agreeClickHandler(props.currentUser.id, props.pet.id);
					}}
				>
					Yes
				</Button>
			</div>
		</div>
	);
}
