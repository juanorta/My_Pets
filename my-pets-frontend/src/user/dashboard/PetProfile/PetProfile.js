import React, { useState, useEffect } from 'react';
import './PetProfile.css';
import { getPet, getCurrentUser } from '../../../util/APIUtils';
import LoadingIndicator from '../../../common/LoadingIndicator';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Icon from '@mdi/react';
import {
	mdiAccount,
	mdiDog,
	mdiFoodDrumstick,
	mdiScaleBathroom,
} from '@mdi/js';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Appointments from './Appointments/Appointments';
import Weights from './Weights/Weights';
import Food from './Food/Food';
import ReactTooltip from 'react-tooltip';

const useStyles = makeStyles((theme) => ({
	root: {
		color: 'white',
		// marginTop: '0rem',
		borderRadius: '50%',
		height: '8rem',
		width: '8rem',
	},

	TabIcon: {
		color: '#1b2737',
		fontSize: '50px',
		'&:hover': {
			color: 'white',
		},
	},

	TabIconMouseHover: {
		fontSize: '50px',
		color: 'white',
	},

	TabButton: {
		height: '6rem',
		width: '6rem',
		'&:hover': {
			backgroundColor: '#FF4F00',
		},
	},

	TabButtonClicked: {
		height: '6rem',
		width: '6rem',
		backgroundColor: '#FF4F00',
		'&:hover': {
			backgroundColor: '#FF4F00',
		},
	},

	label: {
		textTransform: 'capitalize',
	},
}));

