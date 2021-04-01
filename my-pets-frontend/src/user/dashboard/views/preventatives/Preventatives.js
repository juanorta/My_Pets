import React, { Component, useState, useEffect } from 'react';
import './preventatives.css';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import { getAllAppointments } from '../../../../util/APIUtils';
import { IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import {
	mdiAccount,
	mdiDog,
	mdiFoodDrumstick,
	mdiScaleBathroom,
} from '@mdi/js';
import Icon from '@mdi/react';
import UpcomingPreventatives from '../../PetProfile/Preventatives/UpcomingPreventatives';
import DashUpcomingPrev from './DashUpcomingPrev';
import DashPastPrev from './DashPastPrev';

const useStyles = makeStyles((theme) => ({
	root: {
		color: 'black',
		'.MuiDataGrid-colCellCheckbox': {
			backgroundColor: 'red',
		},
		// marginTop: '0rem',
		// backgroundColor: 'blue',
		// borderRadius: ,
	},
	Button: {
		borderRadius: '69%',
		height: '3.4rem',
		width: '0rem',
		marginLeft: '-0.5rem',
		// backgroundColor: 'red',
	},
	EditIcon: {
		color: 'teal',
	},
	DeleteIcon: {
		color: 'red',
	},
	TextField: {
		color: 'black',
		'& .MuiInputBase-root.Mui-disabled': {
			color: 'black', // (default alpha is 0.38)
			fontSize: '0.85rem',
		},
	},
	TextFieldPet: {
		color: 'black',

		'& .MuiInputBase-root.Mui-disabled': {
			color: 'black', // (default alpha is 0.38)
			fontSize: '0.85rem',
			fontWeight: 700,
		},

		marginTop: '1.25rem',
	},
}));

export default function Preventatives(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pets, setPets] = useState(props.currentUser.pets);
	const [preventatives, setPreventatives] = useState(
		currentUser.preventatives
	);
	const [upcomingClicked, setUpcomingClicked] = useState(true);
	const [pastClicked, setPastClicked] = useState(false);
	const [upcomingPreventatives, setUpcomingPreventatives] = useState(
		props.upcomingPreventatives
	);
	const [pastPreventatives, setPastPreventatives] = useState(
		props.pastPreventatives
	);
	const [loading, setLoading] = useState(true);
	const [fromDash, setFromDash] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, []);

	const upcomingClickedHandler = () => {
		setUpcomingClicked(true);
		setPastClicked(false);
	};

	const pastClickedHandler = () => {
		setPastClicked(true);
		setUpcomingClicked(false);
	};

	return (
		<div className="food-main-container" id="preventatives">
			<div className="title">
				<h1>Preventatives</h1>
			</div>
			<ul>
				<li
					onClick={upcomingClickedHandler}
					style={{
						borderBottom:
							upcomingClicked === true
								? '3px solid #ff4f00'
								: null,
					}}
				>
					<h2>Upcoming</h2>
				</li>
				<li
					onClick={pastClickedHandler}
					style={{
						borderBottom:
							pastClicked === true ? '3px solid #ff4f00' : null,
					}}
				>
					<h2>Past</h2>
				</li>
			</ul>

			{upcomingClicked && loading === false ? (
				<DashUpcomingPrev
					currentUser={currentUser}
					upcomingPreventatives={upcomingPreventatives}
				/>
			) : null}
			{pastClicked && loading === false ? (
				<DashPastPrev
					currentUser={currentUser}
					pastPreventatives={pastPreventatives}
				/>
			) : null}

			{/* <div
				className="appointments-table"
				style={{ height: 450, width: '100%' }}
			>
				<DataGrid
					className={classes.root}
					rows={rows}
					columns={columns}
					pageSize={5}
					rowHeight={65}
				/>
			</div> */}
		</div>
	);
}
