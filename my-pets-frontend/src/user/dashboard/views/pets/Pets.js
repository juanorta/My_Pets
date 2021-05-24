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
	const [hasPets, setHasPets] = useState(true);

	useEffect(() => {
		getAllPets(props.currentUser.id)
			.then((response) => {
				if (response < 1) {
					setHasPets(false);
					// setLoading(false);
				} else {
					props.getPetPics(response);
					setPets(response);
					setLoading(false);
				}
			})
			.catch((error) => {});
	}, []);

	const savePictures = (response) => {
		let petPictures = [];
		let obj = {};
		for (var i = 0; i < response.length; i++) {
			obj.id = response[i].id;
			obj.data = response[i].petImage.data;
		}
	};

	return (
		<div className="pets-main-container" id="pets">
			<div className="title">
				{hasPets === false ? <h1></h1> : <h1>Pets</h1>}
			</div>

			{hasPets === false ? (
				<div className="nopets">
					<h2 style={{ display: 'flex' }}>
						Hi there, welcome to MyPetFamily.io!{' '}
						<p style={{ marginTop: '-0rem', marginLeft: '1rem' }}>
							<span>&#128075;&#127997;</span>
						</p>
					</h2>
					<h2>
						This is the main dashboard. Here you will receive a
						high-level overview of all of your pets and their
						appointments, weights, food, preventatives, and
						medications. You can add, edit, and delete a pet
						directly on this page.
					</h2>

					<h2>
						Each pet has their own profile where you can add, edit,
						and delete entries. All entry changes will be reflected
						on this dashboard.
					</h2>
					<h2>Press the + button to get started!</h2>
					<h2 style={{ display: 'flex', fontWeight: '600' }}>
						Made by Juan Orta{' '}
						<p style={{ marginTop: '-0rem', marginLeft: '1rem' }}>
							{' '}
							&#9889;
						</p>
					</h2>
				</div>
			) : (
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
							hasPets={hasPets}
							forceUpdate={props.forceUpdate}
							currentUser={props.currentUser}
							pets={pets}
						/>
					)}
				</div>
			)}
		</div>
	);
}
