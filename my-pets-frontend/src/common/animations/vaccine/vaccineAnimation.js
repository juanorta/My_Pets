import React from 'react';
import Lottie from 'react-lottie';

import * as vaccineAnimation from './vaccine.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: vaccineAnimation.default,
	animationSpeed: 1.5,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const VaccineAnimation = () => {
	return (
		<div style={{}}>
			<Lottie options={defaultOptions} height="10%" width="180px" />
		</div>
	);
};

export default VaccineAnimation;
