import React from 'react';
import Lottie from 'react-lottie';

import * as markerAnimation from './marker-new.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: markerAnimation.default,
	animationSpeed: 1.5,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const MarkerAnimation = () => {
	return (
		<div style={{}}>
			<Lottie options={defaultOptions} height="10%" width="180px" />
		</div>
	);
};

export default MarkerAnimation;
