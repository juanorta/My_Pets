import React, { useState, Fragment } from 'react';
import './AddFoodForm.css';
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
import {
	addFood,
	addFoodImage,
	getCurrentUser,
	getPet,
	getPetWithoutPictureWithFood,
} from '../../../../../util/APIUtils';
import PublishIcon from '@material-ui/icons/Publish';
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
		marginLeft: '28%',
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
		marginLeft: '2.8rem',
		marginTop: '0rem',
		width: '7rem',
	},

	selectDropdown2Small: {
		width: '40%',
		marginRight: '2rem',
		// marginLeft: '2rem',
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
	imageName1: {
		'& .MuiInputBase-root.Mui-disabled': {
			color: 'black', // (default alpha is 0.38)
		},
	},
	imageNameSmall1: {
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

//form used to add a pet

export default function AddFoodForm(props) {
	const classes = useStyles();
	const theme = useTheme();

	//stores information as user is typing
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [foodName, setFoodName] = useState('');
	const [type, setType] = useState('');
	const [wetOrDry, setWetOrDry] = useState('');
	const [flavor, setFlavor] = useState('');
	const [whereToBuy, setWhereToBuy] = useState('');
	const [image, setImage] = useState('');
	const [imageName, setImageName] = useState('');
	const small = useMediaQuery(theme.breakpoints.down('sm'));

	//handles input changes from all fields
	const [notes, setNotes] = useState('');

	let Textfield1 = classes.TextField1;
	let selectDropdown2 = classes.selectDropdown2;
	let cancelButton = classes.cancelButton;
	let uploadLabel = classes.uploadLabel;
	let uploadButton = classes.uploadButton;
	let publishIcon = classes.publishIcon;
	let imageName1 = classes.imageName1;

	if (small) {
		Textfield1 = classes.TextField1Small;
		selectDropdown2 = classes.selectDropdown2Small;
		cancelButton = classes.cancelButtonSmall;
		uploadLabel = classes.uploadLabelSmall;
		uploadButton = classes.uploadButtonSmall;
		publishIcon = classes.publishIconSmall;
		imageName1 = classes.imageNameSmall1;
	}

	const handleFileChange = (event) => {
		console.log(event.target.files[0]);
		console.log(event.target.files[0].name);
		setImage(event.target.files[0]);
		setImageName(event.target.files[0].name);
	};

	const onFoodNameChange = (event) => {
		console.log('Foodname: ' + event.target.value);
		setFoodName(event.target.value);
	};

	const onTypeChange = (event) => {
		console.log('type: ' + event.target.value);
		setType(event.target.value);
	};

	const onWetOrDryChange = (event) => {
		console.log('wet or dry: ' + event.target.value);
		setWetOrDry(event.target.value);
	};

	const onFlavorChange = (event) => {
		console.log('flavor: ' + event.target.value);
		setFlavor(event.target.value);
	};

	const onWhereToBuyChange = (event) => {
		console.log('where to buy: ' + event.target.value);
		setWhereToBuy(event.target.value);
	};

	const onNotesChange = (event) => {
		console.log('notes: ' + event.target.value);
		setNotes(event.target.value);
	};

	//makes API call to submit form information
	const submitHandler = (event) => {
		event.preventDefault();

		addFood(
			currentUser.id,
			pet.id,
			foodName,
			type,
			wetOrDry,
			flavor,
			whereToBuy,
			notes
		);

		if (image != '') {
			setTimeout(() => {
				getPetWithoutPictureWithFood(currentUser.id, pet.id)
					.then((response) => {
						console.log(response);
						//if user selected an image
						addFoodImage(
							currentUser.id,
							pet.id,
							response.food[response.food.length - 1].id,
							image
						);
						props.handleClose();
						Alert.success('Food Added');
						setTimeout(() => {
							Alert.closeAll();
							props.ReloadPet('FOOD');
						}, 500);
						// response[response.food.length-1].id;
					})
					.catch((error) => {
						console.log(error);
					});
			}, 1000);
		} else {
			props.handleClose();
			Alert.success('Food Added');
			setTimeout(() => {
				Alert.closeAll();
				props.ReloadPet('FOOD');
			}, 500);
		}
	};

	console.log('food props');
	console.log(props);

	return (
		<div className="pet-form-main-container">
			<h1 className="modal-title" style={{ marginTop: '0.25rem' }}>
				Add New Food
			</h1>
			<form className="pet-form" onSubmit={submitHandler}>
				<TextField
					onChange={onFoodNameChange}
					className={Textfield1}
					variant="standard"
					id="standard-required"
					inputProps={{
						style: { textAlign: 'center' },
					}}
					id="standard-basic"
					required
					label="Food Name"
				/>
				{small ? (
					<div className="time">
						<TextField
							required
							select
							label="Type"
							style={{ marginTop: '0rem' }}
							className={selectDropdown2}
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							onChange={onTypeChange}
						>
							<MenuItem value={'Primary'}>Primary</MenuItem>
							<MenuItem value={'Treat'}>Treat</MenuItem>
						</TextField>
						<TextField
							required
							select
							label="Wet/Dry"
							style={{ marginTop: '0rem' }}
							className={selectDropdown2}
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							onChange={onWetOrDryChange}
						>
							<MenuItem value={'Wet'}>Wet</MenuItem>
							<MenuItem value={'Dry'}>Dry</MenuItem>
						</TextField>
					</div>
				) : (
					<div>
						<FormControl className={classes.formControl}>
							<InputLabel
								className={classes.inputLabel}
								id="demo-controlled-open-select-label"
							>
								Type
							</InputLabel>
							<Select
								required
								style={{ marginTop: '0rem' }}
								className={classes.selectDropdown2}
								labelId="demo-controlled-open-select-label"
								id="demo-controlled-open-select"
								onChange={onTypeChange}
							>
								<MenuItem value={'Primary'}>Primary</MenuItem>
								<MenuItem value={'Treat'}>Treat</MenuItem>
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel
								className={classes.inputLabel}
								id="demo-controlled-open-select-label"
							>
								Wet/Dry
							</InputLabel>
							<Select
								required
								style={{ marginTop: '0rem' }}
								className={classes.selectDropdown2}
								labelId="demo-controlled-open-select-label"
								id="demo-controlled-open-select"
								onChange={onWetOrDryChange}
							>
								<MenuItem value={'Wet'}>Wet</MenuItem>
								<MenuItem value={'Dry'}>Dry</MenuItem>
							</Select>
						</FormControl>
					</div>
				)}

				<TextField
					onChange={onFlavorChange}
					className={Textfield1}
					variant="standard"
					id="standard-required"
					inputProps={{
						style: { textAlign: 'center' },
					}}
					id="standard-basic"
					label="Flavor"
				/>
				<TextField
					onChange={onWhereToBuyChange}
					className={Textfield1}
					variant="standard"
					inputProps={{
						style: { textAlign: 'center' },
					}}
					id="standard-basic"
					label="Where to buy"
				/>
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
						// style={{
						// 	marginTop: '1rem',
						// 	backgroundColor: 'white',
						// 	color: 'teal',
						// 	width: '7rem',
						// 	border: 'solid 1px teal',
						// 	// marginLeft: '4rem',
						// 	// fontSize: '12px',
						// }}
					>
						<PublishIcon className={publishIcon} />{' '}
						<span style={{ marginLeft: '0.25rem' }}>Picture</span>
					</Button>{' '}
					<TextField
						disabled={true}
						// style={{
						// 	marginTop: '1.25rem',
						// 	marginLeft: '1rem',
						// 	width: '11rem',
						// }}
						className={imageName1}
						value={imageName}
					></TextField>
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
