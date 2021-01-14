import React from 'react';
import Lottie from 'react-lottie';

import * as vetAnimation from './vet.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: vetAnimation.default,
	animationSpeed: 1.5,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const VetAnimation = () => {
	return (
		<div style={{}}>
			<Lottie options={defaultOptions} height="10%" width="180px" />
		</div>
	);
};

export default VetAnimation;
