import React, { useEffect, useState } from 'react';
import './FoodCards.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Icon from '@mdi/react';
import {
	mdiAccount,
	mdiDog,
	mdiFoodDrumstick,
	mdiScaleBathroom,
} from '@mdi/js';
import EditDeleteFoodButtonHandler from '../EditDeleteFoodButtonHandler';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	tags: {
		backgroundColor: 'transparent',
		height: '69%',
		width: '40%',
		display: 'flex',
		justifyContent: 'center',
		marginTop: '1.5rem',
		marginLeft: '3rem',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5),
		},
	},
	paperXL: {
		backgroundColor: 'transparent',
		height: 270,
		width: 570,
		display: 'inline-block',
		margin: '1rem',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			transform: 'scale(1.05)',
		},
		borderRadius: 8,
		marginRight: '2rem',
	},
	paperLarge: {
		backgroundColor: 'transparent',
		height: 250,
		width: 490,
		display: 'inline-block',
		margin: '1rem',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			transform: 'scale(1.05)',
		},
		borderRadius: 8,
		marginRight: '1rem',
	},
	paperSmall: {
		height: 250,
		width: 420,
		display: 'inline-block',
		margin: '1rem',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			transform: 'scale(1.0)',
		},
		borderRadius: 2,
		// justifyContent: 'center',
	},
	control: {
		padding: theme.spacing(2),
	},
	foodImageCard: {
		backgroundColor: 'red',
	},
	imageSection: {
		backgroundColor: 'teal',
	},
	editButton: {
		position: 'absolute',
		left: -15,
		top: -35,
		// marginLeft: '1rem',
		// height: '1.5rem',
		// width: '1.5rem',
	},
	button: {
		position: 'absolute',
		right: -18,
		top: -35,
		// marginLeft: '50%',
		// marginLeft: '12.3rem',
		// height: '1.5rem',
		// width: '1.5rem',
	},
	tagStyle: {
		backgroundColor: 'teal',

		marginBottom: '-2rem',
		color: 'white',
		fontWeight: 600,
		borderRadius: 6,
	},
	noPicture: {
		position: 'absolute',
		backgroundColor: 'transparent',
		marginTop: '-4rem',
		marginLeft: '3rem',
		// marginLeft: '3rem',
		color: '#1b2737',
	},
}));

