import React, { useState } from 'react';
import './SettingsBtnProfile.css';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MaterialModal from '../../modal/MaterialModal';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
	root: {
		color: 'white',
		marginTop: '0rem',
		borderRadius: 38,
		height: '4rem',
		width: '4rem',
	},

	AddIcon: {
		fontSize: '40px',
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
}));

export default function SettingsBtnProfile(props) {
	const theme = useTheme();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const settingsButtonHandler = (event) => {
		setAnchorEl(event.currentTarget);
		console.log('profile add clicked');
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className="settings-main-container">
			<Button className={classes.root} onClick={settingsButtonHandler}>
				<SettingsIcon className={classes.AddIcon} />
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem className={classes.MenuItem} onClick={handleClose}>
					Edit
				</MenuItem>
				<MenuItem className={classes.MenuItem} onClick={handleClose}>
					Delete
				</MenuItem>
			</Menu>
		</div>
	);
}
