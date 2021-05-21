import React, { Component, useEffect, useState } from 'react';
import './Pets.css';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import PetList from './PetList/PetList';
import { getAllAppointments, getAllPets } from '../../../../util/APIUtils';

export default function Pets(props) {
	const [loading, setLoading] = useState(true);
	const [pets, setPets] = useState('');

	// var obj = {
	// 	54: 'hey',
	// 	46: 'yooo',
	// 	23: 'ok',
	// };

	// console.log(obj[46]);

	useEffect(() => {
		getAllPets(props.currentUser.id)
			.then((response) => {
				// console.log('ALL PETS');
				// console.log(response);
				props.getPetPics(response);
				setPets(response);
				setLoading(false);
			})
			.catch((error) => {});
	}, []);

	const savePictures = (response) => {
		let petPictures = [];
		let obj = {};
		for (var i = 0; i < response.length; i++) {
			// console.log(response[i].petImage.data);
			obj.id = response[i].id;
			obj.data = response[i].petImage.data;
		}

		console.log('pet pics');
		console.log(obj);
	};

	// console.log(props);
	return (
		<div className="pets-main-container" id="pets">
			<div className="title">
				<h1>Pets</h1>
			</div>
			<div className="table-container">
				{loading ? (
					<div style={{ marginLeft: '1rem' }}>
						<h2>Loading Pets...</h2>
						<h2>Loading Appointments...</h2>
						<h2>Loading Preventatives...</h2>
						<h2>Loading Medications...</h2>
						<h2>Loading Veterinarians...</h2>
					</div>
				) : (
					<PetList
						forceUpdate={props.forceUpdate}
						currentUser={props.currentUser}
						pets={pets}
					/>
				)}
			</div>
		</div>
	);
}
