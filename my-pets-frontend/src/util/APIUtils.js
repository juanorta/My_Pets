import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index';
import Alert from 'react-s-alert';
import AddFoodForm from '../user/dashboard/AddPet/form/AddFoodForm/AddFoodForm';
// import React, { useState } from 'react';
import axios from 'axios';
import { fil } from 'date-fns/locale';

const currentUser = '';

const request = (options) => {
	const headers = new Headers({
		'Content-Type': 'application/json',
	});

	if (localStorage.getItem(ACCESS_TOKEN)) {
		headers.append(
			'Authorization',
			'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
		);
	}

	const defaults = { headers: headers };
	options = Object.assign({}, defaults, options);
	return fetch(options.url, options).then((response) =>
		response.json().then((json) => {
			if (!response.ok) {
				return Promise.reject(json);
			}
			return json;
		})
	);
};

export function getCurrentUser() {
	if (!localStorage.getItem(ACCESS_TOKEN)) {
		return Promise.reject('No access token set.');
	}

	return request({
		url: API_BASE_URL + '/user/me',
		method: 'GET',
	});
}

//USER ENDPOINTS
export function getAllPets(id) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/pets`,
		method: 'GET',
	});
}

export function getAllPetsWithoutPictures(id) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/pets/noPictures`,
		method: 'GET',
	});
}

export function getAllPetsWithWeights(id) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/pets/withWeights`,
		method: 'GET',
	});
}

export function getAllFood(id) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/food`,
		method: 'GET',
	});
}

export function getFoodAmount(id) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/foodAmount`,
		method: 'GET',
	});
}

export function getAllPetsWithWFood(id) {
	let token = localStorage.getItem(ACCESS_TOKEN);
	return request({
		url: API_BASE_URL + `/users/${id}/pets/withFood`,
		method: 'GET',
	});
}

export function getAllPreventatives(id) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/preventatives`,
		method: 'GET',
	});
}

export function getAllMedications(id) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/medications`,
		method: 'GET',
	});
}

export function getAllVets(id) {
	let token = localStorage.getItem(ACCESS_TOKEN);
	return request({
		url: API_BASE_URL + `/users/${id}/vets`,
		method: 'GET',
	});
}

//INDIVIDUAL PET ENDPOINTS
export async function addPet(id, age, breed, name, type, sex) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(API_BASE_URL + `/users/${id}/addPet`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			age: age,
			breed: breed,
			petName: name,
			petType: type,
			sex: sex,
		}),
	});
}

export async function editPet(id, petId, petName, petType, breed, sex, age) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(API_BASE_URL + `/users/${id}/pets/update`, {
		method: 'PUT',
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id: petId,
			age: age,
			breed: breed,
			petName: petName,
			petType: petType,
			sex: sex,
		}),
	});
}

export async function deletePet(id, petId) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(API_BASE_URL + `/users/${id}/pets/${petId}`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
}

export function getPet(id, petId) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/pets/${petId}`,
		method: 'GET',
	});
}

export function getPetWithoutPictureWithFood(id, petId) {
	let token = localStorage.getItem(ACCESS_TOKEN);
	return request({
		url: API_BASE_URL + `/users/${id}/pets/${petId}/noPicture/withFood`,
		method: 'GET',
	});
}

//APPOINTMENT ENDPOINTS
export function getAppointmentsByPet(id, petId) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/pets/${petId}/appointments`,
		method: 'GET',
	});
}

export async function addAppointment(
	id,
	petId,
	date,
	time,
	amOrPm,
	type,
	reason,
	vetOrGroomerName,
	notes,
	petName,
	petAptId
) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(API_BASE_URL + `/users/${id}/pets/${petId}/addAppointment`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			date: date,
			time: time,
			amOrPm: amOrPm,
			type: type,
			vetOrGroomerName: vetOrGroomerName,
			reason: reason,
			notes: notes,
			petName: petName,
			petAptId: petAptId,
		}),
	});
}

export async function editAppointment(
	id,
	petId,
	apptId,
	date,
	time,
	amOrPm,
	type,
	reason,
	vetOrGroomerName,
	notes,
	petName,
	petAptId
) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(
		API_BASE_URL +
			`/users/${id}/pets/${petId}/appointments/${apptId}/update`,
		{
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + token,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: apptId,
				date: date,
				time: time,
				amOrPm: amOrPm,
				type: type,
				vetOrGroomerName: vetOrGroomerName,
				reason: reason,
				notes: notes,
				petName: petName,
				petAptId: petAptId,
			}),
		}
	).then((response) => {});
}

export async function deleteAppointment(id, petId, apptId) {
	let token = localStorage.getItem(ACCESS_TOKEN);
	await fetch(
		API_BASE_URL + `/users/${id}/pets/${petId}/appointments/${apptId}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + token,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}
	);
}

