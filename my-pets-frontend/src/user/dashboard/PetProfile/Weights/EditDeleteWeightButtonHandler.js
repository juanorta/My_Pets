import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MaterialModalEditAppt from '../../modal/MaterialModalEdit/MaterialModalEditAppt';
import MaterialModal from '../../modal/MaterialModal';

export default function EditDeleteWeightButtonHandler(props) {
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [openModal, setOpenModal] = useState(props.openModal);
	const [isEditWeight, setIsEditWeight] = useState(props.isEditWeight);
	const [isDeleteWeight, setIsDeleteWeight] = useState(props.isDeleteWeight);
	const [pet, setPet] = useState(props.pet);
	const [rowData, setRowData] = useState(props.rowData);
	const [sortedWeights, setSortedWeights] = useState(props.sortedWeights);

	// console.log(rowData);
	// console.log(pet);
	// console.log(currentUser);
	// console.log(sortedWeights);
	console.log(props.changeDefaultViewsAndRefresh);
	return (
		<div className="edit-appt-main-container">
			{/* opening a different modal depending on what button the user pressed */}
			{openModal && isEditWeight ? (
				<MaterialModalEditAppt
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					rowData={rowData}
					openModal={openModal}
					isEditWeight={isEditWeight}
					SetOpenModalToFalse={props.SetOpenModalToFalse}
					sortedWeights={sortedWeights}
					defaultViewHandler={props.defaultViewHandler}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}
			{openModal && isDeleteWeight ? (
				<MaterialModal
					openModal={openModal}
					rowData={rowData}
					isDeleteWeight={isDeleteWeight}
					currentUser={currentUser}
					pet={pet}
					forceUpdate={props.forceUpdate}
					SetOpenModalToFalse={props.SetOpenModalToFalse}
					sortedWeights={sortedWeights}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}
		</div>
	);
}
