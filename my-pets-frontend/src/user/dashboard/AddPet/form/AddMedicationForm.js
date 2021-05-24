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
import { addMedication } from '../../../../util/APIUtils';
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

export default function AddMedicationForm(props) {
	const classes = useStyles();
	const theme = useTheme();

	//stores information as user is typing
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [name, setName] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [dosageInstructions, setDosageInstructions] = useState('');
	const [petImage, setPetImage] = useState('');
	const small = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		if (pet.petImage != null) {
			setPetImage(pet.petImage.data);
		} else {
			setPetImage('');
		}
	}, []);

	let Textfield1 = classes.TextField1;
	let cancelButton = classes.cancelButton;
	let submitButton = classes.submitButton;

	if (small) {
		Textfield1 = classes.TextField1Small;
		cancelButton = classes.cancelButtonSmall;
		submitButton = classes.submitButtonSmall;
	}

	const onNameChange = (event) => {
		setName(event.target.value);
	};

	//handles input changes from all fields
	const onStartDate = (date) => {
		const formattedDate = moment(date).format('MM/DD/YYYY');
		setStartDate(formattedDate);
	};

	const onEndDate = (date) => {
		const formattedDate = moment(date).format('MM/DD/YYYY');
		setEndDate(formattedDate);
	};

	const onNotesChange = (event) => {
		setDosageInstructions(event.target.value);
	};

	//makes API call to submit form information
	const submitHandler = (event) => {
		event.preventDefault();

		addMedication(
			currentUser.id,
			pet.id,
			name,
			startDate,
			endDate,
			dosageInstructions,
			pet.petName,
			pet.id
		);

		props.handleClose();
		Alert.success('Medication Added');
		setTimeout(() => {
			Alert.closeAll();
			props.ReloadPet('MEDICATIONS');
		}, 500);
	};

	return (
		<div className="pet-form-main-container">
			<h1 className="modal-title">Add New Medication</h1>
			<form className="pet-form" onSubmit={submitHandler}>
				<TextField
					onChange={onNameChange}
					className={Textfield1}
					required
					variant="standard"
					type="text"
					id="standard-basic"
					label="Name"
				/>

				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Fragment>
						<KeyboardDatePicker
							className={Textfield1}
							clearable
							label="Start Date"
							value={startDate}
							placeholder="10/10/2018"
							onChange={(date) => {
								onStartDate(date);
							}}
							format="MM/dd/yyyy"
						/>
					</Fragment>
				</MuiPickersUtilsProvider>

				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Fragment>
						<KeyboardDatePicker
							className={Textfield1}
							clearable
							label="End Date"
							value={endDate}
							placeholder="10/10/2018"
							onChange={(date) => {
								onEndDate(date);
							}}
							format="MM/dd/yyyy"
						/>
					</Fragment>
				</MuiPickersUtilsProvider>

				<TextField
					onChange={onNotesChange}
					className={Textfield1}
					id="standard-multiline-flexible"
					label="Dosage Instructions"
					multiline
					rowsMax={2}
				/>

				<div className="button-group">
					<Button
						variant="contained"
						onClick={props.handleClose}
						className={cancelButton}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						type="submit"
						className={submitButton}
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
}
