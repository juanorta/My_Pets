import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MaterialModalEditAppt from '../../modal/MaterialModalEdit/MaterialModalEditAppt';

const useStyles = makeStyles((theme) => ({
	root: {
		color: 'white',
		marginTop: '0rem',
		borderRadius: 38,
		height: '4rem',
		width: '4rem',
	},
	Button: {
		borderRadius: '69%',
		height: '3.4rem',
		width: '0rem',
		marginLeft: '-0.5rem',
		// backgroundColor: 'red',
	},

	EditIcon: {
		color: '#1b2737',
	},

	label: {
		textTransform: 'capitalize',
	},
}));

export default function EditButton(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [openModal, setOpenModal] = useState(props.openModal);
	const [isEditAppt, setIsEditAppt] = useState(props.isEditAppt);
	const [pet, setPet] = useState(props.pet);
	const [rowData, setRowData] = useState(props.editParams);
	console.log(rowData);
	console.log(pet);
	console.log(currentUser);
	return (
		<div className="edit-appt-main-container">
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
			{/* <Button className={classes.Button}>
				<EditIcon className={classes.EditIcon} />
			</Button> */}
		</div>
	);
}
