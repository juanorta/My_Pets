import React, { useEffect, useState } from 'react';
import './EditPet.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from 'react-s-alert';
import {
	editPet,
	addPetImage,
	editPetImage,
} from '../../../../../util/APIUtils';
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
	const [image, setImage] = useState('');
	const [hasImage, setHasImage] = useState('');
	const [petImageId, setPetImageId] = useState('');
	const [imageName, setImageName] = useState('');

	//checking to see if the pet currently has a photo
	//if so, will grab the photo and store it
	useEffect(() => {
		if (props.pet.petImage == null) {
			console.log('doent have pic');
			setHasImage(false);
		} else {
			console.log('has pic');
			setPetImageId(props.pet.petImage.id);
			setImage(props.pet.petImage.fileName);
			setImageName(props.pet.petImage.fileName);
			setHasImage(true);
		}
	}, []);

	const handleFileChange = (event) => {
		console.log(event.target.files[0]);
		setImage(event.target.files[0]);
		setImageName(event.target.files[0].name);
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

		editPet(id, petId, name, petType, breed, sex, age);
		// // props.handleClose();

		//will call two different endpoints depending if use is editing a current photo
		//or if user is adding photo to pet for the first time
		setTimeout(() => {
			if (hasImage === false) {
				// Alert.success('image is null');
				// props.handleClose();
				addPetImage(id, petId, image);
				Alert.success('PET EDITED');
				props.handleClose();
				// Alert.success('PET EDITED');
			} else {
				editPetImage(id, petId, petImageId, image);
				Alert.success('NO INITIAL IMAGE');
				//edit pic endpoint goes here
			}

			setTimeout(() => {
				Alert.closeAll();
				props.forceUpdate();
			}, 500);
		}, 1000);
	};

	console.log(hasImage);

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
					{image == '' ? null : (
						<TextField
							disabled={true}
							style={{
								marginTop: '1.25rem',
								marginLeft: '1rem',
								width: '10rem',
							}}
							className={classes.imageName}
							value={imageName}
						></TextField>
					)}
				</label>

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
