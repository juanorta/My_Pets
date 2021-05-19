import React, { useEffect, useState } from 'react';
import './Weights.css';
import './Weights.css';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import WeightsGraph from './WeightsGraph/WeightsGraph';
import WeightsTable from './WeightsTable/WeightsTable';

const useStyles = makeStyles((theme) => ({
	GraphView: {
		color: '#1b2737',
	},
	GraphViewSelected: {
		borderBottom: '3px solid #ff4f00',
	},
	TableView: {
		color: '#1b2737',
	},

	TableViewSelected: {
		borderBottom: '3px solid #ff4f00',
	},
}));

export default function Weights(props) {
	const classes = useStyles();

	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [graphViewSelected, setGraphViewSelected] = useState(true);
	const [tableViewSelected, setTableViewSelected] = useState(false);
	const [graphStyle, setGraphStyle] = useState(classes.GraphViewSelected);
	const [tableStyle, setTableStyle] = useState(classes.TableView);

	const graphViewHandler = () => {
		// console.log('graph view clicked');
		setTableViewSelected(false);
		setGraphViewSelected(true);
		setGraphStyle(classes.GraphViewSelected);
		setTableStyle(classes.TableView);
	};
	const tableViewHandler = () => {
		// console.log('table view clicked');
		setGraphViewSelected(false);
		setTableViewSelected(true);
		setTableStyle(classes.TableViewSelected);
		setGraphStyle(classes.GraphView);
	};

	let sortedWeights = [];

	for (var i = 0; i < pet.weights.length; i++) {
		sortedWeights[i] = pet.weights[i];
	}

	sortedWeights.sort(function compare(a, b) {
		var dateA = new Date(a.dateWeighed);
		var dateB = new Date(b.dateWeighed);
		return dateA - dateB;
	});

	// console.log('sorted weights');
	// console.log(sortedWeights);
	// console.log(pet.weights);
	return (
		<div className="appointments-profile-main-container">
			<div className="appointments-title">
				<h1>Weights</h1>
				<ul className="view-selector-group">
					<li className={graphStyle} onClick={graphViewHandler}>
						<h2 style={{ fontWeight: '500' }}>Graph View</h2>
					</li>
					<li className={tableStyle} onClick={tableViewHandler}>
						<h2 style={{ fontWeight: '500' }}>Table View</h2>
					</li>
				</ul>
			</div>
			{graphViewSelected ? (
				<WeightsGraph
					pet={pet}
					currentUser={currentUser}
					forceUpdate={props.forceUpdate}
					sortedWeights={sortedWeights}
					defaultViewHandler={props.defaultViewHandler}
				/>
			) : null}
			{tableViewSelected ? (
				<WeightsTable
					ReloadPet={props.ReloadPet}
					pet={pet}
					currentUser={currentUser}
					forceUpdate={props.forceUpdate}
					sortedWeights={sortedWeights}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}
		</div>
	);
}
