import React, { Component } from 'react';
import './Profile.css';
import { addPet } from '../../util/APIUtils';
import Alert from 'react-s-alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
class Profile extends Component {
	constructor(props) {
		super(props);
		//console.log(props);
		//console.log(props.currentUser.pets);
	}
	addPetHandler = () => {
		addPet(
			this.props.currentUser.id,
			4,
			'german shepherd',
			'sheeba',
			'dog',
			'female'
		)
			.then((response) => {
				Alert.success('Pet added!');
			})
			.catch((error) => {
				Alert.error(
					(error && error.message) ||
						'Oops! Something went wrong. Please try again!'
				);
			});
	};
	render() {
		return (
			<div className="profile-container">
				<div className="container">
					<div className="profile-info">
						<div className="profile-avatar">
							{/* {this.props.currentUser.imageUrl ? (
								<img
									src={this.props.currentUser.imageUrl}
									alt={this.props.currentUser.name}
								/>
							) : (
								<div className="text-avatar">
									<span>
										{this.props.currentUser.name &&
											this.props.currentUser.name[0]}
									</span>
								</div>
							)} */}
						</div>
						<div className="profile-name">
							<h2>
								Welcome to your dashboard,{' '}
								{this.props.currentUser.name} !
							</h2>
							<h2 className="profile-email">
								{this.props.currentUser.email}
							</h2>

							<img
								className="avatar-picture-img"
								src={this.props.currentUser.imageUrl}
							/>
							<button onClick={this.addPetHandler}>
								add pet
							</button>
							{/* <Avatar
									style={{
										// height: 198,
										// width: '1rem',
										height: '3rem',
										width: '2rem',
										padding: '0 30',
										// padding: '100px 180px 20px',
										backgroundColor: 'red',
										// marginTop: '1rem',
										// border: 0,
										// backgroundColor: 'rgba(0,0,0,0)',
									}}
									size={100}
									alt="Remy Sharp"
									// src="https://www.fillmurray.com/500/900"
									src="https://lh3.googleusercontent.com/-lj2k8d-8niM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmFchW369z_e2Oz-qolZxpjIvm1DQ/s96-c/photo.jpg"
									// */}

							{/* <h2>
								Pet Name:{' '}
								{this.props.currentUser.pets[0].petName}
							</h2>
							<h2>
								Type: {this.props.currentUser.pets[0].petType}
							</h2>
							<h2>
								Breed: {this.props.currentUser.pets[0].breed}
							</h2>
							<h2>
								Age: {this.props.currentUser.pets[0].age} years
							</h2> */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
