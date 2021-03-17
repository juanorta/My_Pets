import React, { useState } from 'react';
import './AddPetForm.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { addPet, addPetImage, getCurrentUser } from '../../../../util/APIUtils';
import Alert from 'react-s-alert';
import PublishIcon from '@material-ui/icons/Publish';

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
	imageName: {
		'& .MuiInputBase-root.Mui-disabled': {
			color: 'black', // (default alpha is 0.38)
		},
	},
}));

//form used to add a pet

export default function AddPetForm(props) {
	const classes = useStyles();

	//stores information as user is typing
	const [id, setID] = useState(props.currentUser.id);
	const [name, setName] = useState('');
	const [petType, setPetType] = useState('');
	const [breed, setBreed] = useState('');
	const [sex, setSex] = useState('');
	const [age, setAge] = useState(0);
	const [image, setImage] = useState('');

	const handleFileChange = (event) => {
		console.log(event.target.files[0]);
		setImage(event.target.files[0]);
	};

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
		event.preventDefault();
		// console.log('image');
		// console.log(image);
		// addPetImage(1, 109, image);
		addPet(id, age, breed, name, petType, sex);
		setTimeout(() => {
			getCurrentUser()
				.then((response) => {
					console.log(response);
					console.log(response.pets.length);
					if (image != '') {
						addPetImage(
							id,
							response.pets[response.pets.length - 1].id,
							image
						);

						props.handleClose();
						Alert.success('PET ADDED');
						setTimeout(() => {
							Alert.closeAll();
							props.forceUpdate();
						}, 500);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}, 1000);

		// console.log(props.currentUser.pets);
		if (image == '') {
			props.handleClose();
			Alert.success('PET ADDED');
			setTimeout(() => {
				Alert.closeAll();
				props.forceUpdate();
			}, 500);
		}
	};

	// const [name2, setName2] = useState('Male');
	// console.log('props');
	// console.log(props);
	return (
		<div className="pet-form-main-container">
			<h1 className="modal-title">Add Pet</h1>
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

				{/* picture upload */}
				<label htmlFor="upload-photo" style={{ marginLeft: '3.7rem' }}>
					<input
						style={{ display: 'none' }}
						id="upload-photo"
						name="upload-photo"
						type="file"
						onChange={handleFileChange}
					/>
					<Button
						// color="secondary"
						variant="contained"
						component="span"
						style={{
							marginTop: '1rem',
							backgroundColor: 'white',
							color: 'teal',
							width: '7rem',
							border: 'solid 1px teal',
							// fontSize: '12px',
						}}
					>
						<PublishIcon />{' '}
						<span style={{ marginLeft: '0.25rem' }}>Picture</span>
					</Button>{' '}
					{image.name == '' ? null : (
						<TextField
							disabled={true}
							style={{
								marginTop: '1.25rem',
								marginLeft: '1rem',
								width: '10rem',
							}}
							className={classes.imageName}
							value={image.name}
						></TextField>
					)}
				</label>

				{/* <Button
					style={{
						backgroundColor: 'teal',
						marginLeft: '3.7rem',
						marginTop: '1rem',
						color: 'white',
						width: '18rem',
					}}
				>
					<input
						type="file"
						className="custom-file-input"
						id="customFile"
						onChange={handleFileChange}
						style={{ display: 'none' }}
					/>{' '}
					Upload Picture
				</Button> */}
				<div className="button-group">
					<Button
						variant="contained"
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
