import React from 'react';
import Lottie from 'react-lottie';

import * as loading from './loadingbar.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: loading.default,
	animationSpeed: 1.5,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const Loading = () => {
	return (
		<div style={{}}>
			<Lottie options={defaultOptions} />
		</div>
	);
};

export default Loading;
