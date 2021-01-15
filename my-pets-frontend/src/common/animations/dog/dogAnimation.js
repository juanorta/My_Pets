import React from 'react';
import Lottie from 'react-lottie';

import * as dogAnimation from './dog-animation-accent.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: dogAnimation.default,
	animationSpeed: 1.5,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const DogAnimation = () => {
	return (
		<div style={{}}>
			<Lottie options={defaultOptions} height="10%" width="190px" />
		</div>
	);
};

export default DogAnimation;
