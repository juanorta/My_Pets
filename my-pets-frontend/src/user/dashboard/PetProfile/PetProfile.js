import React, { useState, useEffect } from 'react';
import './PetProfile.css';
import { getPet, getCurrentUser } from '../../../util/APIUtils';
import LoadingIndicator from '../../../common/LoadingIndicator';

export default function PetProfile(props) {
	const [pet, setPet] = useState(props.location.pet);
	const [petId, setPetId] = useState(props.match.params.petID);
	const [isLoading, setLoading] = useState(true);

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

	// console.log(props.currentUser);
	return (
		<div className="pet-profile-main-container">
			{isLoading ? <LoadingIndicator /> : <h1>{pet.petName}</h1>}
		</div>
	);
}
