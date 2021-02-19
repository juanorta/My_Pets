import React, { useState, useEffect } from 'react';
import './WeightsGraph.css';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

export default function WeightsGraph(props) {
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [sortedWeights, setSortedWeights] = useState(props.sortedWeights);

	//holds an array of weight objects
	// let weightObject = [];

	//wil be used
	let dates = [];
	let weightValues = [];
	// console.log(pet.weights);

	// for (var i = 0; i < pet.weights.length; i++) {
	// 	weightObject[i] = pet.weights[i];
	// }

	// weightObject.sort(function compare(a, b) {
	// 	var dateA = new Date(a.dateWeighed);
	// 	var dateB = new Date(b.dateWeighed);
	// 	return dateA - dateB;
	// });
	// console.log(pet.weights);
	// console.log(weightObject);

	for (var i = 0; i < sortedWeights.length; i++) {
		let date = moment(sortedWeights[i].dateWeighed).format('MM/DD/YYYY');
		dates[i] = date;
		// console.log(date);
		weightValues[i] = sortedWeights[i].weightValue;
	}

	// console.log(weightObject);
	// console.log(pet.weights);

	const data = {
		labels: dates,
		datasets: [
			{
				label: pet.petName,
				fill: false,
				lineTension: 0,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: '#ff4f00',
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
						scale.height = 80; //<-- set value as you wish
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

	// console.log('weights graph');
	// console.log(props.currentUser);
	// console.log(props.pet);
	return (
		<div className="weights-graph-main-container">
			{/* <h1>Weights Graph</h1> */}
			<Line data={data} options={options} />
		</div>
	);
}
