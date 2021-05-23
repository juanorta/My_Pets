import React, { useEffect, useState } from 'react';
import {
	getAllFood,
	getAllPetsWithWFood,
	getFoodAmount,
} from '../../../../util/APIUtils';
import FoodCards from '../../PetProfile/Food/FoodCards/FoodCards';
import './Food.css';

export default function Food(props) {
	const [cardViewClicked, setCardViewClicked] = useState(true);
	const [tableViewClicked, setTableViewClicked] = useState(false);
	const [petListItemClicked, setPetListItemClicked] = useState('');
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [petsWithFood, setPetsWithFood] = useState('');
	const [loading, setLoading] = useState(true);
	const [isDashboard, setIsDashboard] = useState(true);
	const [hasFood, setHasFood] = useState(true);

	//getting all pets and their respective list of food
	useEffect(() => {
		getFoodAmount(currentUser.id)
			.then((response) => {
				if (response < 1) {
					setHasFood(false);
				} else {
					fetchFood();
				}
			})
			.catch((error) => {});
	}, []);

	const fetchFood = () => {
		getAllPetsWithWFood(currentUser.id)
			.then((response) => {
				console.log('PETS W/ FOOD');
				console.log(response);
				sortFood(response);
			})
			.catch((error) => {});
	};

	//keeping only the pets that have a food entry and storing them
	const sortFood = (pets) => {
		let petsWithFood = [];
		var j = 0;
		for (var i = 0; i < pets.length; i++) {
			if (pets[i].food.length != 0) {
				petsWithFood[j] = pets[i];
				j++;
			}
		}
		// console.log(petsWithFood);
		setPetsWithFood(petsWithFood);

		setPetListItemClicked(petsWithFood[0]);
		setLoading(false);
	};

	function listItemHandler(pet) {
		setPetListItemClicked(pet);
	}

	console.log(petsWithFood);
	return (
		<div className="food-main-container" id="food">
			<div className="title">
				<h1>Food</h1>
			</div>

			{hasFood === false ? (
				<div className="nopets">
					<h2>
						No food found. To add a food entry, press the eye icon
						on your pet's card to go to their profile and add food.
					</h2>
				</div>
			) : (
				<div>
					{loading ? null : (
						<ul>
							{petsWithFood.map((pet) => (
								<li
									key={0}
									onClick={() => {
										listItemHandler(pet);
									}}
									style={{
										borderBottom:
											petListItemClicked.id === pet.id
												? '3px solid #ff4f00'
												: null,
									}}
								>
									{' '}
									<h2>{pet.petName}</h2>
								</li>
							))}
						</ul>
					)}

					{loading ? null : (
						<div className="food-dash">
							<FoodCards
								isDashboard={isDashboard}
								forceUpdate={props.forceUpdate}
								currentUser={currentUser}
								pet={petListItemClicked}
								changeDefaultViewsAndRefresh={
									props.changeDefaultViewsAndRefresh
								}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
