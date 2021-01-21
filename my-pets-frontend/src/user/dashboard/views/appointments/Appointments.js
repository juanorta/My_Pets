import React, { Component } from 'react';
import './Appointments.css';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';

export default function Appointments(props) {
	return (
		<div className="appointments-main-container" id="appointments">
			<div className="title">
				<h1>Appointments</h1>
			</div>
		</div>
	);
}