//create add weight, add food
//WEIGHT ENDPOINTS

export function getWeightsByPet(id, petId) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/pets/${petId}/weights`,
		method: 'GET',
	});
}

export async function addWeight(
	id,
	petId,
	weightValue,
	unit,
	selectedDate,
	notes,
	petName,
	petWeightId
) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(API_BASE_URL + `/users/${id}/pets/${petId}/addWeight`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			weightValue: weightValue,
			unit: unit,
			dateWeighed: selectedDate,
			notes: notes,
			petName: petName,
			petWeightId: petWeightId,
		}),
	});
}

export async function editWeight(
	id,
	petId,
	weightId,
	weightValue,
	unit,
	selectedDate,
	notes,
	petName,
	petWeightId
) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(
		API_BASE_URL + `/users/${id}/pets/${petId}/weights/${weightId}/update`,
		{
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + token,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: weightId,
				weightValue: weightValue,
				unit: unit,
				dateWeighed: selectedDate,
				notes: notes,
				petName: petName,
				petWeightId: petWeightId,
			}),
		}
	);
}

export async function deleteWeight(id, petId, weightId) {
	let token = localStorage.getItem(ACCESS_TOKEN);
	await fetch(
		API_BASE_URL + `/users/${id}/pets/${petId}/weights/${weightId}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + token,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}
	);
}

//FOOD ENDPOINTS
export function getFoodByPet(id, petId) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/pets/${petId}/food`,
		method: 'GET',
	});
}

export async function addFood(
	id,
	petId,
	foodName,
	type,
	wetOrDry,
	flavor,
	whereToBuy,
	notes
) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(API_BASE_URL + `/users/${id}/pets/${petId}/addFood`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			foodName: foodName,
			type: type,
			wetOrDry: wetOrDry,
			flavor: flavor,
			whereToBuy: whereToBuy,
			notes: notes,
		}),
	});
}

export async function editFood(
	id,
	petId,
	foodId,
	foodName,
	type,
	wetOrDry,
	flavor,
	whereToBuy,
	notes
) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(
		API_BASE_URL + `/users/${id}/pets/${petId}/food/${foodId}/update`,
		{
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + token,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: foodId,
				foodName: foodName,
				type: type,
				wetOrDry: wetOrDry,
				flavor: flavor,
				whereToBuy: whereToBuy,
				notes: notes,
			}),
		}
	);
}

export async function deleteFood(id, petId, foodId) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(API_BASE_URL + `/users/${id}/pets/${petId}/food/${foodId}`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
}

export function getAllAppointments(id) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/appointments`,
		method: 'GET',
	});
}

export function getAllWeights(id) {
	let token = localStorage.getItem(ACCESS_TOKEN);
	return request({
		url: API_BASE_URL + `/users/${id}/weights`,
		method: 'GET',
	});
}

//PET IMAGE ENDPOINTS
// export function getImage(id, petId)
export async function addPetImage(id, petId, file) {
	let token = localStorage.getItem(ACCESS_TOKEN);
	const formData = new FormData();
	formData.append('file', file);
	for (var pair of formData.entries()) {
	}

	const response = await fetch(
		API_BASE_URL + `/users/${id}/pets/${petId}/uploadImage`,
		{
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + token,
				// 'Content-Type': 'multipart/form-data',
			},
			body: formData,
		}
	);
}

export async function editPetImage(id, petId, imageId, file) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	const formData = new FormData();
	formData.append('file', file);

	for (var pair of formData.entries()) {
	}

	const response = await fetch(
		API_BASE_URL + `/users/${id}/pets/${petId}/petImages/${imageId}/update`,
		{
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + token,
				// 'Content-Type': 'multipart/form-data',
			},
			body: formData,
		}
	);
}

//FOOD IMAGE ENDPOINTS
export async function addFoodImage(id, petId, foodId, file) {
	let token = localStorage.getItem(ACCESS_TOKEN);
	const formData = new FormData();
	formData.append('file', file);
	for (var pair of formData.entries()) {
	}

	const response = await fetch(
		API_BASE_URL + `/users/${id}/pets/${petId}/food/${foodId}/uploadImage`,
		{
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + token,
				// 'Content-Type': 'multipart/form-data',
			},
			body: formData,
		}
	);
}

