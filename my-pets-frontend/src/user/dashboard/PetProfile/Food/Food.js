import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FoodTable from './FoodTable/FoodTable';
import FoodCards from './FoodCards/FoodCards';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	CardView: {
		color: '#1b2737',
	},
	CardViewSelected: {
		borderBottom: '3px solid #ff4f00',
	},
	TableView: {
		color: '#1b2737',
	},

	TableViewSelected: {
		borderBottom: '3px solid #ff4f00',
	},
}));

export default function Food(props) {
	const theme = useTheme();
	const classes = useStyles();
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [pet, setPet] = useState(props.pet);
	const [cardViewSelected, setCardViewSelected] = useState(true);
	const [tableViewSelected, setTableViewSelected] = useState(false);
	const [cardStyle, setCardStyle] = useState(classes.CardViewSelected);
	const [tableStyle, setTableStyle] = useState(classes.TableView);
	const [isDashboard, setIsDashboard] = useState(false);
	const small = useMediaQuery(theme.breakpoints.down('sm'));

	let width = '70%';

	if (small) {
		width = '90%';
	}

	const cardViewHandler = () => {
		console.log('card view clicked');
		setTableViewSelected(false);
		setCardViewSelected(true);
		setCardStyle(classes.CardViewSelected);
		setTableStyle(classes.TableView);
	};
	const tableViewHandler = () => {
		console.log('table view clicked');
		setCardViewSelected(false);
		setTableViewSelected(true);
		setTableStyle(classes.TableViewSelected);
		setCardStyle(classes.CardView);
	};

	return (
		<div className="appointments-profile-main-container">
			<div className="appointments-title">
				<h1>Food</h1>
				<ul className="view-selector-group">
					<li className={cardStyle} onClick={cardViewHandler}>
						<h2 style={{ fontWeight: '500' }}>Card View</h2>
					</li>
					<li className={tableStyle} onClick={tableViewHandler}>
						<h2 style={{ fontWeight: '500' }}>Table View</h2>
					</li>
				</ul>
			</div>
			{tableViewSelected ? (
				<FoodTable
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}
			{cardViewSelected ? (
				<FoodCards
					isDashboard={isDashboard}
					forceUpdate={props.forceUpdate}
					currentUser={currentUser}
					pet={pet}
					changeDefaultViewsAndRefresh={
						props.changeDefaultViewsAndRefresh
					}
				/>
			) : null}
		</div>
	);
}
