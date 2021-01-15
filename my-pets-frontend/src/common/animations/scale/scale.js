import React from 'react';
import Lottie from 'react-lottie';

import * as weightAnimation from './weight-animation-accent2.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: weightAnimation.default,
	animationSpeed: 1.5,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const ScaleAnimation = () => {
	return (
		<div style={{}}>
			<Lottie options={defaultOptions} height="10%" width="340px" />
		</div>
	);
};

export default ScaleAnimation;
