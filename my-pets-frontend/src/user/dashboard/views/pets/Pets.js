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
	useEffect(() => {
		getAllPets(props.currentUser.id)
			.then((response) => {
				// console.log('ALL PETS');
				setPets(response);
				setLoading(false);
			})
			.catch((error) => {});
	}, []);
	// console.log(props);
	return (
		<div className="pets-main-container" id="pets">
			<div className="title">
				<h1>Pets</h1>
			</div>
			<div className="table-container">
				{loading ? (
					<h2>Loading pets...</h2>
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
