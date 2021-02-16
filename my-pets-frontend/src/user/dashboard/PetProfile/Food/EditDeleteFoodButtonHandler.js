import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MaterialModalEditAppt from '../../modal/MaterialModalEdit/MaterialModalEditAppt';
import MaterialModal from '../../modal/MaterialModal';

export default function EditDeleteApptButtonHandler(props) {
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [openModal, setOpenModal] = useState(props.openModal);
	const [isEditFood, setIsEditFood] = useState(props.isEditFood);
	const [isDeleteFood, setIsDeleteFood] = useState(props.isDeleteFood);
	const [pet, setPet] = useState(props.pet);
	const [rowData, setRowData] = useState(props.rowData);
	console.log(rowData);
	console.log(pet);
	console.log(currentUser);
	return (
		<div className="edit-appt-main-container">
			{/* opening a different modal depending on what button the user pressed */}
			{openModal && isEditFood ? (
				<MaterialModalEditAppt
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					rowData={rowData}
					openModal={openModal}
					isEditFood={isEditFood}
					SetOpenModalToFalse={props.SetOpenModalToFalse}
				/>
			) : null}
			{openModal && isDeleteFood ? (
				<MaterialModal
					openModal={openModal}
					rowData={rowData}
					isDeleteFood={isDeleteFood}
					currentUser={currentUser}
					pet={pet}
					forceUpdate={props.forceUpdate}
					SetOpenModalToFalse={props.SetOpenModalToFalse}
				/>
			) : null}
		</div>
	);
}
