import React, { useState, Fragment, useEffect } from 'react';

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
import { editWeight } from '../../../../util/APIUtils';
// import { addAppointment, addWeight } from '../../../../../util/APIUtils';

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
}));

//form used to add a pet

export default function EditWeightForm(props) {
	const classes = useStyles();

	//stores information as user is typing
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [sortedWeights, setSortedWeights] = useState(props.sortedWeights);
	const [rowData, setRowData] = useState(props.rowData);
	const [selectedDate, setSelectedDate] = useState(
		sortedWeights[rowData.id].dateWeighed
	);
	const [dateWeighed, setDateWeighed] = useState(
		sortedWeights[rowData.id].dateWeighed
	);
	const [weightValue, setWeightValue] = useState(
		sortedWeights[rowData.id].weightValue
	);
	const [unit, setUnit] = useState(sortedWeights[rowData.id].unit);
	const [notes, setNotes] = useState(sortedWeights[rowData.id].notes);
	// const [dateChanged, setDateChanged] = useState();

	//accesses last weight record and stores it for later use
	// const [lastDateWeighed, setLastWeightDate] = useState(
	// 	pet.weights[pet.weights.length - 1].dateWeighed
	// );
	// const [lastWeightValue, setLastWeightValue] = useState(
	// 	pet.weights[pet.weights.length - 1].weightValue
	// );

	useEffect(() => {
		// console.log('pet');
		// console.log(pet.weights);
		// // console.log('next pet');
		// console.log(pet.weights[rowData.id]);
		// console.log(pet.weights[rowData.id + 1]);
		// console.log(nextWeight);
		//console.log(pet.weights.length);
		// if (pet.weights.length > 0) {
		// 	// console.log(
		// 	// 	'last weight date:' +
		// 	// 		pet.weights[pet.weights.length - 1].dateWeighed
		// 	// );
		// 	// console.log(
		// 	// 	'last weight value:' +
		// 	// 		pet.weights[pet.weights.length - 1].weightValue
		// 	// );
		// 	setLastWeightDate(pet.weights[pet.weights.length - 1].dateWeighed);
		// 	setLastWeightValue(pet.weights[pet.weights.length - 1].weightValue);
		// }
	}, []);

	//handles input changes from all fields
	const onDateChange = (date) => {
		// setDateChanged(true);
		console.log('on date change called');
		console.log(date);
		const formattedDate = moment(date).format('dddd MMM DD, YYYY');
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

		props.handleClose();
		editWeight(
			currentUser.id,
			pet.id,
			sortedWeights[rowData.id].id,
			weightValue,
			unit,
			selectedDate,
			notes
		);
		// props.handleClose();
		Alert.success('Weight Added');
		// console.log(props.forceUpdate);

		setTimeout(() => {
			Alert.closeAll();
			props.changeDefaultViewsAndRefresh('WEIGHTS');
			//props.changeDefaultViewAndRefresh('WEIGHTS');

			props.forceUpdate();
		}, 500);
	};

	// console.log('weight props');
	// console.log(props.changeDefaultViewsAndRefresh);
	// console.log('date: ' + selectedDate);

	return (
		<div className="pet-form-main-container">
			<h1 className="modal-title"> Edit Weight</h1>
			<form className="pet-form" onSubmit={submitHandler}>
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
					value={weightValue}
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
					>
						<MenuItem value={'lbs'}>lbs</MenuItem>
						<MenuItem value={'kg'}>kg</MenuItem>
					</Select>
				</FormControl>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Fragment>
						<KeyboardDatePicker
							className={classes.TextField1}
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
					className={classes.TextField1}
					id="standard-multiline-flexible"
					label="Notes"
					multiline
					rowsMax={2}
					value={notes}
					// value={value}
					// onChange={handleChange}
				/>

				<div className="button-group">
					<Button
						// onClick={setLastAndWeightChange}
						onClick={props.handleClose}
						className={classes.cancelButton}
					>
						Cancel
					</Button>
					<Button type="submit" className={classes.submitButton}>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
}