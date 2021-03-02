import React, { useState } from 'react';
import './Greeting.css';

export default function Greeting(props) {
	console.log(props.currentUser);
	return (
		<div className="greeting-main-container">
			<h1>Hi {props.currentUser.name}, welcome back!</h1>{' '}
		</div>
	);
}
