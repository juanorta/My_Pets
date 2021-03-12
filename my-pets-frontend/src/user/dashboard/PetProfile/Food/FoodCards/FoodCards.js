import React, { useState } from 'react';
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
		marginTop: '2rem',
		marginLeft: '3rem',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5),
		},
	},
	paper: {
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
	paperSmall: {
		height: 280,
		width: 450,
		display: 'inline-block',
		margin: '1rem',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			transform: 'scale(1.05)',
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
		marginLeft: '1rem',
		// height: '1.5rem',
		// width: '1.5rem',
	},
	button: {
		marginLeft: '12.3rem',
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
		marginTop: '4rem',
		marginLeft: '3rem',
		color: '#1b2737',
	},
}));

//displays list of cards with food data
export default function FoodCards(props) {
	const theme = useTheme();
	const classes = useStyles();
	const matches = useMediaQuery(theme.breakpoints.down('xs'));
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [food, setFood] = useState(pet.food);
	console.log(food);

	return (
		<div className="food-cards-main-container">
			<Grid
				container
				justify="center"
				className={classes.root}
				spacing={0}
			>
				<Grid item lg={12} xs={12}>
					{food.map((food) => (
						<Paper
							className={
								matches ? classes.paperSmall : classes.paper
							}
							elevation={10}
						>
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
												// editPetHandler(pet, currentUser);
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
												// deletePetHandler(pet, currentUser);
											}}
										>
											<DeleteIcon />
										</Button>
									</div>
								</div>
							</div>
						</Paper>
					))}
				</Grid>
			</Grid>
		</div>
	);
}
