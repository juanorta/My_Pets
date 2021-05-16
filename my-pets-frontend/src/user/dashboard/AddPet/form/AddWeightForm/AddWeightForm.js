import React, { useState, Fragment, useEffect } from 'react';
import './AddWeightForm.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DatePicker from '@material-ui/pickers/DatePicker';
import Alert from 'react-s-alert';
import { date } from 'date-fns/locale/af';
import moment from 'moment';
import { addAppointment, addWeight } from '../../../../../util/APIUtils';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid none',
		outline: 'none',
		borderRadius: '20px',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		height: '35rem',
		width: '55rem',
	},
	formControl: {
		margin: theme.spacing(2),
		minWidth: 120,
	},
	TextField1: {
		marginLeft: '15%',
		marginBottom: '2rem',
		// marginTop: '1rem',
		width: '19rem',
		'& label.Mui-focused': {
			color: '#1B2737',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#1B2737',
		},
	},

	TextField1Small: {
		marginLeft: '-25%',
		marginBottom: '1rem',
		marginTop: '1rem',
		width: '150%',
		'& label.Mui-focused': {
			color: '#1B2737',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#1B2737',
		},
	},

	Weight: {
		marginLeft: '15%',
		marginBottom: '2rem',
		marginTop: '2rem',
		// marginTop: '1rem',
		width: '6rem',
		'& label.Mui-focused': {
			color: '#1B2737',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#1B2737',
		},
	},

	WeightSmall: {
		marginLeft: '-0%',
		marginBottom: '2rem',
		marginTop: '2rem',
		// marginTop: '1rem',
		width: '50%',
		'& label.Mui-focused': {
			color: '#1B2737',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#1B2737',
		},
	},

	TextField3: {
		marginLeft: '5%',
		// marginTop: '2rem',
		width: '12rem',
		'& label.Mui-focused': {
			color: '#1B2737',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#1B2737',
		},
	},
	TextField3Small: {
		marginLeft: '-25%',
		marginBottom: '1rem',
		marginTop: '1rem',
		width: '100%',
		'& label.Mui-focused': {
			color: '#1B2737',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#1B2737',
		},
	},

	inputLabel: {
		marginTop: '1rem',
		marginLeft: '12%',
	},

	inputLabel1: {
		marginTop: '-1rem',
		// marginTop: '0rem',
		marginLeft: '38%',
	},

	selectDropdown: {
		marginLeft: '38%',

		// marginTop: '-5rem',
		// backgroundColor: 'red',
		// width: 'rem',
	},

	Unit: {
		marginLeft: '1rem',
		marginTop: '2rem',
	},

	birthday: {
		marginLeft: '15%',
		// marginTop: '2rem',
		width: '18rem',
	},

	cancelButton: {
		backgroundColor: '#1B2737',
		color: 'white',
		marginLeft: '3rem',
		fontFamily: 'Poppins',
		'&:hover': {
			backgroundColor: '#1B2737',
		},
		width: '5rem',
	},

	cancelButtonSmall: {
		backgroundColor: '#1B2737',
		color: 'white',
		marginRight: '1.5rem',
		// marginLeft: '3rem',
		fontFamily: 'Poppins',
		'&:hover': {
			backgroundColor: '#1B2737',
		},
		width: '5rem',
	},

	submitButton: {
		backgroundColor: '#FF4F00',
		color: 'white',
		marginLeft: '3rem',
		fontFamily: 'Poppins',
		'&:hover': {
			backgroundColor: '#FF4F00',
		},

		width: '5rem',
	},

	submitButtonSmall: {
		backgroundColor: '#FF4F00',
		color: 'white',
		marginLeft: '3rem',
		fontFamily: 'Poppins',
		'&:hover': {
			backgroundColor: '#FF4F00',
		},

		width: '5rem',
		// marginTop: '-3rem',
	},
}));

//form used to add a pet

