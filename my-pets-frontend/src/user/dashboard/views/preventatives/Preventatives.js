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
	const [upcomingPreventatives, setUpcomingPreventatives] = useState('');
	const [pastPreventatives, setPastPreventatives] = useState('');
	const [loading, setLoading] = useState(true);
	const [fromDash, setFromDash] = useState(true);

	useEffect(() => {
		console.log('preventatives');
		// console.log(preventatives);
		let sortedPreventatives = preventatives.slice();
		sortedPreventatives.sort(function compare(a, b) {
			var dateA = new Date(a.dueNext);
			var dateB = new Date(b.dueNext);
			return dateB - dateA;
		});

		var now = new Date();
		let upcomingArray = [];
		let pastArray = [];
		let j = 0;
		let k = 0;

		for (var i = 0; i < sortedPreventatives.length; i++) {
			var newDate = moment(sortedPreventatives[i].dueNext).toDate();
			var sameDate = moment(sortedPreventatives[i].dueNext).format(
				'MM/DD/YYYY'
			);

			var todayFormatted = moment(now).format('MM/DD/YYYY');
			// console.log(newDate);
			if (newDate > now) {
				// console.log('UPCOMING');
				// console.log(newDate);
				upcomingArray[j] = sortedPreventatives[i];
				j++;
			} else if (sameDate == todayFormatted) {
				// console.log('SAME');
				// console.log(newDate);
				upcomingArray[j] = sortedPreventatives[i];
				j++;
			} else {
				// console.log('PAST');
				// console.log(newDate);
				pastArray[k] = sortedPreventatives[i];
				k++;
			}
		}

		console.log(sortedPreventatives);
		console.log(upcomingArray);
		console.log(pastArray);

		setUpcomingPreventatives(upcomingArray);
		setPastPreventatives(pastArray);
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
