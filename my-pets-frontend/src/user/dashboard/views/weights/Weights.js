import React, { Component } from 'react';
import './Weights.css';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import WeightsGraph from '../../PetProfile/Weights/WeightsGraph/WeightsGraph';

export default function Weights(props) {
	return (
		<div className="weights-main-container" id="weights">
			<div className="title">
				<h1 className="weights-title">Weights</h1>
			</div>
		</div>
	);
}