export async function editFoodImage(id, petId, foodId, imageId, file) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	const formData = new FormData();
	formData.append('file', file);

	for (var pair of formData.entries()) {
	}

	const response = await fetch(
		API_BASE_URL +
			`/users/${id}/pets/${petId}/food/${foodId}/foodImage/${imageId}/update`,
		{
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + token,
				// 'Content-Type': 'multipart/form-data',
			},
			body: formData,
		}
	);
}

//PREVENTATIVE ENDPOINTS
export function getPreventativesByPet(id, petId) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/pets/${petId}/preventatives`,
		method: 'GET',
	});
}

export async function addPreventative(
	id,
	petId,
	name,
	type,
	lastGiven,
	dueNext,
	notes,
	petName,
	petPreventativeId
) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(API_BASE_URL + `/users/${id}/pets/${petId}/addPreventative`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: name,
			type: type,
			lastGiven: lastGiven,
			dueNext: dueNext,
			notes: notes,
			petName: petName,
			petPreventativeId: petPreventativeId,
		}),
	});
}

export async function editPreventative(
	id,
	petId,
	prevId,
	name,
	type,
	lastGiven,
	dueNext,
	notes,
	petName,
	petPreventativeId
) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(
		API_BASE_URL +
			`/users/${id}/pets/${petId}/preventatives/${prevId}/update`,
		{
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + token,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: prevId,
				name: name,
				type: type,
				lastGiven: lastGiven,
				dueNext: dueNext,
				notes: notes,
				petName: petName,
				petPreventativeId: petPreventativeId,
			}),
		}
	);
}

export async function deletePreventative(id, petId, prevId) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(
		API_BASE_URL + `/users/${id}/pets/${petId}/preventatives/${prevId}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + token,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}
	);
}

//MEDICATION ENDPOINTS
export function getMedicationsByPet(id, petId) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/pets/${petId}/medications`,
		method: 'GET',
	});
}

export async function addMedication(
	id,
	petId,
	medicationName,
	startDate,
	endDate,
	dosageInstructions,
	petName,
	petMedId
) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(API_BASE_URL + `/users/${id}/pets/${petId}/addMedication`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			medicationName: medicationName,
			startDate: startDate,
			endDate: endDate,
			dosageInstructions: dosageInstructions,
			petName: petName,
			petMedId: petMedId,
		}),
	});
}

export async function editMedication(
	id,
	petId,
	medId,
	medicationName,
	startDate,
	endDate,
	dosageInstructions,
	petName,
	petMedId
) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(
		API_BASE_URL + `/users/${id}/pets/${petId}/medications/${medId}/update`,
		{
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + token,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: medId,
				medicationName: medicationName,
				startDate: startDate,
				endDate: endDate,
				dosageInstructions: dosageInstructions,
				petName: petName,
				petMedId: petMedId,
			}),
		}
	);
}

export async function deleteMedication(id, petId, medId) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(API_BASE_URL + `/users/${id}/pets/${petId}/meds/${medId}`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
}

//VETERINARIANS ENDPOINTS
export function getVetsByPet(id, petId) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	return request({
		url: API_BASE_URL + `/users/${id}/pets/${petId}/vets`,
		method: 'GET',
	});
}

export async function addVet(
	id,
	petId,
	vetName,
	phoneNumber,
	location,
	notes,
	petName,
	petVetId
) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(API_BASE_URL + `/users/${id}/pets/${petId}/addVet`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			vetName: vetName,
			phoneNumber: phoneNumber,
			location: location,
			notes: notes,
			petName: petName,
			petVetId: petVetId,
		}),
	});
}

export async function editVet(
	id,
	petId,
	vetId,
	vetName,
	phoneNumber,
	location,
	notes,
	petName,
	petVetId
) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(
		API_BASE_URL + `/users/${id}/pets/${petId}/vets/${vetId}/update`,
		{
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + token,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: vetId,
				vetName: vetName,
				phoneNumber: phoneNumber,
				location: location,
				notes: notes,
				petName: petName,
				petVetId: petVetId,
			}),
		}
	);
}

export async function deleteVet(id, petId, vetId) {
	let token = localStorage.getItem(ACCESS_TOKEN);

	await fetch(API_BASE_URL + `/users/${id}/pets/${petId}/vets/${vetId}`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + token,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
}
