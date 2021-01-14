import React from 'react';
import Lottie from 'react-lottie';

import * as foodAnimation from './food.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: foodAnimation.default,
	animationSpeed: 1.5,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const FoodAnimation = () => {
	return (
		<div>
			<Lottie
				options={defaultOptions}
				height="10%"
				width="180px"
				// style={{ marginTop: '3rem' }}
			/>
		</div>
	);
};

export default FoodAnimation;
