import React, { useState } from 'react';
import MaterialModalEditAppt from '../../modal/MaterialModalEdit/MaterialModalEditAppt';
import MaterialModal from '../../modal/MaterialModal';

export default function EditDeleteMedicationHandler(props) {
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [openModal, setOpenModal] = useState(props.openModal);
	const [isEditVet, setIsEditVet] = useState(props.isEditVet);
	const [isDeleteVet, setIsDeleteVet] = useState(props.isDeleteVet);
	const [rowData, setRowData] = useState(props.rowData);
	console.log(props);
	return (
		<div>
			{openModal && isEditVet ? (
				<MaterialModalEditAppt
					ReloadPet={props.ReloadPet}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					rowData={rowData}
					openModal={openModal}
					isEditVet={isEditVet}
					SetOpenModalToFalse={props.SetOpenModalToFalse}
					defaultViewHandler={props.defaultViewHandler}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}

			{openModal && isDeleteVet ? (
				<MaterialModal
					ReloadPet={props.ReloadPet}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					rowData={rowData}
					openModal={openModal}
					isDeleteVet={isDeleteVet}
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
