import React, { Component, useEffect } from 'react';
import './Home.css';
import Grid from '@material-ui/core/Grid';
import { Link, NavLink } from 'react-router-dom';
// import banner from '../common/svg/banner.svg';
import dog from '../common/svg/dog.svg';
import Dog from '../common/svg/dogSVG';
import paw from '../common/svg/paw.svg';
import DogAnimation from '../common/animations/dog/dogAnimation';
import ScaleAnimation from '../common/animations/scale/scale';
import VaccineAnimation from '../common/animations/vaccine/vaccineAnimation';
import VetAnimation from '../common/animations/vet/vetAnimation';
import FoodAnimation from '../common/animations/food/foodAnimation';
import MedicineAnimation from '../common/animations/medicine/medicine';
import MarkerAnimation from '../common/animations/marker/markerAnimation';
import ReactDOM from 'react-dom';
import Zoom from 'react-reveal/Zoom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		background: '#FF6019',
		borderRadius: 3,
		border: 0,
		borderRadius: '25px',
		color: 'white',
		height: 48,
		padding: '0 30px',
		boxShadow: 'none',
		'&:hover': {
			backgroundColor: '#FF6019',
		},
		fontFamily: 'Poppins',
		fontWeight: '600',
	},
}));

function Home() {
	const theme = useTheme();
	const classes = useStyles();

	useEffect(() => {
		Aos.init({ duration: 1250 });
	}, []);

	return (
		<div className="home-main-container" style={{ overflowX: 'hidden' }}>
			{/* banner/intro container */}
			<Grid container className="grid-container-banner">
				<Grid item lg={12} xs={12} className="grid-banner">
					<div className="intro-statement">
						<h1>Your Pet's Information in One Place</h1>
					</div>
					<NavLink
						to="/signup"
						style={{
							textDecoration: 'none',
						}}
					>
						<Button
							classes={{
								root: classes.root,
							}}
						>
							Sign Up
						</Button>
					</NavLink>

					{/* <div className="intro-statement">
							<h1>Your Pet Info in One Place.</h1>
						</div> */}
				</Grid>
			</Grid>
			{/* dog picture container */}
			<div className="dog-svg">
				<img src={dog}></img>
			</div>
			{/* body container */}

			<div className="stripe1"></div>
			<Grid
				container
				className="grid-container-body"
				// style={{ overflowY: 'hidden' }}
				// style={{ overflowX: 'hidden' }}
			>
				<Grid item lg={8} xs={12} className="grid-body">
					{/* <Grid item lg={12} className="grid-whitespace"></Grid> */}
					{/* <div>body</div> */}
					<Grid container className="feature-grid">
						<Grid
							item
							lg={6}
							md={12}
							xs={12}
							className="feature-container"
							data-aos="fade-up"
						>
							<div className="feature-pic">
								{/* <h2>Store as many pets as you want</h2>
									<h3>
										From dogs, cats, fish, we have a spot
										for them{' '}
									
									</h3> */}
								<DogAnimation />
							</div>{' '}
							<div className="feature-description">
								<h2>
									{' '}
									<h2
										style={{
											display: 'inline-block',
											color: '#FF6019',
										}}
									>
										{' '}
										|{' '}
									</h2>{' '}
									What is My Pets?
								</h2>
								<h3>
									My Pets is an all in one pet manager
									dedicated
								</h3>
								<h3>
									to help easily manage your furry friends.
									From{' '}
								</h3>
								<h3>
									dogs, cats, guinea pigs, you will be able to
									create
								</h3>
								<h3>
									a profile and store each pet's vital
									information.
								</h3>
								<h3>
									{' '}
									Track your pet's weight, create a favorite
									foods
								</h3>
								<h3>
									list, view upcoming appointments, find pet-
								</h3>{' '}
								<h3> friendly places and much more!</h3>
							</div>
						</Grid>

						<Grid
							item
							lg={6}
							md={12}
							xs={12}
							className="feature-container"
							data-aos="fade-up"
						>
							<div className="feature-pic">
								{/* <h2>Store as many pets as you want</h2>
									<h3>
										From dogs, cats, fish, we have a spot
										for them{' '}
									
									</h3> */}
								<ScaleAnimation />
							</div>{' '}
							<div className="feature-description">
								<h2>
									{' '}
									<h2
										style={{
											display: 'inline-block',
											color: '#FF6019',
										}}
									>
										{' '}
										|{' '}
									</h2>{' '}
									Keep track of each pet's weight
								</h2>
								<h3>Let's keep your family healthy. Store</h3>
								<h3>your pet's weight and view a detailed</h3>
								<h3>
									chart. Keeping your pet at a healthy weight
								</h3>
								<h3>
									is an investment in their long-term health.
								</h3>
							</div>
						</Grid>
						{/* <Grid
								item
								lg={12}
								className="grid-whitespace"
							></Grid> */}
						<Grid
							item
							lg={6}
							md={12}
							xs={12}
							className="feature-container second-row"
							data-aos="fade-up"
						>
							<div className="feature-pic">
								{/* <h2>Store as many pets as you want</h2>
									<h3>
										From dogs, cats, fish, we have a spot
										for them{' '}
									
									</h3> */}
								<VaccineAnimation />
							</div>{' '}
							<div className="feature-description">
								<h2>
									{' '}
									<h2
										style={{
											display: 'inline-block',
											color: '#FF6019',
										}}
									>
										{' '}
										|{' '}
									</h2>{' '}
									Stay up to date on vaccinations
								</h2>
								<h3>Whether you have 4 pets, or just one, </h3>
								<h3>we know how easy it is to forget</h3>
								<h3>a vaccination appointment.</h3>
							</div>
						</Grid>
						<Grid
							item
							lg={6}
							md={12}
							xs={12}
							className="feature-container second-row"
							data-aos="fade-up"
						>
							<div className="feature-pic">
								{/* <h2>Store as many pets as you want</h2>
									<h3>
										From dogs, cats, fish, we have a spot
										for them{' '}
									
									</h3> */}
								<FoodAnimation />
							</div>{' '}
							<div className="feature-description">
								<h2>
									{' '}
									<h2
										style={{
											display: 'inline-block',
											color: '#FF6019',
										}}
									>
										{' '}
										|{' '}
									</h2>{' '}
									Store your pet's favorite food
								</h2>
								<h3>
									Are you sending a relative to the store and
								</h3>
								<h3>
									telling them to get cat food and treats?
								</h3>
								<h3>
									Share your pet's favorite food and treats
									with
								</h3>
								<h3>
									others to make sure they get the right kind
								</h3>
							</div>
						</Grid>
						<Grid
							item
							lg={6}
							md={12}
							xs={12}
							className="feature-container second-row"
							data-aos="fade-up"
						>
							<div className="feature-pic">
								{/* <h2>Store as many pets as you want</h2>
									<h3>
										From dogs, cats, fish, we have a spot
										for them{' '}
									
									</h3> */}
								<MedicineAnimation />
							</div>{' '}
							<div className="feature-description">
								<h2>
									{' '}
									<h2
										style={{
											display: 'inline-block',
											color: '#FF6019',
										}}
									>
										{' '}
										|{' '}
									</h2>{' '}
									Never miss a dose of medicine
								</h2>
								<h3>Store all dosage information. Share</h3>
								<h3>this information with dog sitters to</h3>
								<h3>ensure your pets are staying healthy.</h3>
							</div>
						</Grid>
						<Grid
							item
							lg={6}
							md={12}
							xs={12}
							className="feature-container second-row"
							data-aos="fade-up"
						>
							<div className="feature-pic">
								{/* <h2>Store as many pets as you want</h2>
									<h3>
										From dogs, cats, fish, we have a spot
										for them{' '}
									
									</h3> */}
								<MarkerAnimation />
							</div>{' '}
							<div className="feature-description">
								<h2>
									{' '}
									<h2
										style={{
											display: 'inline-block',
											color: '#FF6019',
										}}
									>
										{' '}
										|{' '}
									</h2>{' '}
									Find nearby stores, vets, and dog parks
								</h2>
								<h3>
									View a map that shows all nearby
									pet-friendly
								</h3>
								<h3>services near you!</h3>
							</div>
						</Grid>
					</Grid>
				</Grid>
				<div className="stripe2"></div>
			</Grid>

			<div className="get-started-container">
				<div className="get-started">
					<h1>Ready to get started?</h1>
					<h2>
						Create an account with either your Google, Facebook, or
						Github account and try it out now. Your pets will thank
						you
					</h2>{' '}
					<NavLink
						to="/signup"
						style={{
							textDecoration: 'none',
						}}
					>
						<Button
							classes={{
								root: classes.root,
							}}
						>
							Sign Up
						</Button>
					</NavLink>
				</div>
			</div>
			<div className="footer">
				<div className="footer-content">
					<h3> © Copyright 2021 Juan Orta. All rights reserved.</h3>
				</div>
			</div>

			{/* <div className="whitespace2">white</div> */}
		</div>
	);
}

export default Home;
