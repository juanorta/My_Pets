import React from 'react';
import Lottie from 'react-lottie';

import * as loading from './dog-loading.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: loading.default,
	animationSpeed: 2.5,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const Loading = () => {
	return (
		<div style={{ backgroundColor: 'transparent', marginTop: '10rem' }}>
			<Lottie options={defaultOptions} />
		</div>
	);
};

export default Loading;
