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
	mdiNeedle,
	mdiPill,
	mdiDoctor,
} from '@mdi/js';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Appointments from './Appointments/Appointments';
import Weights from './Weights/Weights';
// import Food from './Food/Food';
import ReactTooltip from 'react-tooltip';
import AddBtnPetProfile from './AddBtnPetProfile/AddBtnPetProfile';
import SettingsBtnProfile from './SettingsBtnProfile/SettingsBtnProfile';
import FoodTable from './Food/FoodTable/FoodTable';
import Food from './Food/Food';
import ProfileAppointments from './Appointments/ProfileAppointments';
import EventIcon from '@material-ui/icons/Event';
import Preventatives from './Preventatives/Preventatives';
import Medications from './Medications/Medications';
import Vets from './Vets/Vets';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { TextField } from '@material-ui/core';

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
		// '&:hover': {
		// 	color: 'white',
		// },
	},

	TabIconMouseHover: {
		fontSize: '50px',
		color: 'white',
	},

	TabButton: {
		height: '5rem',
		width: '5rem',
		'&:hover': {
			backgroundColor: 'grey',
		},
	},

	TabButtonClicked: {
		height: '5rem',
		width: '5rem',
		backgroundColor: '#FF4F00',
		'&:hover': {
			backgroundColor: 'grey',
		},
	},

	label: {
		textTransform: 'capitalize',
	},

	componentSelectorButton: {
		height: '2rem',
		width: '8rem',
		marginTop: '-0.5rem',
		marginLeft: '1rem',
		// backgroundColor: '#1b2737',
		// color: '#1b2737',
	},
}));

