import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index';

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
