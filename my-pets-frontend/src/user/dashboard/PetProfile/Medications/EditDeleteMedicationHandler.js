import React, { useState } from 'react';
import MaterialModalEditAppt from '../../modal/MaterialModalEdit/MaterialModalEditAppt';
import MaterialModal from '../../modal/MaterialModal';

export default function EditDeleteMedicationHandler(props) {
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [openModal, setOpenModal] = useState(props.openModal);
	const [isEditMedication, setIsEditMedication] = useState(
		props.isEditMedication
	);
	const [isDeleteMedication, setIsDeleteMedication] = useState(
		props.isDeleteMedication
	);
	const [rowData, setRowData] = useState(props.rowData);

	return (
		<div>
			{openModal && isEditMedication ? (
				<MaterialModalEditAppt
					ReloadComponent={props.ReloadComponent}
					ReloadPet={props.ReloadPet}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					rowData={rowData}
					openModal={openModal}
					isEditMedication={isEditMedication}
					SetOpenModalToFalse={props.SetOpenModalToFalse}
					defaultViewHandler={props.defaultViewHandler}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}

			{openModal && isDeleteMedication ? (
				<MaterialModal
					ReloadComponent={props.ReloadComponent}
					ReloadPet={props.ReloadPet}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					rowData={rowData}
					openModal={openModal}
					isDeleteMedication={isDeleteMedication}
					SetOpenModalToFalse={props.SetOpenModalToFalse}
					defaultViewHandler={props.defaultViewHandler}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}
		</div>
	);
}
