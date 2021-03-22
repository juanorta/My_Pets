import React, { useState, useEffect } from 'react';
import MaterialModal from '../../modal/MaterialModal';
import MaterialModalEditAppt from '../../modal/MaterialModalEdit/MaterialModalEditAppt';

export default function EditDeletePrevBtnHandler(props) {
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [openModal, setOpenModal] = useState(props.openModal);
	const [isEditPrev, setIsEditPrev] = useState(props.isEditPrev);
	const [isDeletePrev, setIsDeletePrev] = useState(props.isDeletePrev);
	const [rowData, setRowData] = useState(props.rowData);
	console.log(props);
	return (
		<div>
			{openModal && isEditPrev ? (
				<MaterialModalEditAppt
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					rowData={rowData}
					openModal={openModal}
					isEditPrev={isEditPrev}
					SetOpenModalToFalse={props.SetOpenModalToFalse}
					defaultViewHandler={props.defaultViewHandler}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}

			{openModal && isDeletePrev ? (
				<MaterialModal
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					rowData={rowData}
					openModal={openModal}
					isDeletePrev={isDeletePrev}
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
