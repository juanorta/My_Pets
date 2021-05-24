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
import { getWeightsByPet } from '../../../../util/APIUtils';

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
	const [sortedWeights, setSortedWeights] = useState('');
	const [loading, setLoading] = useState(true);
	const [value, setValue] = useState(0);

	useEffect(() => {
		fetchWeights();
	}, [value]);

	const fetchWeights = () => {
		getWeightsByPet(currentUser.id, pet.id)
			.then((response) => {
				sortWeights(response);
			})
			.catch((error) => {});
	};

	const sortWeights = (weights) => {
		let sortedWeightsArray = [];

		for (var i = 0; i < weights.length; i++) {
			sortedWeightsArray[i] = weights[i];
		}

		sortedWeightsArray.sort(function compare(a, b) {
			var dateA = new Date(a.dateWeighed);
			var dateB = new Date(b.dateWeighed);
			return dateA - dateB;
		});
		setSortedWeights(sortedWeightsArray);
		setLoading(false);
	};

	const ReloadComponent = () => {
		setValue(value + 1);
		setLoading(true);
	};

	const graphViewHandler = () => {
		setTableViewSelected(false);
		setGraphViewSelected(true);
		setGraphStyle(classes.GraphViewSelected);
		setTableStyle(classes.TableView);
	};
	const tableViewHandler = () => {
		setGraphViewSelected(false);
		setTableViewSelected(true);
		setTableStyle(classes.TableViewSelected);
		setGraphStyle(classes.GraphView);
	};

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

			{loading ? (
				<h2 className="loading">Loading Weights...</h2>
			) : (
				<div>
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
							ReloadComponent={ReloadComponent}
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
			)}
		</div>
	);
}
