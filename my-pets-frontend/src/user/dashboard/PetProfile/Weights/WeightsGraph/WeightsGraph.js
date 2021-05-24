import React, { useState, useEffect, useReducer, useRef } from 'react';
import './WeightsGraph.css';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import ChartJs from 'chart.js';

export default function WeightsGraph(props) {
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState('');
	const [sortedWeights, setSortedWeights] = useState(props.sortedWeights);
	const chartContainer = useRef(null);
	const [chartInstance, setChartInstance] = useState(null);
	const [, forceUpdate] = useReducer((x) => x + 1, 0);
	const [label, setLabel] = useState('');
	const [dates, setDates] = useState('');
	const [weightValues, setWeightValues] = useState('');
	const [chartStyle, setChartStyle] = useState(
		'weights-graph-main-container'
	);

	//will re-mount when props.sortedWeights is changed
	//can receive data from PetProfile or Dashboard/Weights
	//assigns values to initially empty 'pet', 'dates', and 'weightValues' hooks.
	//those values are then used to populate chart
	useEffect(() => {
		let dates = [];
		let weightValues = [];

		for (var i = 0; i < props.sortedWeights.length; i++) {
			let date = moment(props.sortedWeights[i].dateWeighed).format(
				'MM/DD/YYYY'
			);
			dates[i] = date;
			weightValues[i] = props.sortedWeights[i].weightValue;
		}

		if (props.isDashboardWeight) {
			setChartStyle('dashboard-graph-main-container');
		}
		setPet(props.pet);
		setDates(dates);
		setWeightValues(weightValues);
	}, [props.sortedWeights]);

	const data = {
		labels: dates,
		datasets: [
			{
				label: pet.petName,
				fill: false,
				lineTension: 0,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'teal',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: weightValues,
			},
		],
	};

	const options = {
		// responsive: false,
		maintainAspectRatio: false,
		scales: {
			yAxes: [
				{
					ticks: {
						fontColor: '#1b2737',
						fontSize: 14,
					},
					display: true,
					afterFit: function (scale) {
						scale.width = 80; //<-- set value as you wish
					},
					scaleLabel: {
						display: true,
						labelString: 'Weight (lbs) ',
						fontSize: 18,
						fontColor: '#1b2737',
						fontStyle: 'bold',
					},
				},
			],
			xAxes: [
				{
					ticks: {
						fontColor: '#1b2737',
						fontSize: 14,
					},
					// gridLines: {
					// 	display: true,
					// 	color: '#727272',
					// },
					display: true,
					afterFit: function (scale) {
						scale.height = 100; //<-- set value as you wish
					},
					scaleLabel: {
						display: true,
						labelString: 'Dates',
						fontSize: 18,
						fontColor: '#1b2737',
						fontStyle: 'bold',
					},
				},
			],
		},
		legend: {
			display: true,
			labels: {
				fontSize: 15,
				fontColor: '#1b2737',
			},
		},
	};

	return (
		<div className={chartStyle}>
			{/* <h1>Weights Graph</h1> */}
			<Line
				data={data}
				options={options}
				redraw={true}
				// key={Date.now(0)}
				ref={chartContainer}
			/>
		</div>
	);
}
