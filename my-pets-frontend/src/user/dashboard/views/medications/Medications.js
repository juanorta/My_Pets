import React, { Component, useState, useEffect } from 'react';
import './Medications.css';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import {
	getAllAppointments,
	getAllMedications,
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
import DashCurrentMeds from './DashCurrentMeds';
import DashPastMeds from './DashPastMeds';

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

export default function Medications(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [currentClicked, setCurrentClicked] = useState(true);
	const [pastClicked, setPastClicked] = useState(false);
	const [medications, setMedications] = useState('');
	const [currentMedications, setCurrentMedications] = useState('');
	const [pastMedications, setPastMedications] = useState('');
	const [loading, setLoading] = useState(true);
	const [petPictures, setPetPictures] = useState(props.petPictures);
	const [hasMedications, setHasMedications] = useState(true);

	//getting all medications and passing them down to Current and Past medications
	useEffect(() => {
		fetchMedications();
	}, []);

	const fetchMedications = () => {
		getAllMedications(currentUser.id)
			.then((response) => {
				if (response.length < 1) {
					setHasMedications(false);
				} else {
					sortMedications(response);
				}
			})
			.catch((error) => {});
	};

	//sorts Medications into Current or Past categories
	const sortMedications = (medications) => {
		let sortedMedications = medications.slice();
		sortedMedications.sort(function compare(a, b) {
			var dateA = new Date(a.endDate);
			var dateB = new Date(b.endDate);
			return dateB - dateA;
		});
		var now = new Date();
		let currentArray = [];
		let pastArray = [];
		let j = 0;
		let k = 0;
		for (var i = 0; i < sortedMedications.length; i++) {
			var newDate = moment(sortedMedications[i].endDate).toDate();
			var sameDate = moment(sortedMedications[i].endDate).format(
				'MM/DD/YYYY'
			);
			var todayFormatted = moment(now).format('MM/DD/YYYY');
			if (newDate > now) {
				currentArray[j] = sortedMedications[i];
				j++;
			} else if (sameDate == todayFormatted) {
				currentArray[j] = sortedMedications[i];
				j++;
			} else {
				pastArray[k] = sortedMedications[i];
				k++;
			}
		}
		setCurrentMedications(currentArray);
		setPastMedications(pastArray);
		setLoading(false);
	};

	const currentClickedHandler = () => {
		setCurrentClicked(true);
		setPastClicked(false);
	};

	const pastClickedHandler = () => {
		setPastClicked(true);
		setCurrentClicked(false);
	};

	return (
		<div className="food-main-container" id="medications">
			<div className="title">
				<h1>Medications</h1>
			</div>

			{hasMedications === false ? (
				<div className="nopets">
					<h2>
						No medications found. To add a medication entry, press
						the eye icon on your pet's card to go to their profile
						and add a medication.
					</h2>
				</div>
			) : (
				<div>
					<ul>
						<li
							onClick={currentClickedHandler}
							style={{
								borderBottom:
									currentClicked === true
										? '3px solid #ff4f00'
										: null,
							}}
						>
							<h2>Current</h2>
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
					{currentClicked && loading === false ? (
						<DashCurrentMeds
							currentUser={currentUser}
							medications={medications}
							currentMedications={currentMedications}
							petPictures={props.petPictures}
						/>
					) : null}

					{pastClicked && loading === false ? (
						<DashPastMeds
							currentUser={currentUser}
							medications={medications}
							pastMedications={pastMedications}
							petPictures={props.petPictures}
						/>
					) : null}
				</div>
			)}
		</div>
	);
}
