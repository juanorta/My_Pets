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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useLocation } from 'react-router';

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
	TextField1Small: {
		marginLeft: '-25%',
		// marginTop: '1rem',
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
		marginTop: '1rem',
		width: '18rem',
		'& label.Mui-focused': {
			color: '#1B2737',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#1B2737',
		},
	},

	TextField2Small: {
		marginLeft: '-25%',
		marginTop: '1rem',
		width: '150%',
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

	inputLabelSmall: {
		marginTop: '2rem',
		marginLeft: '-25%',
	},

	selectDropdown: {
		marginLeft: '38%',
		marginTop: '0rem',
		width: '5rem',
	},

	selectDropdownSmall: {
		marginTop: '0rem',
		width: '150%',
		marginLeft: '-25%',
		// marginLeft: '-30%',
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

	imageNameEdit: {
		'& .MuiInputBase-root.Mui-disabled': {
			color: 'black', // (default alpha is 0.38)
		},
		marginTop: '1.25rem',
		marginLeft: '1rem',
		width: '10rem',
	},

	imageNameEditSmall: {
		'& .MuiInputBase-root.Mui-disabled': {
			color: 'black', // (default alpha is 0.38)
		},
		marginTop: '2.25rem',
		marginLeft: '1rem',
		width: '5rem',
	},

	uploadLabel: {
		marginLeft: '3.7rem',
	},
	uploadLabelSmall: {
		marginLeft: '-2.5rem',
		width: '150%',
	},

	uploadButton: {
		marginTop: '1rem',
		backgroundColor: 'white',
		color: 'teal',
		width: '7rem',
		border: 'solid 1px teal',
	},

	uploadButtonSmall: {
		marginTop: '2rem',
		backgroundColor: 'white',
		color: 'teal',
		width: '5rem',
		border: 'solid 1px teal',
		fontSize: '10px',
	},

	publishIcon: {},

	publishIconSmall: {
		fontSize: '1.25rem',
	},
}));

export default function EditPet(props) {
	const theme = useTheme();

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
	const small = useMediaQuery(theme.breakpoints.down('sm'));
	let location = useLocation().pathname;

	//default style classes
	let Textfield1 = classes.TextField1;
	let Textfield2 = classes.TextField2;
	let inputLabel = classes.inputLabel;
	let selectDropdown = classes.selectDropdown;
	let cancelButton = classes.cancelButton;
	let uploadLabel = classes.uploadLabel;
	let uploadButton = classes.uploadButton;
	let publishIcon = classes.publishIcon;
	let imageNameEdit = classes.imageNameEdit;

	//style classes change when screen size is small
	if (small) {
		Textfield1 = classes.TextField1Small;
		Textfield2 = classes.TextField2Small;
		inputLabel = classes.inputLabelSmall;
		selectDropdown = classes.selectDropdownSmall;
		cancelButton = classes.cancelButtonSmall;
		uploadLabel = classes.uploadLabelSmall;
		uploadButton = classes.uploadButtonSmall;
		publishIcon = classes.publishIconSmall;
		imageNameEdit = classes.imageNameEditSmall;
	}

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
				//edit pic endpoint goes here
			}

			setTimeout(() => {
				Alert.closeAll();
				if (location == '/') {
					props.forceUpdate();
				} else {
					props.ReloadPet('APPOINTMENTS');
				}
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
					className={Textfield1}
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
					className={Textfield2}
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
					className={Textfield2}
					variant="standard"
					inputProps={{
						style: { textAlign: 'center' },
					}}
					id="standard-basic"
					label="Breed"
					value={breed}
				/>

				{small ? (
					<div>
						<InputLabel
							className={inputLabel}
							id="demo-controlled-open-select-label"
						>
							Sex
						</InputLabel>
						<Select
							className={selectDropdown}
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							onChange={onSexChange}
							value={sex}
						>
							<MenuItem value={'Male'}>Male</MenuItem>
							<MenuItem value={'Female'}>Female</MenuItem>
						</Select>
						<TextField
							style={{ marginTop: '1.25rem' }}
							type="number"
							label="Age (yrs)"
							className={selectDropdown}
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							onChange={onAgeChange}
							value={age}
						></TextField>
					</div>
				) : (
					<div>
						<FormControl className={classes.formControl}>
							<InputLabel
								className={inputLabel}
								id="demo-controlled-open-select-label"
							>
								Sex
							</InputLabel>
							<Select
								className={selectDropdown}
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
							<TextField
								type="number"
								label="Age (yrs)"
								className={selectDropdown}
								labelId="demo-controlled-open-select-label"
								id="demo-controlled-open-select"
								onChange={onAgeChange}
							></TextField>
						</FormControl>
					</div>
				)}

				<label htmlFor="upload-photo" className={uploadLabel}>
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
						className={uploadButton}
					>
						<PublishIcon />{' '}
						<span style={{ marginLeft: '0.25rem' }}>Picture</span>
					</Button>{' '}
					{image == '' ? null : (
						<TextField
							disabled={true}
							className={imageNameEdit}
							value={imageName}
						></TextField>
					)}
				</label>

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
						className={classes.submitButton}
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
}
