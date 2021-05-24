import React from 'react';
import Lottie from 'react-lottie';

import * as spinnerAnimation from './spinner.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: spinnerAnimation.default,
	animationSpeed: 1.5,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const SpinnerAnimation = () => {
	return (
		<div style={{ marginTop: '5px' }}>
			<Lottie options={defaultOptions} width="1rem" />
		</div>
	);
};

export default SpinnerAnimation;
