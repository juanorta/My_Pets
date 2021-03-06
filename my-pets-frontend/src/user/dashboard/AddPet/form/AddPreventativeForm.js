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

export default function AddPreventative(props) {
	const theme = useTheme();
	const classes = useStyles();

	//stores information as user is typing
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [dueNext, setDueNext] = useState(new Date());
	const [lastGiven, setLastGiven] = useState(new Date());
	const [notes, setNotes] = useState('');
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
	//handles input changes from all fields
	const onDueNext = (date) => {
		const formattedDate = moment(date).format('MM/DD/YYYY');
		setDueNext(formattedDate);
	};

	const onLastGiven = (date) => {
		const formattedDate = moment(date).format('MM/DD/YYYY');
		setLastGiven(formattedDate);
	};

	const onNameChange = (event) => {
		setName(event.target.value);
	};

	const onTypeChange = (event) => {
		setType(event.target.value);
	};

	const onNotesChange = (event) => {
		setNotes(event.target.value);
	};

	//makes API call to submit form information
	const submitHandler = (event) => {
		event.preventDefault();

		addPreventative(
			currentUser.id,
			pet.id,
			name,
			type,
			lastGiven,
			dueNext,
			notes,
			pet.petName,
			pet.id
		);

		Alert.success('Preventative Added');
		setTimeout(() => {
			props.handleClose();
			Alert.closeAll();
			props.ReloadPet('PREVENTATIVES');
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
					className={Textfield1}
					required
					variant="standard"
					type="text"
					id="standard-basic"
					label="Name"
				/>
				<TextField
					onChange={onTypeChange}
					className={Textfield1}
					variant="standard"
					type="text"
					id="standard-basic"
					label="Type"
				/>

				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Fragment>
						<KeyboardDatePicker
							className={Textfield1}
							clearable
							value={dueNext}
							placeholder="10/10/2018"
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
							className={Textfield1}
							clearable
							value={lastGiven}
							placeholder="10/10/2018"
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
					className={Textfield1}
					id="standard-multiline-flexible"
					label="Notes"
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