export default function AddWeightForm(props) {
	const classes = useStyles();
	const theme = useTheme();

	//stores information as user is typing
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [selectedDate, setSelectedDate] = useState(new Date());
	// const [dateWeighed, setDateWeighed] = useState(new Date());
	const [weightValue, setWeightValue] = useState(0.0);
	const [unit, setUnit] = useState('lbs');
	const [notes, setNotes] = useState('');
	const small = useMediaQuery(theme.breakpoints.down('sm'));

	// const [dateChanged, setDateChanged] = useState(false);
	// const [lastDateWeighed, setLastWeightDate] = useState('');
	// const [lastWeightValue, setLastWeightValue] = useState(0);

	let Weight = classes.Weight;
	let Textfield1 = classes.TextField1;
	let cancelButton = classes.cancelButton;
	let submitButton = classes.submitButton;

	if (small) {
		Weight = classes.WeightSmall;
		Textfield1 = classes.TextField1Small;
		cancelButton = classes.cancelButtonSmall;
		submitButton = classes.submitButtonSmall;
	}

	//accesses last weight record and stores it for later use
	// const [lastDateWeighed, setLastWeightDate] = useState(
	// 	pet.weights[pet.weights.length - 1].dateWeighed
	// );
	// const [lastWeightValue, setLastWeightValue] = useState(
	// 	pet.weights[pet.weights.length - 1].weightValue
	// );
	// const [weightChange, setWeightChange] = useState(0);

	let sortedWeights = [];

	for (var i = 0; i < pet.weights.length; i++) {
		sortedWeights[i] = pet.weights[i];
	}

	sortedWeights.sort(function compare(a, b) {
		var dateA = new Date(a.dateWeighed);
		var dateB = new Date(b.dateWeighed);
		return dateA - dateB;
	});

	console.log('sorted weights');
	console.log(sortedWeights);
	console.log(pet.weights);
	// useEffect(() => {
	// 	console.log('pet');
	// 	console.log(pet);
	// 	console.log(pet.weights.length);
	// 	if (sortedWeights.length > 0) {
	// 		console.log(
	// 			'last weight date:' +
	// 				sortedWeights[sortedWeights.length - 1].dateWeighed
	// 		);
	// 		console.log(
	// 			'last weight value:' +
	// 				sortedWeights[sortedWeights.length - 1].weightValue
	// 		);
	// 		setLastWeightDate(
	// 			sortedWeights[sortedWeights.length - 1].dateWeighed
	// 		);
	// 		setLastWeightValue(
	// 			sortedWeights[sortedWeights.length - 1].weightValue
	// 		);
	// 	}
	// }, []);

	//handles input changes from all fields
	const onDateChange = (date) => {
		console.log('on date change called');
		console.log(date);
		const formattedDate = moment(date).format('MM/DD/YYYY');
		setSelectedDate(formattedDate);
	};

	const onWeightValueChange = (event) => {
		console.log('weight: ' + event.target.value);
		setWeightValue(event.target.value);
		// setTime(event.target.value);
	};

	const onUnitChange = (event) => {
		console.log('unit: ' + event.target.value);
		setUnit(event.target.value);
		// setAmOrPm(event.target.value);
	};

	const onNotesChange = (event) => {
		console.log('notes: ' + event.target.value);
		setNotes(event.target.value);
	};

	//makes API call to submit form information
	const submitHandler = (event) => {
		event.preventDefault();
		let change = 0;

		// if (dateChanged === false) {
		// 	setSelectedDate(moment(selectedDate).format('dddd MMM DD, YYYY'));
		// }

		if (sortedWeights.length > 0) {
			change =
				weightValue -
				sortedWeights[sortedWeights.length - 1].weightValue;
		}
		// setWeightChange(change);

		console.log('current weight: ' + weightValue);
		console.log('unit: ' + unit);
		console.log('date: ' + selectedDate);
		// console.log('last weight value' + lastWeightValue);
		// console.log('last date weighed: ' + lastDateWeighed);
		// console.log('weight change' + change);
		props.handleClose();
		addWeight(
			currentUser.id,
			pet.id,
			weightValue,
			unit,
			selectedDate,
			notes,
			pet.petName,
			pet.id
		);
		props.handleClose();
		Alert.success('Weight Added');
		setTimeout(() => {
			Alert.closeAll();
			props.changeDefaultViewsAndRefresh('WEIGHTS');
			props.forceUpdate();
		}, 500);
	};

	// console.log('weight props');
	// console.log(props);
	// console.log('date: ' + selectedDate);

	return (
		<div className="pet-form-main-container">
			<h1 className="modal-title">Add New Weight</h1>
			<form className="pet-form" onSubmit={submitHandler}>
				{small ? (
					<div className="time">
						<TextField
							onChange={onWeightValueChange}
							className={Weight}
							required
							variant="standard"
							type="text"
							inputProps={{
								style: { textAlign: 'center' },
								pattern: '\\d+(\\.\\d+)?',
							}}
							id="standard-basic"
							label="Weight"
						/>
						<TextField
							required
							select
							label="Unit"
							// style={{ marginTop: '0rem' }}
							className={classes.Unit}
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							value={unit}
							onChange={onUnitChange}
							// disabled={true}
						>
							<MenuItem value={'lbs'}>lbs</MenuItem>
						</TextField>
					</div>
				) : (
					<div>
						<TextField
							onChange={onWeightValueChange}
							className={classes.Weight}
							required
							variant="standard"
							type="text"
							inputProps={{
								style: { textAlign: 'center' },
								pattern: '\\d+(\\.\\d+)?',
							}}
							id="standard-basic"
							label="Weight"
						/>
						<FormControl className={classes.formControl}>
							<InputLabel
								className={classes.inputLabel}
								id="demo-controlled-open-select-label"
							>
								Unit
							</InputLabel>
							<Select
								required
								style={{ marginTop: '2rem' }}
								className={classes.Unit}
								labelId="demo-controlled-open-select-label"
								id="demo-controlled-open-select"
								value={unit}
								onChange={onUnitChange}
								// disabled={true}
							>
								<MenuItem value={'lbs'}>lbs</MenuItem>
							</Select>
						</FormControl>
					</div>
				)}

				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Fragment>
						<KeyboardDatePicker
							className={Textfield1}
							clearable
							required
							value={selectedDate}
							placeholder="10/10/2018"
							// onChange={(date) => handleDateChange(date)}
							onChange={(date) => {
								onDateChange(date);
							}}
							format="MM/dd/yyyy"
						/>
					</Fragment>
				</MuiPickersUtilsProvider>

				<TextField
					onChange={onNotesChange}
					className={Textfield1}
					id="standard-multiline-flexible"
					label="Notes"
					multiline
					rowsMax={2}
					// value={value}
					// onChange={handleChange}
				/>

				<div className="button-group">
					<Button
						// onClick={setLastAndWeightChange}
						variant="contained"
						onClick={props.handleClose}
						className={cancelButton}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						type="submit"
						className={classes.submitButton}
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
}
