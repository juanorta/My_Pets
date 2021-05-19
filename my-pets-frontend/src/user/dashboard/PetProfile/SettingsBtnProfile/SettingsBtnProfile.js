import React, { useState } from 'react';
import './SettingsBtnProfile.css';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MaterialModal from '../../modal/MaterialModal';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactTooltip from 'react-tooltip';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	root: {
		color: 'white',
		marginTop: '0rem',
		borderRadius: 38,
		height: '4rem',
		width: '4rem',
	},

	rootSmall: {
		color: 'white',
		marginTop: '0rem',
		borderRadius: 38,
		height: '2rem',
		width: '2rem',
	},

	AddIcon: {
		fontSize: '40px',

		// marginLeft: '-1rem',
	},

	AddIconSmall: {
		fontSize: '30px',
		marginLeft: '-2rem',
		color: '#1b2737',
	},

	MenuItem: {
		backgroundColor: 'white',
		'&:hover': {
			backgroundColor: '#FF4F00',
			color: 'white',
		},
	},
	label: {
		textTransform: 'capitalize',
	},
	EditIcon: {
		color: 'teal',
	},
	DeleteIcon: {
		color: 'red',
	},
}));

export default function SettingsBtnProfile(props) {
	const theme = useTheme();
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [editButtonPressed, setEditButtonPressed] = useState(false);
	const [deleteButtonPressed, setDeleteButtonPressed] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const small = useMediaQuery(theme.breakpoints.down('sm'));
	const extraSmall = useMediaQuery(theme.breakpoints.down('xs'));

	let root = classes.root;
	let AddIcon = classes.AddIcon;

	if (small) {
		root = classes.rootSmall;
		AddIcon = classes.AddIconSmall;
	}

	const SetOpenModalToFalse = () => {
		setOpenModal(false);
		setEditButtonPressed(false);
		setDeleteButtonPressed(false);
	};

	const settingsButtonHandler = (event) => {
		setAnchorEl(event.currentTarget);
		console.log(props);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEdit = () => {
		setOpenModal(true);
		setEditButtonPressed(true);
		setDeleteButtonPressed(false);
	};

	const handleDelete = () => {
		setOpenModal(true);
		setDeleteButtonPressed(true);
		setEditButtonPressed(false);
	};

	return (
		<div className="settings-main-container">
			{small ? null : (
				<ReactTooltip id="settingsButton" place="top" effect="solid">
					Settings
				</ReactTooltip>
			)}

			<Button
				data-tip
				data-for="settingsButton"
				className={root}
				onClick={settingsButtonHandler}
			>
				<SettingsIcon className={AddIcon} />
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem className={classes.MenuItem} onClick={handleEdit}>
					<EditIcon className={classes.EditIcon} />
					<span className="settings-option">Edit Pet</span>
				</MenuItem>
				<MenuItem className={classes.MenuItem} onClick={handleDelete}>
					<DeleteIcon className={classes.DeleteIcon} />{' '}
					<span className="settings-option">Delete Pet</span>
				</MenuItem>
			</Menu>

			{openModal && editButtonPressed ? (
				<MaterialModal
					ReloadPet={props.ReloadPet}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					SetOpenModalToFalse={SetOpenModalToFalse}
					openModal={openModal}
					editButtonPressed={editButtonPressed}
				/>
			) : null}
			{openModal && deleteButtonPressed ? (
				<MaterialModal
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					SetOpenModalToFalse={SetOpenModalToFalse}
					openModal={openModal}
					deleteButtonPressed={deleteButtonPressed}
				/>
			) : null}
		</div>
	);
}
