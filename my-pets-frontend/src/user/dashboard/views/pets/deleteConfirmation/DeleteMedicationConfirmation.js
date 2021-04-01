import React, { useState, useEffect } from 'react';
import './DeleteConfirmation.css';
import Button from '@material-ui/core/Button';
import Alert from 'react-s-alert';
import { deleteMedication } from '../../../../../util/APIUtils';

//a confirmation display
//will delete selected appointment if user clicks 'Yes'
export default function DeleteMedicationConfirmation(props) {
	// console.log('delete confirmation');
	// console.log(props);
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [rowData, setRowData] = useState(props.rowData);

	const deleteHandleClose = () => {
		props.handleClose();
	};

	function agreeClickHandler(id, petId, medId) {
		deleteMedication(id, petId, medId);
		props.handleClose();
		Alert.success('Medication DELETED');
		setTimeout(() => {
			Alert.closeAll();

			props.changeDefaultViewsAndRefresh('MEDICATIONS');

			props.forceUpdate();
		}, 500);
	}

	const close = () => {
		props.handleClose();
	};

	console.log(currentUser);
	console.log(pet);
	console.log(rowData);

	return (
		<div className="delete-confirmation-main-container">
			<h1 className="delete-modal-title">
				Are you sure you want to delete {rowData.name} from your pet's
				food list?
			</h1>
			<div className="delete-button-group">
				<Button
					variant="contained"
					style={{ backgroundColor: '#FF4F00' }}
					onClick={deleteHandleClose}
				>
					No
				</Button>
				<Button
					variant="contained"
					style={{ backgroundColor: '#1B2737' }}
					onClick={() => {
						agreeClickHandler(currentUser.id, pet.id, rowData.id);
					}}
				>
					Yes
				</Button>
			</div>
		</div>
	);
}