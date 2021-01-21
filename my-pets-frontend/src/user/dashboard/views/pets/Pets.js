import React, { Component } from 'react';
import './Pets.css';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';

export default function Pets(props) {
	return (
		<div className="pets-main-container" id="pets">
			<div className="title">
				<h1>My Pets</h1>
			</div>
		</div>
	);
}
