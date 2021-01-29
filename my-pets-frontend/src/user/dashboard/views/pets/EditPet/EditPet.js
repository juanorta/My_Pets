import React, { useState } from 'react';
import './EditPet.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from 'react-s-alert';
import { editPet } from '../../../../../util/APIUtils';

const useStyles = makeStyles((theme) => ({
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
		// marginTop: '1rem',
		width: '18rem',
		'& label.Mui-focused': {
			color: '#1B2737',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#1B2737',
		},
	},

	TextField2: {
		marginLeft: '15%',
		marginTop: '1rem',
		width: '18rem',
		'& label.Mui-focused': {
			color: '#1B2737',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#1B2737',
		},
	},

	inputLabel: {
		marginTop: '0rem',
		marginLeft: '38%',
	},

	selectDropdown: {
		marginLeft: '38%',
		marginTop: '0rem',
		width: '5rem',
	},

	birthday: {
		marginLeft: '15%',
		marginTop: '2rem',
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

export default function EditPet(props) {
	const classes = useStyles();

	//stores information as user is typing
	const [id, setID] = useState(props.currentUser.id);
	const [petId, setPetId] = useState(props.pet.id);
	const [name, setName] = useState(props.pet.petName);
	const [petType, setPetType] = useState(props.pet.petType);
	const [breed, setBreed] = useState(props.pet.breed);
	const [sex, setSex] = useState(props.pet.sex);
	const [age, setAge] = useState(props.pet.age);

	const onNameChange = (event) => {
		console.log('name: ' + event.target.value);
		setName(event.target.value);
	};

	const onPetTypeChange = (event) => {
		console.log('pet type: ' + event.target.value);
		setPetType(event.target.value);
	};

	const onBreedChange = (event) => {
		console.log('breed: ' + event.target.value);
		setBreed(event.target.value);
	};

	const onSexChange = (event) => {
		console.log('sex: ' + event.target.value);
		setSex(event.target.value);
	};

	const onAgeChange = (event) => {
		console.log('age: ' + event.target.value);
		setAge(event.target.value);
	};

	//makes API call to submit form information
	const submitHandler = (event) => {
		editPet(id, petId, name, petType, breed, sex, age);
		props.handleClose();
		Alert.success('PET EDITED');
		setTimeout(() => {
			Alert.closeAll();
			props.forceUpdate();
		}, 500);
	};

	console.log(props);
	return (
		<div className="edit-pet-main-container">
			<h1 className="modal-title">Edit Pet</h1>
			<form className="pet-form" onSubmit={submitHandler}>
				<TextField
					onChange={onNameChange}
					className={classes.TextField1}
					variant="standard"
					required
					id="standard-required"
					inputProps={{
						style: { textAlign: 'center' },
					}}
					id="standard-basic"
					label="Name"
					value={name}
				/>
				<TextField
					onChange={onPetTypeChange}
					className={classes.TextField2}
					variant="standard"
					required
					id="standard-required"
					inputProps={{
						style: { textAlign: 'center' },
					}}
					id="standard-basic"
					label="Pet Type (dog, cat, etc)"
					value={petType}
				/>
				<TextField
					onChange={onBreedChange}
					className={classes.TextField2}
					variant="standard"
					inputProps={{
						style: { textAlign: 'center' },
					}}
					id="standard-basic"
					label="Breed"
					value={breed}
				/>

				<FormControl className={classes.formControl}>
					<InputLabel
						className={classes.inputLabel}
						id="demo-controlled-open-select-label"
					>
						Sex
					</InputLabel>
					<Select
						className={classes.selectDropdown}
						labelId="demo-controlled-open-select-label"
						id="demo-controlled-open-select"
						onChange={onSexChange}
						value={sex}
					>
						<MenuItem value={'Male'}>Male</MenuItem>
						<MenuItem value={'Female'}>Female</MenuItem>
					</Select>
				</FormControl>
				<FormControl className={classes.formControl}>
					<InputLabel
						className={classes.inputLabel}
						id="demo-controlled-open-select-label"
					>
						Age
					</InputLabel>
					<Select
						className={classes.selectDropdown}
						labelId="demo-controlled-open-select-label"
						id="demo-controlled-open-select"
						onChange={onAgeChange}
						value={age}
					>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={4}>4</MenuItem>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={6}>6</MenuItem>
						<MenuItem value={7}>7</MenuItem>
						<MenuItem value={8}>8</MenuItem>
						<MenuItem value={9}>9</MenuItem>
						<MenuItem value={10}>10</MenuItem>
					</Select>
				</FormControl>

				<div className="button-group">
					<Button
						onClick={props.handleClose}
						className={classes.cancelButton}
					>
						Cancel
					</Button>
					<Button type="submit" className={classes.submitButton}>
						Edit
					</Button>
				</div>
			</form>
		</div>
	);
}
