import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index';
import Alert from 'react-s-alert';
import AddFoodForm from '../user/dashboard/AddPet/form/AddFoodForm/AddFoodForm';
// import React, { useState } from 'react';

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

export function login(loginRequest) {
	return request({
		url: API_BASE_URL + '/auth/login',
		method: 'POST',
		body: JSON.stringify(loginRequest),
	});
}

export function signup(signupRequest) {
	console.log('sign up');
	console.log(signupRequest);
	return request({
		url: API_BASE_URL + '/auth/signup',
		method: 'POST',
		body: JSON.stringify(signupRequest),
	});
}

export async function addPet(id, age, breed, name, type, sex) {
	let token = localStorage.getItem(ACCESS_TOKEN);
	console.log(token);
	console.log('add pet function called');
	console.log(id);
	console.log(age);
	console.log(breed);
	console.log(name);
	console.log(type);
	console.log(sex);
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
	console.log('edit function called');

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
	// console.log(token);
	console.log('delete pet function called');
	console.log('id: ' + id + ' petId: ' + petId);
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
	console.log(token);

	console.log('get pet function called');

	return request({
		url: API_BASE_URL + `/users/${id}/pets/${petId}`,
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
	notes
) {
	let token = localStorage.getItem(ACCESS_TOKEN);
	console.log(token);
	console.log('add appointment called');

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
	notes
) {
	let token = localStorage.getItem(ACCESS_TOKEN);
	console.log('edit appointment function called');

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
			}),
		}
	);
}

export async function deleteAppointment(id, petId, apptId) {
	let token = localStorage.getItem(ACCESS_TOKEN);
	// console.log(token);
	console.log('delete appointment function called');
	console.log('id: ' + id + ' petId: ' + petId + ' apptId: ' + apptId);
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

export async function addWeight(
	id,
	petId,
	weightValue,
	unit,
	selectedDate,
	lastWeightValue,
	lastDateWeighed,
	weightChange,
	notes
) {
	let token = localStorage.getItem(ACCESS_TOKEN);
	console.log('add appointment called');

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
			lastWeightValue: lastWeightValue,
			lastDateWeighed: lastDateWeighed,
			weightChange: weightChange,
			notes: notes,
		}),
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
