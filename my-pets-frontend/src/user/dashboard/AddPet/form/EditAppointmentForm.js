import React, { useState, Fragment, useEffect } from 'react';
// import './AddAppointmentForm.css';
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
import { editAppointment } from '../../../../util/APIUtils';
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
		marginBottom: '1rem',
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

	TextField2: {
		marginLeft: '15%',
		// marginTop: '1rem',
		width: '5rem',
		'& label.Mui-focused': {
			color: '#1B2737',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#1B2737',
		},
	},
	TextField2Small: {
		// marginLeft: '-25%',
		width: '40%',
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
		marginTop: '-1rem',
		marginLeft: '18%',
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

	selectDropdown2: {
		marginLeft: '1rem',
		marginTop: '0rem',
	},
	selectDropdown2Small: {
		width: '50%',
		marginLeft: '2rem',
		// marginLeft: 'rem',
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
}));

//form used to add a pet

export default function AddPetForm(props) {
	const theme = useTheme();

	const classes = useStyles();
	let amPmIndex = props.rowData.rowId;

	//stores information as user is typing
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [petName, setPetName] = useState(props.pet.petName);
	const [petAptId, setPetAptId] = useState(props.pet.id);
	const [rowData, setRowData] = useState(props.rowData);
	const [selectedDate, setSelectedDate] = useState(
		moment(props.rowData.Date).format('MM/DD/YYYY')
	);
	const [time, setTime] = useState(props.appointments[amPmIndex].time);
	const [amOrPm, setAmOrPm] = useState(props.appointments[amPmIndex].amOrPm);
	const [type, setType] = useState(props.rowData.Type);
	const [reason, setReason] = useState(props.rowData.Reason);
	const [vetOrGroomerName, setVetOrGroomerName] = useState(
		props.rowData.VetGroomer
	);
	const [notes, setNotes] = useState(props.rowData.Notes);
	const [pictureData, setPictureData] = useState('');
	const small = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		if (pet.petImage != null) {
			setPictureData(pet.petImage.data);
		}
	}, []);

	let Textfield1 = classes.TextField1;
	let Textfield2 = classes.TextField2;
	let inputLabel = classes.inputLabel;
	let selectDropdown2 = classes.selectDropdown2;
	let cancelButton = classes.cancelButton;

	if (small) {
		Textfield1 = classes.TextField1Small;
		Textfield2 = classes.TextField2Small;
		inputLabel = classes.inputLabelSmall;
		selectDropdown2 = classes.selectDropdown2Small;
		cancelButton = classes.cancelButtonSmall;
	}

	//handles input changes from all fields
	const onDateChange = (date) => {
		const formattedDate = moment(date).format('dddd MMM DD, YYYY');
		setSelectedDate(formattedDate);
	};

	const onTimeChange = (event) => {
		setTime(event.target.value);
	};

	const onAmOrPmChange = (event) => {
		setAmOrPm(event.target.value);
	};

	const onTypeChange = (event) => {
		setType(event.target.value);
	};

	const onReasonChange = (event) => {
		setReason(event.target.value);
	};

	const onVetOrGroomerChange = (event) => {
		setVetOrGroomerName(event.target.value);
	};

	const onNotesChange = (event) => {
		setNotes(event.target.value);
	};

	//makes API call to submit form information
	const submitHandler = (event) => {
		editAppointment(
			currentUser.id,
			pet.id,
			rowData.id,
			selectedDate,
			time,
			amOrPm,
			type,
			reason,
			vetOrGroomerName,
			notes,
			pet.petName,
			petAptId
		);
		props.handleClose();
		Alert.success('Appointment Edited');
		setTimeout(() => {
			Alert.closeAll();
			props.ReloadAppointment();
		}, 500);
	};
	return (
		<div className="pet-form-main-container">
			<h1 className="modal-title">Edit Appointment</h1>
			<form className="pet-form" onSubmit={submitHandler}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Fragment>
						<KeyboardDatePicker
							className={Textfield1}
							// disablePast
							clearable
							required
							value={selectedDate}
							placeholder="10/10/2018"
							// onChange={(date) => handleDateChange(date)}
							onChange={(date) => {
								onDateChange(date);
							}}
							minDate="02/01/2010"
							// minDate={new Date(new Date().getTime() + 86400000)}
							// minDate={new Date()}
							format="MM/dd/yyyy"
						/>
					</Fragment>
				</MuiPickersUtilsProvider>

				{small ? (
					<div className="time">
						<TextField
							onChange={onTimeChange}
							className={Textfield2}
							required
							variant="standard"
							inputProps={{
								style: { textAlign: 'center' },
							}}
							id="standard-basic"
							label="Time"
							value={time}
						/>
						<TextField
							required
							select
							label="AM/PM"
							style={{ marginTop: '0rem' }}
							className={selectDropdown2}
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							onChange={onAmOrPmChange}
							value={amOrPm}
							inputProps={{ 'aria-label': 'Without label' }}
						>
							<MenuItem value={'AM'}>AM</MenuItem>
							<MenuItem value={'PM'}>PM</MenuItem>
						</TextField>
					</div>
				) : (
					<div>
						<TextField
							onChange={onTimeChange}
							className={classes.TextField2}
							required
							variant="standard"
							inputProps={{
								style: { textAlign: 'center' },
							}}
							id="standard-basic"
							label="Time"
							value={time}
						/>
						<FormControl className={classes.formControl}>
							<InputLabel
								className={classes.inputLabel}
								id="demo-controlled-open-select-label"
							>
								AM/PM
							</InputLabel>
							<Select
								required
								style={{ marginTop: '0rem' }}
								className={classes.selectDropdown2}
								labelId="demo-controlled-open-select-label"
								id="demo-controlled-open-select"
								onChange={onAmOrPmChange}
								value={amOrPm}
							>
								<MenuItem value={'AM'}>AM</MenuItem>
								<MenuItem value={'PM'}>PM</MenuItem>
							</Select>
						</FormControl>
					</div>
				)}
				{small ? (
					<div className>
						<TextField
							required
							select
							label="Type"
							style={{ marginTop: '2rem' }}
							className={Textfield1}
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							onChange={onTypeChange}
							value={type}
							style={{ marginLeft: '-25%' }}
						>
							<MenuItem value={'Vet'}>Vet</MenuItem>
							<MenuItem value={'Grooming'}>Grooming</MenuItem>
						</TextField>
						<TextField
							onChange={onReasonChange}
							className={Textfield1}
							variant="standard"
							inputProps={{
								style: { textAlign: 'center' },
							}}
							id="standard-basic"
							label="Reason"
							value={reason}
						/>
					</div>
				) : (
					<div>
						<FormControl className={classes.formControl}>
							<InputLabel
								className={classes.inputLabel1}
								id="demo-controlled-open-select-label"
							>
								Type
							</InputLabel>
							<Select
								required
								style={{ marginTop: '0rem' }}
								className={classes.selectDropdown}
								labelId="demo-controlled-open-select-label"
								id="demo-controlled-open-select"
								onChange={onTypeChange}
								value={type}
							>
								<MenuItem value={'Vet'}>Vet</MenuItem>
								<MenuItem value={'Grooming'}>Grooming</MenuItem>
							</Select>
						</FormControl>
						<TextField
							onChange={onReasonChange}
							className={classes.TextField3}
							variant="standard"
							inputProps={{
								style: { textAlign: 'center' },
							}}
							id="standard-basic"
							label="Reason"
							value={reason}
						/>
					</div>
				)}

				<TextField
					onChange={onVetOrGroomerChange}
					className={Textfield1}
					variant="standard"
					id="standard-required"
					inputProps={{
						style: { textAlign: 'center' },
					}}
					id="standard-basic"
					label="Vet / Groomer name"
					value={vetOrGroomerName}
				/>
				<TextField
					onChange={onNotesChange}
					className={Textfield1}
					id="standard-multiline-flexible"
					label="Notes"
					multiline
					rowsMax={2}
					value={notes}
					// value={value}
					// onChange={handleChange}
				/>
				<div className="button-group appointments">
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
						className={classes.submitButton}
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
}
