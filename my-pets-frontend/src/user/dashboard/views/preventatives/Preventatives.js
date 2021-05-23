import React, { Component, useState, useEffect } from 'react';
import './preventatives.css';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import {
	getAllAppointments,
	getAllPreventatives,
} from '../../../../util/APIUtils';
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
	// const [pets, setPets] = useState(props.currentUser.pets);
	const [preventatives, setPreventatives] = useState('');
	const [upcomingClicked, setUpcomingClicked] = useState(true);
	const [pastClicked, setPastClicked] = useState(false);
	const [upcomingPreventatives, setUpcomingPreventatives] = useState('');
	const [pastPreventatives, setPastPreventatives] = useState('');
	const [loading, setLoading] = useState(true);
	const [fromDash, setFromDash] = useState(true);
	const [petPictures, setPetPictures] = useState(props.petPictures);
	const [hasPreventatives, setHasPreventatives] = useState(true);

	//getting all preventatives and then passing them down to Upcoming and Past Preventatives
	useEffect(() => {
		fetchPreventatives();
	}, []);

	//sorts Preventatives into Upcoming or Past categories
	const fetchPreventatives = () => {
		getAllPreventatives(currentUser.id)
			.then((response) => {
				// console.log('ALL PREVENTATIVES');
				// console.log(response);
				if (response.length < 1) {
					setHasPreventatives(false);
				} else {
					setPreventatives(response);
					sortPreventatives(response);
				}
			})
			.catch((error) => {});
	};

	const sortPreventatives = (preventatives) => {
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
				upcomingArray[j] = sortedPreventatives[i];
				j++;
			} else if (sameDate == todayFormatted) {
				upcomingArray[j] = sortedPreventatives[i];
				j++;
			} else {
				pastArray[k] = sortedPreventatives[i];
				k++;
			}
		}
		setUpcomingPreventatives(upcomingArray);
		setPastPreventatives(pastArray);
		setLoading(false);
	};

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

			{hasPreventatives === false ? (
				<div className="nopets">
					<h2>
						No preventatives found. To add a preventative entry,
						press the eye icon on your pet's card to go to their
						profile and add a prevenative.
					</h2>
				</div>
			) : (
				<div>
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
									pastClicked === true
										? '3px solid #ff4f00'
										: null,
							}}
						>
							<h2>Past</h2>
						</li>
					</ul>
					{upcomingClicked && loading === false ? (
						<DashUpcomingPrev
							currentUser={currentUser}
							upcomingPreventatives={upcomingPreventatives}
							petPictures={props.petPictures}
						/>
					) : null}
					{pastClicked && loading === false ? (
						<DashPastPrev
							currentUser={currentUser}
							pastPreventatives={pastPreventatives}
							petPictures={props.petPictures}
						/>
					) : null}
				</div>
			)}
		</div>
	);
}
