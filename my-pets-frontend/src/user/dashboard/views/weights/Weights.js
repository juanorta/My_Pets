import React, { Component, useState, useEffect } from 'react';
import './Weights.css';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import WeightsGraph from '../../PetProfile/Weights/WeightsGraph/WeightsGraph';
import { Line, Scatter } from 'react-chartjs-2';
import moment from 'moment';
import {
	getAllPetsWithWeights,
	getAllWeights,
} from '../../../../util/APIUtils';

export default function Weights(props) {
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	//const [weightObjects, setWeightObjects] = useState(props.weightObjects);
	// const [pets, setPets] = useState(currentUser.pets);
	const [loading, setLoading] = useState(true);
	const [petsWithWeights, setPetsWithWeights] = useState('');
	const [petListItemClicked, setPetListItemClicked] = useState('');
	const [sortedWeights, setSortedWeights] = useState('');
	const [clicked, setClicked] = useState(false);
	const [isDashboardWeight, setIsDashboardWeight] = useState(true);
	const [hasWeights, setHasWeights] = useState(true);
	// console.log(pets);

	//initializes first pet in petsWithWeightsArray as the default selected
	useEffect(() => {
		getAllWeights(currentUser.id)
			.then((response) => {
				if (response.length < 1) {
					setHasWeights(false);
				} else {
					fetchWeights();
				}
			})
			.catch((error) => {});
	}, []);

	const fetchWeights = () => {
		getAllPetsWithWeights(currentUser.id)
			.then((response) => {
				console.log('PETS W/ WEIGHTS');
				console.log(response);
				sortWeights(response);
			})
			.catch((error) => {});
	};

	const sortWeights = (pets) => {
		let petsWithWeightsArray = [];
		let sortedWeights = [];
		var j = 0;
		for (var i = 0; i < pets.length; i++) {
			if (pets[i].weights.length != 0) {
				petsWithWeightsArray[j] = pets[i];
				j++;
			}
		}
		//copying all weights from the first pet object in petsWithWeightsArray
		//to sortedWeights
		for (var i = 0; i < petsWithWeightsArray[0].weights.length; i++) {
			sortedWeights[i] = petsWithWeightsArray[0].weights[i];
		}
		//sorting sortedWeights from least recent to most recent
		sortedWeights.sort(function compare(a, b) {
			var dateA = new Date(a.dateWeighed);
			var dateB = new Date(b.dateWeighed);
			return dateA - dateB;
		});
		//populating hooks with data
		//these will be passed to WeightsGraph component to display chart
		setSortedWeights(sortedWeights);
		setPetsWithWeights(petsWithWeightsArray);
		setLoading(false);
		setPetListItemClicked(petsWithWeightsArray[0]);
	};
	//handles tab click
	function listItemHandler(pet) {
		// console.log(pet);

		//same process as code in useEffect
		let sortedWeights = [];
		for (var i = 0; i < pet.weights.length; i++) {
			sortedWeights[i] = pet.weights[i];
		}

		sortedWeights.sort(function compare(a, b) {
			var dateA = new Date(a.dateWeighed);
			var dateB = new Date(b.dateWeighed);
			return dateA - dateB;
		});

		setSortedWeights(sortedWeights);
		setPetListItemClicked(pet);
		setClicked(true);
	}

	return (
		<div className="weights-main-container" id="weights">
			<div className="title">
				<h1 className="weights-title">Weights</h1>
			</div>
			{/* loading tabs with pets that have weights */}
			{hasWeights === false ? (
				<div className="nopets">
					<h2>
						No weights found. To add a weight entry, press the eye
						icon on your pet's card to go to their profile and add a
						weight.
					</h2>
				</div>
			) : (
				<div>
					{loading ? null : (
						<ul>
							{petsWithWeights.map((pet) => (
								<li
									key={pet.id}
									style={{
										borderBottom:
											petListItemClicked.id === pet.id
												? '3px solid #ff4f00'
												: null,
									}}
									className="pet-with-weight"
									onClick={() => {
										listItemHandler(pet);
									}}
								>
									{' '}
									<h2>{pet.petName}</h2>
								</li>
							))}
						</ul>
					)}

					{loading ? (
						<h2>Loading weights...</h2>
					) : (
						<WeightsGraph
							sortedWeights={sortedWeights}
							pet={petListItemClicked}
							isDashboardWeight={isDashboardWeight}
						/>
					)}

					{/* <Line data={data} options={options} /> */}
				</div>
			)}
		</div>
	);
}
