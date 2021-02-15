import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MaterialModalEditAppt from '../../modal/MaterialModalEdit/MaterialModalEditAppt';
import DeleteApptConfirmation from '../../views/pets/deleteConfirmation/DeleteApptConfirmation';
import MaterialModal from '../../modal/MaterialModal';

export default function EditDeleteApptButtonHandler(props) {
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [openModal, setOpenModal] = useState(props.openModal);
	const [isEditAppt, setIsEditAppt] = useState(props.isEditAppt);
	const [isDeleteAppt, setIsDeleteAppt] = useState(props.isDeleteAppt);
	const [pet, setPet] = useState(props.pet);
	const [rowData, setRowData] = useState(props.editParams);
	// console.log(rowData);
	// console.log(pet);
	// console.log(currentUser);
	return (
		<div className="edit-appt-main-container">
			{/* opening a different modal depending on what button the user pressed */}
			{openModal && isEditAppt ? (
				<MaterialModalEditAppt
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					rowData={rowData}
					openModal={openModal}
					isEditAppt={isEditAppt}
					SetOpenModalToFalse={props.SetOpenModalToFalse}
				/>
			) : null}
			{openModal && isDeleteAppt ? (
				<MaterialModal
					openModal={openModal}
					rowData={rowData}
					isDeleteAppt={isDeleteAppt}
					currentUser={currentUser}
					pet={pet}
					forceUpdate={props.forceUpdate}
					SetOpenModalToFalse={props.SetOpenModalToFalse}
				/>
			) : null}
		</div>
	);
}