//displays list of cards with food data
export default function FoodCards(props) {
	const theme = useTheme();
	const classes = useStyles();
	const small = useMediaQuery(theme.breakpoints.down('sm'));
	const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
	const largeScreen = useMediaQuery(theme.breakpoints.down('lg'));
	const extraLargeScreen = useMediaQuery(theme.breakpoints.down('xl'));

	const [isDashboard, setIsDashboard] = useState(props.isDashboard);
	const [style, setStyle] = useState('');
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [food, setFood] = useState(props.pet.food);
	const [openModal, setOpenModal] = useState(false);
	const [isEditFood, setIsEditFood] = useState(false);
	const [isDeleteFood, setIsDeleteFood] = useState(false);
	const [rowData, setRowData] = useState('');

	let size = classes.paperLarge;

	if (small) {
		size = classes.paperSmall;
	} else if (extraLargeScreen) {
		size = classes.paperXL;
	}

	useEffect(() => {
		if (isDashboard === false) {
			setStyle('food-cards-main-container');
		}
		let rowDataObject = {
			id: '',
			foodName: '',
			flavor: '',
			type: '',
			wetOrDry: '',
			whereToBuy: '',
			notes: '',
		};
		console.log(props.pet);
		setFood(props.pet.food);
		setRowData(rowDataObject);
	}, [props.pet]);

	const SetOpenModalToFalse = () => {
		setOpenModal(false);
		setIsEditFood(false);
		setIsDeleteFood(false);
		// props.forceUpdate();
	};
	// console.log(food);
	// console.log(rowData);

	function editButtonHandler(
		id,
		foodName,
		flavor,
		type,
		wetOrDry,
		whereToBuy,
		notes
	) {
		// console.log(id);
		// console.log(foodName);
		// console.log(flavor);
		// console.log(type);
		// console.log(wetOrDry);
		// console.log(whereToBuy);
		// console.log(notes);

		let rowDataObject = {
			id: id,
			foodName: foodName,
			flavor: flavor,
			type: type,
			wetOrDry: wetOrDry,
			whereToBuy: whereToBuy,
			notes: notes,
		};

		setRowData(rowDataObject);
		setOpenModal(true);
		setIsEditFood(true);
		setIsDeleteFood(false);
	}

	function deleteButtonHandler(
		id,
		foodName,
		flavor,
		type,
		wetOrDry,
		whereToBuy,
		notes
	) {
		let rowDataObject = {
			id: id,
			foodName: foodName,
			flavor: flavor,
			type: type,
			wetOrDry: wetOrDry,
			whereToBuy: whereToBuy,
			notes: notes,
		};

		setRowData(rowDataObject);
		setOpenModal(true);
		setIsEditFood(false);
		setIsDeleteFood(true);
	}

	// console.log('large screen');
	// console.log(largeScreen);
	// console.log('XL screen');
	// console.log(extraLargeScreen);
	// console.log(rowData);
	//sends data to EditDeleteFoodButtonHandler, which will reorganize data and open a
	//delete modal or edit modal
	return (
		<div className={style}>
			<Grid
				container
				justify="center"
				className={classes.root}
				spacing={0}
			>
				<Grid item lg={12} xs={12}>
					{food.map((food, i) => (
						<Paper className={size} elevation={10}>
							<div className="image-info">
								<div className="image-section">
									{food.foodImage == null ? (
										<div className="no-food-picture">
											<Icon
												className={classes.noPicture}
												path={mdiFoodDrumstick}
												title="Scale"
												size={5}
												horizontal
												vertical
												rotate={180}
												// color="#1b2737"
											/>
										</div>
									) : (
										<img
											className="food-image"
											src={`data:image/jpeg;base64,${food.foodImage.data}`}
										/>
									)}
								</div>
								<div className={classes.tags}>
									<Chip
										// style={{ backgroundColor: '#ff4f00' }}
										className={classes.tagStyle}
										label={food.foodName}
									/>

									<Chip
										// style={{ backgroundColor: 'teal' }}
										className={classes.tagStyle}
										label={food.type}
									/>
									{/* <Chip
										style={{ backgroundColor: '#1b2737' }}
										className={classes.tagStyle}
										label="HEB Cat Food"
									/> */}
									{food.wetOrDry == '' ? null : (
										<Chip
											// style={{
											// 	backgroundColor: '#1b2737',
											// }}
											className={classes.tagStyle}
											label={food.wetOrDry}
										/>
									)}

									{food.flavor == '' ? null : (
										<Chip
											// style={{
											// 	backgroundColor: '#336699',
											// }}
											className={classes.tagStyle}
											label={food.flavor}
										/>
									)}

									{food.whereToBuy == '' ? null : (
										<Chip
											// style={{ backgroundColor: 'coral' }}
											// color="secondary"
											className={classes.tagStyle}
											label={food.whereToBuy}
										/>
									)}

									{food.notes == '' ? null : (
										<Chip
											// style={{
											// 	backgroundColor: 'maroon',
											// }}
											className={classes.tagStyle}
											label={food.notes}
										/>
									)}

									<div className="food-image-btn-group">
										<Button
											className={classes.editButton}
											data-tip
											data-for="editTip"
											style={{ color: '#1b2737' }}
											onClick={() => {
												editButtonHandler(
													i,
													food.foodName,
													food.flavor,
													food.type,
													food.wetOrDry,
													food.whereToBuy,
													food.notes
												);
											}}
										>
											<EditIcon />
										</Button>

										<Button
											className={classes.button}
											data-tip
											data-for="deleteTip"
											style={{ color: 'red' }}
											onClick={() => {
												deleteButtonHandler(
													i,
													food.foodName,
													food.flavor,
													food.type,
													food.wetOrDry,
													food.whereToBuy,
													food.notes
												);
											}}
										>
											<DeleteIcon />
										</Button>
									</div>
								</div>
							</div>
							{isEditFood ? (
								<EditDeleteFoodButtonHandler
									isEditFood={isEditFood}
									forceUpdate={props.forceUpdate}
									currentUser={currentUser}
									pet={pet}
									openModal={openModal}
									SetOpenModalToFalse={SetOpenModalToFalse}
									rowData={rowData}
									changeDefaultViewsAndRefresh={
										props.changeDefaultViewsAndRefresh
									}
								/>
							) : null}
							{isDeleteFood ? (
								<EditDeleteFoodButtonHandler
									isDeleteFood={isDeleteFood}
									forceUpdate={props.forceUpdate}
									currentUser={currentUser}
									pet={pet}
									openModal={openModal}
									SetOpenModalToFalse={SetOpenModalToFalse}
									rowData={rowData}
									changeDefaultViewsAndRefresh={
										props.changeDefaultViewsAndRefresh
									}
								/>
							) : null}
						</Paper>
					))}
				</Grid>
			</Grid>
		</div>
	);
}
