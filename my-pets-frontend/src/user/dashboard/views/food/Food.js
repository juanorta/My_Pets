import React, { useEffect, useState } from 'react';
import { getAllPetsWithWFood } from '../../../../util/APIUtils';
import FoodCards from '../../PetProfile/Food/FoodCards/FoodCards';
import './Food.css';

export default function Food(props) {
	const [cardViewClicked, setCardViewClicked] = useState(true);
	const [tableViewClicked, setTableViewClicked] = useState(false);
	const [petListItemClicked, setPetListItemClicked] = useState('');
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	// const [pets, setPets] = useState(currentUser.pets);
	const [petsWithFood, setPetsWithFood] = useState('');
	const [loading, setLoading] = useState(true);
	const [isDashboard, setIsDashboard] = useState(true);

	// const cardViewHandler = () => {
	// 	setCardViewClicked(true);
	// 	setTableViewClicked(false);
	// };

	// const tableViewHandler = () => {
	// 	setTableViewClicked(true);
	// 	setCardViewClicked(false);
	// };

	useEffect(() => {
		fetchFood();
	}, []);

	const fetchFood = () => {
		getAllPetsWithWFood(currentUser.id)
			.then((response) => {
				// console.log('PETS W/ FOOD');
				// console.log(response);
				sortFood(response);
			})
			.catch((error) => {});
	};

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
			{loading ? null : (
				<ul>
					{/* <li>
						<h2>All</h2>
					</li> */}
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
	);
}
