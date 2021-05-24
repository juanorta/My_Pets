import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import UpcomingPreventatives from './UpcomingPreventatives';
import PastPreventatives from './PastPreventatives';
import { getPreventativesByPet } from '../../../../util/APIUtils';

const useStyles = makeStyles((theme) => ({
	upcomingView: {
		color: '#1b2737',
	},
	upcomingViewSelected: {
		borderBottom: '3px solid #ff4f00',
	},
	pastView: {
		color: '#1b2737',
	},

	pastViewSelected: {
		borderBottom: '3px solid #ff4f00',
	},
}));

export default function Preventatives(props) {
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	// const [preventatives, setPreventatives] = useState(props.pet.preventatives);
	const [upcomingPreventatives, setUpcomingPreventatives] = useState('');
	const [pastPreventatives, setPastPreventatives] = useState('');
	const [upcomingViewSelected, setUpcomingViewSelected] = useState(true);
	const [pastViewSelected, setPastViewSelected] = useState(false);
	const [upcomingStyle, setUpcomingStyle] = useState(
		classes.upcomingViewSelected
	);
	const [pastStyle, setPastStyle] = useState(classes.pastView);
	const [loading, setLoading] = useState(true);
	const [value, setValue] = useState(0);

	useEffect(() => {
		fetchPreventatives();
	}, [value]);

	const fetchPreventatives = () => {
		getPreventativesByPet(currentUser.id, pet.id)
			.then((response) => {
				sortPreventatives(response);
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

	const ReloadComponent = () => {
		setValue(value + 1);
		setLoading(true);
	};

	const upcomingViewHandler = () => {
		setPastViewSelected(false);
		setUpcomingViewSelected(true);
		setUpcomingStyle(classes.upcomingViewSelected);
		setPastStyle(classes.pastView);
	};
	const pastViewHandler = () => {
		setUpcomingViewSelected(false);
		setPastViewSelected(true);
		setPastStyle(classes.pastViewSelected);
		setUpcomingStyle(classes.upcomingView);
	};

	return (
		<div className="appointments-profile-main-container">
			<div className="appointments-title">
				<h1>Preventatives</h1>
				<ul className="view-selector-group">
					<li className={upcomingStyle} onClick={upcomingViewHandler}>
						<h2 style={{ fontWeight: '500' }}>Upcoming</h2>
					</li>
					<li className={pastStyle} onClick={pastViewHandler}>
						<h2 style={{ fontWeight: '500' }}>Past </h2>
					</li>
				</ul>
			</div>

			{loading ? (
				<h2 className="loading">Loading Preventatives...</h2>
			) : (
				<div>
					{upcomingViewSelected ? (
						<UpcomingPreventatives
							ReloadComponent={ReloadComponent}
							ReloadPet={props.ReloadPet}
							pet={pet}
							currentUser={currentUser}
							// preventatives={preventatives}
							upcomingPreventatives={upcomingPreventatives}
							forceUpdate={props.forceUpdate}
							changeDefaultViewsAndRefresh={
								props.changeDefaultViewsAndRefresh
							}
						/>
					) : null}

					{pastViewSelected ? (
						<PastPreventatives
							ReloadComponent={ReloadComponent}
							ReloadPet={props.ReloadPet}
							pet={pet}
							currentUser={currentUser}
							// preventatives={preventatives}
							pastPreventatives={pastPreventatives}
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
