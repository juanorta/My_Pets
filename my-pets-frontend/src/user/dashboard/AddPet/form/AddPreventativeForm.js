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
import { addPreventative } from '../../../../util/APIUtils';

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
		marginBottom: '1.5rem',
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
		width: '7.5rem',
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
		marginTop: '-4rem',
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
		marginTop: '-4rem',
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

export default function AddPreventative(props) {
	const classes = useStyles();

	//stores information as user is typing
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [dueNext, setDueNext] = useState(new Date());
	const [lastGiven, setLastGiven] = useState(new Date());
	const [notes, setNotes] = useState('');

	//handles input changes from all fields
	const onDueNext = (date) => {
		console.log('on due next change called');
		console.log(date);
		const formattedDate = moment(date).format('MM/DD/YYYY');
		setDueNext(formattedDate);
	};

	const onLastGiven = (date) => {
		console.log('on last given change called');
		const formattedDate = moment(date).format('MM/DD/YYYY');
		setLastGiven(formattedDate);
	};

	const onNameChange = (event) => {
		console.log('name: ' + event.target.value);
		setName(event.target.value);
		// setWeightValue(event.target.value);
		// setTime(event.target.value);
	};

	const onTypeChange = (event) => {
		console.log('type: ' + event.target.value);
		setType(event.target.value);
		// setUnit(event.target.value);
		// // setAmOrPm(event.target.value);
	};

	const onNotesChange = (event) => {
		console.log('notes: ' + event.target.value);
		setNotes(event.target.value);
	};

	//makes API call to submit form information
	const submitHandler = (event) => {
		event.preventDefault();
		console.log('name: ' + name);
		console.log('type: ' + type);
		console.log('due next: ' + dueNext);
		console.log('last given: ' + lastGiven);
		console.log('notes: ' + notes);
		addPreventative(
			currentUser.id,
			pet.id,
			name,
			type,
			lastGiven,
			dueNext,
			notes,
			pet.petName,
			pet.id,
			pet.petImage.data
		);
		props.handleClose();
		Alert.success('Preventative Added');
		setTimeout(() => {
			Alert.closeAll();
			props.changeDefaultViewsAndRefresh('PREVENTATIVES');
			props.forceUpdate();
		}, 500);
	};

	return (
		<div className="pet-form-main-container">
			<h1 className="modal-title">Add New Preventative</h1>
			<form
				className="pet-form"
				onSubmit={submitHandler}
				style={{
					marginTop: '1rem',
				}}
			>
				<TextField
					onChange={onNameChange}
					className={classes.TextField1}
					required
					variant="standard"
					type="text"
					id="standard-basic"
					label="Name"
				/>
				<TextField
					onChange={onTypeChange}
					className={classes.TextField1}
					variant="standard"
					type="text"
					// inputProps={{
					// 	style: { textAlign: 'center' },
					// 	pattern: '\\d+(\\.\\d+)?',
					// }}
					id="standard-basic"
					label="Type"
				/>

				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Fragment>
						<KeyboardDatePicker
							className={classes.TextField1}
							clearable
							value={dueNext}
							placeholder="10/10/2018"
							// onChange={(date) => handleDateChange(date)}
							onChange={(date) => {
								onDueNext(date);
							}}
							label="Due Next"
							format="MM/dd/yyyy"
						/>
					</Fragment>
				</MuiPickersUtilsProvider>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Fragment>
						<KeyboardDatePicker
							className={classes.TextField1}
							clearable
							value={lastGiven}
							placeholder="10/10/2018"
							// onChange={(date) => handleDateChange(date)}
							onChange={(date) => {
								onLastGiven(date);
							}}
							label="Last Given"
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
					// value={value}
					// onChange={handleChange}
				/>

				<div className="button-group">
					<Button
						variant="contained"
						// onClick={setLastAndWeightChange}
						onClick={props.handleClose}
						className={classes.cancelButton}
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