export default function PetProfile(props) {
	const theme = useTheme();
	const classes = useStyles();

	const [user, setUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.location.pet);
	const [petId, setPetId] = useState(props.match.params.petID);
	const [isLoading, setLoading] = useState(true);

	//different styles for each icon
	const [iconClass, setIconClass] = useState(classes.TabIcon);
	const [iconClass1, setIconClass1] = useState(classes.TabIcon);
	const [iconClass2, setIconClass2] = useState(classes.TabIcon);
	const [iconClass3, setIconClass3] = useState(classes.TabIcon);
	const [iconClass4, setIconClass4] = useState(classes.TabIcon);
	const [iconClass5, setIconClass5] = useState(classes.TabIcon);
	const [iconClass6, setIconClass6] = useState(classes.TabIcon);

	//used to detect when a button is clicked
	const [apptClicked, setApptClicked] = useState(false);
	const [weightClicked, setWeightClicked] = useState(false);
	const [foodClicked, setFoodClicked] = useState(false);
	const [preventativeClicked, setPreventativeClicked] = useState(false);
	const [medicationClicked, setMedicationClicked] = useState(false);
	const [vetClicked, setVetClicked] = useState(false);

	//different styles for each button
	const [buttonClass1, setButtonClass1] = useState(classes.TabButton);
	const [buttonClass2, setButtonClass2] = useState(classes.TabButton);
	const [buttonClass3, setButtonClass3] = useState(classes.TabButton);
	const [buttonClass4, setButtonClass4] = useState(classes.TabButton);
	const [buttonClass5, setButtonClass5] = useState(classes.TabButton);
	const [buttonClass6, setButtonClass6] = useState(classes.TabButton);
	const [defaultView, setDefaultView] = useState(props.defaultView);
	const small = useMediaQuery(theme.breakpoints.down('sm'));
	const extraSmall = useMediaQuery(theme.breakpoints.down('xs'));
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [viewClicked, setViewClicked] = useState(defaultView);
	//gets pet data on component load
	useEffect(() => {
		getPet(user.id, petId)
			.then((response) => {
				//	console.log(response);
				setPet(response);
				setLoading(false);
			})
			.catch((error) => {
				//console.log(error);
			});
		// iconHoverHandler();
		// setApptClicked(true);
		// setButtonClass1(classes.TabButtonClicked);
		// iconHoverHandler();

		defaultViewHandler(defaultView);
	}, []);

	const defaultViewHandler = (viewName) => {
		if (defaultView == 'APPOINTMENTS') {
			handleApptClick();
		} else if (defaultView == 'WEIGHTS') {
			handleWeightClick();
		} else if (defaultView == 'FOOD') {
			handleFoodClick();
		} else if (defaultView == 'PREVENTATIVES') {
			handlePrevClicked();
		} else if (defaultView == 'MEDICATIONS') {
			handleMedClicked();
		} else if (defaultView == 'VETS') {
			handleVetClicked();
		}
		console.log(viewName);
	};

	//console.log(props.match.params.petID);

	//changes icon color when hovered over
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
	const iconHoverHandler4 = () => {
		console.log('hover');
		setIconClass4(classes.TabIconMouseHover);
	};
	const iconHoverHandler5 = () => {
		setIconClass5(classes.TabIconMouseHover);
	};
	const iconHoverHandler6 = () => {
		setIconClass6(classes.TabIconMouseHover);
	};

	//changes icon to normal
	//will only change to normal when not clicked
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

	const selectViewHandler = (event) => {
		setAnchorEl(event.currentTarget);
		console.log('view selector clicked');
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	//changes button color to orange
	//changes icon color to white
	//sets other 2 buttons back to normal colors
	const handleApptClick = () => {
		//console.log('appt clicked');
		setApptClicked(true);
		setViewClicked('Appointments');
		setButtonClass1(classes.TabButtonClicked);
		iconHoverHandler();

		//setting weight tab back to normal
		setWeightClicked(false);
		setButtonClass2(classes.TabButton);
		setIconClass2(classes.TabIcon);

		setFoodClicked(false);
		setButtonClass3(classes.TabButton);
		setIconClass3(classes.TabIcon);

		setPreventativeClicked(false);
		setButtonClass4(classes.TabButton);
		setIconClass4(classes.TabIcon);

		setMedicationClicked(false);
		setButtonClass5(classes.TabButton);
		setIconClass5(classes.TabIcon);

		setVetClicked(false);
		setButtonClass6(classes.TabButton);
		setIconClass6(classes.TabIcon);

		handleClose();
	};

	const handleWeightClick = () => {
		//		console.log('weight clicked');
		setWeightClicked(true);
		setViewClicked('Weights');
		setButtonClass2(classes.TabButtonClicked);
		iconHoverHandler2();

		//setting appt tab back to normal
		setApptClicked(false);
		setButtonClass1(classes.TabButton);
		setIconClass1(classes.TabIcon);

		setFoodClicked(false);
		setButtonClass3(classes.TabButton);
		setIconClass3(classes.TabIcon);

		setPreventativeClicked(false);
		setButtonClass4(classes.TabButton);
		setIconClass4(classes.TabIcon);

		setMedicationClicked(false);
		setButtonClass5(classes.TabButton);
		setIconClass5(classes.TabIcon);

		setVetClicked(false);
		setButtonClass6(classes.TabButton);
		setIconClass6(classes.TabIcon);

		handleClose();
	};

	const handleFoodClick = () => {
		//console.log('food clicked');
		setFoodClicked(true);
		setViewClicked('Food/Treats');
		setButtonClass3(classes.TabButtonClicked);
		iconHoverHandler3();

		setApptClicked(false);
		setButtonClass1(classes.TabButton);
		setIconClass1(classes.TabIcon);

		setWeightClicked(false);
		setButtonClass2(classes.TabButton);
		setIconClass2(classes.TabIcon);

		setPreventativeClicked(false);
		setButtonClass4(classes.TabButton);
		setIconClass4(classes.TabIcon);

		setMedicationClicked(false);
		setButtonClass5(classes.TabButton);
		setIconClass5(classes.TabIcon);

		setVetClicked(false);
		setButtonClass6(classes.TabButton);
		setIconClass6(classes.TabIcon);

		handleClose();
	};

	const handlePrevClicked = () => {
		setPreventativeClicked(true);
		setViewClicked('Preventatives');
		setButtonClass4(classes.TabButtonClicked);
		iconHoverHandler4();

		setApptClicked(false);
		setButtonClass1(classes.TabButton);
		setIconClass1(classes.TabIcon);

		setFoodClicked(false);
		setButtonClass2(classes.TabButton);
		setIconClass2(classes.TabIcon);

		setWeightClicked(false);
		setButtonClass3(classes.TabButton);
		setIconClass3(classes.TabIcon);

		setMedicationClicked(false);
		setButtonClass5(classes.TabButton);
		setIconClass5(classes.TabIcon);

		setVetClicked(false);
		setButtonClass6(classes.TabButton);
		setIconClass6(classes.TabIcon);

		handleClose();
	};

	const handleMedClicked = () => {
		setMedicationClicked(true);
		setViewClicked('Medications');
		setButtonClass5(classes.TabButtonClicked);
		iconHoverHandler5();

		setApptClicked(false);
		setButtonClass1(classes.TabButton);
		setIconClass1(classes.TabIcon);

		setFoodClicked(false);
		setButtonClass2(classes.TabButton);
		setIconClass2(classes.TabIcon);

		setWeightClicked(false);
		setButtonClass3(classes.TabButton);
		setIconClass3(classes.TabIcon);

		setPreventativeClicked(false);
		setButtonClass4(classes.TabButton);
		setIconClass4(classes.TabIcon);

		setVetClicked(false);
		setButtonClass6(classes.TabButton);
		setIconClass6(classes.TabIcon);

		handleClose();
	};

	const handleVetClicked = () => {
		setVetClicked(true);
		setViewClicked('Veterinarians');
		setButtonClass6(classes.TabButtonClicked);
		iconHoverHandler6();

		setApptClicked(false);
		setButtonClass1(classes.TabButton);
		setIconClass1(classes.TabIcon);

		setFoodClicked(false);
		setButtonClass2(classes.TabButton);
		setIconClass2(classes.TabIcon);

		setWeightClicked(false);
		setButtonClass3(classes.TabButton);
		setIconClass3(classes.TabIcon);

		setPreventativeClicked(false);
		setButtonClass4(classes.TabButton);
		setIconClass4(classes.TabIcon);

		setMedicationClicked(false);
		setButtonClass5(classes.TabButton);
		setIconClass5(classes.TabIcon);

		handleClose();
	};

	//	console.log('appt = ' + apptClicked);
	// console.log(props.currentUser);
	//console.log(props);
	console.log(pet);
	return (
		<div
			className="pet-profile-main-container"
			style={{ overflowY: 'hidden' }}
		>
			{isLoading ? (
				<LoadingIndicator />
			) : (
				<div className="loaded-pet-profile-main-container">
					<div className="profile-banner">
						<div className="picture">
							<IconButton className={classes.root}>
								{/* <h2>hey</h2> */}
								{pet.petImage == null ? (
									<Icon
										path={mdiDog}
										title="Dog Profile"
										size={5}
										horizontal
										vertical
										rotate={180}
										color="#1b2737"
										// color="#ff4f00"
									/>
								) : (
									<img
										className="image"
										style={{
											borderRadius: '55%',
											marginTop: '-0.5rem',
											height: '8rem',
											width: '8rem',
										}}
										src={`data:image/jpeg;base64,${pet.petImage.data}`}
									/>
								)}
							</IconButton>
						</div>
					</div>
					<div
						className="general-info"
						style={{ overflowY: 'hidden' }}
					>
						<div className="name">
							<h2>{pet.petName}</h2>
						</div>
						<div className="settings-button">
							<SettingsBtnProfile
								currentUser={user}
								pet={pet}
								forceUpdate={props.forceUpdate}
							/>
						</div>
						{/* when clicked, opens a menu that allows you to pick what you want to add */}
						<div className="add-button-profile">
							<AddBtnPetProfile
								forceUpdate={props.forceUpdate}
								pet={pet}
								currentUser={user}
								changeDefaultViewsAndRefresh={
									props.changeDefaultViewsAndRefresh
								}
							/>
						</div>
						<div className="age-type-sex-breed">
							{extraSmall ? (
								<div>
									<ul className="info-list-small">
										<li className="first-set">
											<h3>Age </h3> <p>{pet.age}</p>
											<h3>Type</h3> <p>{pet.petType}</p>
											{/* <h3>Sex: </h3>
											<h3>Breed:</h3> */}
										</li>
										<li>
											<h3> Sex </h3> <p>{pet.sex}</p>
											<h3>Breed</h3> <p>{pet.breed}</p>
											{/* <h3>Sex: </h3>
											<h3>Breed:</h3> */}
										</li>
									</ul>
								</div>
							) : (
								<div>
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
							)}
						</div>
						<div className="tabs-container">
							<div className="tabs">
								<ReactTooltip
									id="appt"
									place="top"
									effect="solid"
								>
									View Appointments
								</ReactTooltip>
								<ReactTooltip
									id="weights"
									place="top"
									effect="solid"
								>
									View Weights
								</ReactTooltip>
								<ReactTooltip
									id="food"
									place="top"
									effect="solid"
								>
									View Food
								</ReactTooltip>
								<ReactTooltip
									id="prev"
									place="top"
									effect="solid"
								>
									View Preventatives
								</ReactTooltip>
								<ReactTooltip
									id="meds"
									place="top"
									effect="solid"
								>
									View Medications
								</ReactTooltip>
								<ReactTooltip
									id="vets"
									place="top"
									effect="solid"
								>
									View Veterinarians
								</ReactTooltip>
								{small ? (
									<div className="view-selector">
										<h3>View: </h3>{' '}
										<TextField
											select
											className={
												classes.componentSelectorButton
											}
											InputLabelProps={{
												style: {
													color: '#1b2737',
												},
											}}
											label={viewClicked}
										>
											<MenuItem onClick={handleApptClick}>
												Appointments
											</MenuItem>
											<MenuItem
												onClick={handleWeightClick}
											>
												Weights
											</MenuItem>
											<MenuItem onClick={handleFoodClick}>
												Food/Treats
											</MenuItem>
											<MenuItem
												onClick={handlePrevClicked}
											>
												Preventative
											</MenuItem>
											<MenuItem
												onClick={handleMedClicked}
											>
												Medications
											</MenuItem>
											<MenuItem
												onClick={handleVetClicked}
											>
												Veterinarians
											</MenuItem>
										</TextField>
									</div>
								) : (
									<div>
										<ul className="tabs-list">
											<li>
												<IconButton
													data-tip
													data-for="appt"
													className={buttonClass1}
													// onMouseOver={iconHoverHandler}
													// onMouseLeave={iconHoverLeaveHandler}
													onClick={handleApptClick}
												>
													<EventIcon
														className={iconClass1}
													/>
												</IconButton>
											</li>
											<li>
												<IconButton
													data-tip
													data-for="weights"
													className={buttonClass2}
													// onMouseOver={iconHoverHandler2}
													// onMouseLeave={
													// 	iconHoverLeaveHandler2
													// }
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
													// onMouseOver={iconHoverHandler3}
													// onMouseLeave={
													// 	iconHoverLeaveHandler3
													// }
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
											<li>
												<IconButton
													data-tip
													data-for="prev"
													className={buttonClass4}
													// onMouseOver={iconHoverHandler3}
													// onMouseLeave={
													// 	iconHoverLeaveHandler3
													// }
													onClick={handlePrevClicked}
												>
													<Icon
														className={iconClass4}
														path={mdiNeedle}
														title="food"
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
													data-for="meds"
													className={buttonClass5}
													// onMouseOver={iconHoverHandler3}
													// onMouseLeave={
													// 	iconHoverLeaveHandler3
													// }
													onClick={handleMedClicked}
												>
													<Icon
														className={iconClass5}
														path={mdiPill}
														title="food"
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
													data-for="vets"
													className={buttonClass6}
													// onMouseOver={iconHoverHandler3}
													// onMouseLeave={
													// 	iconHoverLeaveHandler3
													// }
													onClick={handleVetClicked}
												>
													<Icon
														className={iconClass6}
														path={mdiDoctor}
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
									</div>
								)}

								{/* shows appopriate component when selected */}
								{apptClicked &&
								weightClicked === false &&
								foodClicked === false ? (
									<Appointments
										forceUpdate={props.forceUpdate}
										currentUser={user}
										pet={pet}
										defaultViewHandler={defaultViewHandler}
										changeDefaultViewsAndRefresh={
											props.changeDefaultViewsAndRefresh
										}
									/>
								) : null}

								{weightClicked &&
								apptClicked === false &&
								foodClicked === false ? (
									<Weights
										forceUpdate={props.forceUpdate}
										currentUser={user}
										pet={pet}
										defaultViewHandler={defaultViewHandler}
										changeDefaultViewsAndRefresh={
											props.changeDefaultViewsAndRefresh
										}
									/>
								) : null}

								{foodClicked &&
								weightClicked === false &&
								apptClicked === false ? (
									<Food
										forceUpdate={props.forceUpdate}
										currentUser={user}
										pet={pet}
										defaultViewHandler={defaultViewHandler}
										changeDefaultViewsAndRefresh={
											props.changeDefaultViewsAndRefresh
										}
									/>
								) : null}

								{preventativeClicked ? (
									<Preventatives
										forceUpdate={props.forceUpdate}
										currentUser={user}
										pet={pet}
										defaultViewHandler={defaultViewHandler}
										changeDefaultViewsAndRefresh={
											props.changeDefaultViewsAndRefresh
										}
									/>
								) : null}

								{medicationClicked ? (
									<Medications
										forceUpdate={props.forceUpdate}
										currentUser={user}
										pet={pet}
										defaultViewHandler={defaultViewHandler}
										changeDefaultViewsAndRefresh={
											props.changeDefaultViewsAndRefresh
										}
									/>
								) : null}

								{vetClicked ? (
									<Vets
										forceUpdate={props.forceUpdate}
										currentUser={user}
										pet={pet}
										defaultViewHandler={defaultViewHandler}
										changeDefaultViewsAndRefresh={
											props.changeDefaultViewsAndRefresh
										}
									/>
								) : null}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
