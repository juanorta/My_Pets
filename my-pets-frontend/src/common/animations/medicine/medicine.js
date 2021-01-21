import React from 'react';
import Lottie from 'react-lottie';

import * as medicineAnimation from './medicine-new.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: medicineAnimation.default,
	animationSpeed: 1.5,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const MedicineAnimation = () => {
	return (
		<div style={{}}>
			<Lottie options={defaultOptions} height="10%" width="180px" />
		</div>
	);
};

export default MedicineAnimation;
