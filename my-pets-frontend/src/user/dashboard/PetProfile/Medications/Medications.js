import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CurrentMedications from './CurrentMedications';
import PastMedications from './PastMedications';
import { getMedicationsByPet } from '../../../../util/APIUtils';

const useStyles = makeStyles((theme) => ({
	currentView: {
		color: '#1b2737',
	},
	currentViewSelected: {
		borderBottom: '3px solid #ff4f00',
	},
	pastView: {
		color: '#1b2737',
	},

	pastViewSelected: {
		borderBottom: '3px solid #ff4f00',
	},
}));

export default function Medications(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [medications, setMedications] = useState(props.pet.medications);
	const [currentMedications, setCurentMedications] = useState('');
	const [pastMedications, setPastMedications] = useState('');

	const [currentViewSelected, setCurrentViewSelected] = useState(true);
	const [pastViewSelected, setPastViewSelected] = useState(false);
	const [currentStyle, setCurrentStyle] = useState(
		classes.currentViewSelected
	);
	const [pastStyle, setPastStyle] = useState(classes.pastView);
	const [loading, setLoading] = useState(true);
	const [value, setValue] = useState(0);

	useEffect(() => {
		fetchMedications();
	}, [value]);

	const fetchMedications = () => {
		getMedicationsByPet(currentUser.id, pet.id)
			.then((response) => {
				console.log('MEDICATIONS BY PET');
				console.log(response);
				sortMedications(response);
			})
			.catch((error) => {});
	};

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
			// console.log(newDate);
			if (newDate > now) {
				// console.log('UPCOMING');
				// console.log(newDate);
				currentArray[j] = sortedMedications[i];
				j++;
			} else if (sameDate == todayFormatted) {
				// console.log('SAME');
				// console.log(newDate);
				currentArray[j] = sortedMedications[i];
				j++;
			} else {
				// console.log('PAST');
				// console.log(newDate);
				pastArray[k] = sortedMedications[i];
				k++;
			}
		}
		// console.log(medications);
		// console.log(sortedMedications);
		// console.log(currentArray);
		// console.log(pastArray);
		setCurentMedications(currentArray);
		setPastMedications(pastArray);
		setLoading(false);
	};

	const ReloadComponent = () => {
		console.log('reload weights function called');
		setValue(value + 1);
		setLoading(true);
	};

	const currentViewHandler = () => {
		// console.log('graph view clicked');
		setPastViewSelected(false);
		setCurrentViewSelected(true);
		setCurrentStyle(classes.currentViewSelected);
		setPastStyle(classes.pastView);
	};
	const pastViewHandler = () => {
		setCurrentViewSelected(false);
		setPastViewSelected(true);
		setPastStyle(classes.pastViewSelected);
		setCurrentStyle(classes.currentView);
	};
	return (
		<div className="appointments-profile-main-container">
			<div className="appointments-title">
				<h1>Medications</h1>
				<ul className="view-selector-group">
					<li className={currentStyle} onClick={currentViewHandler}>
						<h2 style={{ fontWeight: '500' }}>Current</h2>
					</li>
					<li className={pastStyle} onClick={pastViewHandler}>
						<h2 style={{ fontWeight: '500' }}>Past </h2>
					</li>
				</ul>
			</div>

			{loading ? (
				<h2>Loading Medications...</h2>
			) : (
				<div>
					{currentViewSelected ? (
						<CurrentMedications
							ReloadComponent={ReloadComponent}
							ReloadPet={props.ReloadPet}
							pet={pet}
							currentUser={currentUser}
							currentMedications={currentMedications}
							forceUpdate={props.forceUpdate}
							changeDefaultViewsAndRefresh={
								props.changeDefaultViewsAndRefresh
							}
						/>
					) : null}

					{pastViewSelected ? (
						<PastMedications
							ReloadComponent={ReloadComponent}
							ReloadPet={props.ReloadPet}
							pet={pet}
							currentUser={currentUser}
							pastMedications={pastMedications}
							forceUpdate={props.forceUpdate}
							changeDefaultViewsAndRefresh={
								props.changeDefaultViewsAndRefresh
							}
						/>
					) : null}
				</div>
			)}
		</div>
	);
}