export default function PetProfile(props) {
	const theme = useTheme();
	const classes = useStyles();
	const [pet, setPet] = useState(props.location.pet);
	const [petId, setPetId] = useState(props.match.params.petID);
	const [isLoading, setLoading] = useState(true);
	const [iconClass, setIconClass] = useState(classes.TabIcon);
	const [iconClass1, setIconClass1] = useState(classes.TabIcon);
	const [iconClass2, setIconClass2] = useState(classes.TabIcon);
	const [iconClass3, setIconClass3] = useState(classes.TabIcon);
	const [apptClicked, setApptClicked] = useState(false);
	const [weightClicked, setWeightClicked] = useState(false);
	const [foodClicked, setFoodClicked] = useState(false);
	const [buttonClass1, setButtonClass1] = useState(classes.TabButton);
	const [buttonClass2, setButtonClass2] = useState(classes.TabButton);
	const [buttonClass3, setButtonClass3] = useState(classes.TabButton);

	useEffect(() => {
		getCurrentUser()
			.then((user) => {
				console.log(user.id);
				getPet(user.id, petId)
					.then((response) => {
						console.log(response);
						setPet(response);
						setLoading(false);
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => {
				console.log('user not found');
			});

		// getPet(50);
	}, []);

	console.log(props.match.params.petID);

	const iconHoverHandler = () => {
		console.log('hover');
		setIconClass1(classes.TabIconMouseHover);
	};
	const iconHoverHandler2 = () => {
		setIconClass2(classes.TabIconMouseHover);
	};
	const iconHoverHandler3 = () => {
		setIconClass3(classes.TabIconMouseHover);
	};

	const iconHoverLeaveHandler = () => {
		if (apptClicked === false) {
			setIconClass1(classes.TabIcon);
		}
	};
	const iconHoverLeaveHandler2 = () => {
		if (weightClicked === false) {
			setIconClass2(classes.TabIcon);
		}
	};
	const iconHoverLeaveHandler3 = () => {
		if (foodClicked === false) {
			setIconClass3(classes.TabIcon);
		}
	};

	const handleApptClick = () => {
		console.log('appt clicked');
		setApptClicked(true);
		setButtonClass1(classes.TabButtonClicked);
		iconHoverHandler();

		//setting weight tab back to normal
		setWeightClicked(false);
		setButtonClass2(classes.TabButton);
		setIconClass2(classes.TabIcon);

		setFoodClicked(false);
		setButtonClass3(classes.TabButton);
		setIconClass3(classes.TabIcon);
	};

	const handleWeightClick = () => {
		console.log('weight clicked');
		setWeightClicked(true);
		setButtonClass2(classes.TabButtonClicked);
		iconHoverHandler2();

		//setting appt tab back to normal
		setApptClicked(false);
		setButtonClass1(classes.TabButton);
		setIconClass1(classes.TabIcon);

		setFoodClicked(false);
		setButtonClass3(classes.TabButton);
		setIconClass3(classes.TabIcon);
	};

	const handleFoodClick = () => {
		console.log('food clicked');
		setFoodClicked(true);
		setButtonClass3(classes.TabButtonClicked);
		iconHoverHandler3();

		setApptClicked(false);
		setButtonClass1(classes.TabButton);
		setIconClass1(classes.TabIcon);

		setWeightClicked(false);
		setButtonClass2(classes.TabButton);
		setIconClass2(classes.TabIcon);
	};

	console.log('appt = ' + apptClicked);
	// console.log(props.currentUser);
	return (
		<div className="pet-profile-main-container">
			{isLoading ? (
				<LoadingIndicator />
			) : (
				<div className="loaded-pet-profile-main-container">
					<div className="profile-banner">
						<div className="picture">
							<IconButton className={classes.root}>
								{/* <h2>hey</h2> */}
								<Icon
									path={mdiDog}
									title="Dog Profile"
									size={5}
									horizontal
									vertical
									rotate={180}
									color="#ff4f00"
								/>
							</IconButton>
						</div>
					</div>
					<div className="general-info">
						<div className="name">
							<h2>{pet.petName}</h2>
						</div>
						<div className="age-type-sex-breed">
							<ul className="info-list">
								<li>
									<h3>Age</h3>
									<h4>{pet.age}</h4>
								</li>
								<li>
									<h3>Type</h3>
									<h4>{pet.petType}</h4>
								</li>
								<li>
									<h3>Sex</h3>
									<h4>{pet.sex}</h4>
								</li>
								<li>
									<h3 className="breed">Breed</h3>
									<h4>{pet.breed}</h4>
								</li>
							</ul>
						</div>
						<div className="tabs-container">
							<div className="tabs">
								<ReactTooltip
									id="appt"
									place="top"
									effect="solid"
								>
									View 'Appointments' section
								</ReactTooltip>
								<ReactTooltip
									id="weights"
									place="top"
									effect="solid"
								>
									View 'Weights' section
								</ReactTooltip>
								<ReactTooltip
									id="food"
									place="top"
									effect="solid"
								>
									View 'Food' section
								</ReactTooltip>
								<ul className="tabs-list">
									<li>
										<IconButton
											data-tip
											data-for="appt"
											className={buttonClass1}
											onMouseOver={iconHoverHandler}
											onMouseLeave={iconHoverLeaveHandler}
											onClick={handleApptClick}
										>
											<LocalHospitalIcon
												className={iconClass1}
											/>
										</IconButton>
									</li>
									<li>
										<IconButton
											data-tip
											data-for="weights"
											className={buttonClass2}
											onMouseOver={iconHoverHandler2}
											onMouseLeave={
												iconHoverLeaveHandler2
											}
											onClick={handleWeightClick}
										>
											<Icon
												className={iconClass2}
												path={mdiScaleBathroom}
												title="Scale"
												size={2}
												horizontal
												vertical
												rotate={180}
												// color="#1b2737"
											/>
										</IconButton>
									</li>
									<li>
										<IconButton
											data-tip
											data-for="food"
											className={buttonClass3}
											onMouseOver={iconHoverHandler3}
											onMouseLeave={
												iconHoverLeaveHandler3
											}
											onClick={handleFoodClick}
										>
											<Icon
												className={iconClass3}
												path={mdiFoodDrumstick}
												title="food"
												size={2}
												horizontal
												vertical
												rotate={180}
												// color="#1b2737"
											/>
										</IconButton>
									</li>
								</ul>
								{apptClicked &&
								weightClicked === false &&
								foodClicked === false ? (
									<Appointments />
								) : null}

								{weightClicked &&
								apptClicked === false &&
								foodClicked === false ? (
									<Weights />
								) : null}

								{foodClicked &&
								weightClicked === false &&
								apptClicked === false ? (
									<Food />
								) : null}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
