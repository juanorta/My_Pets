import React from 'react';
import Loading from '../common/animations/loading/loading';

export default function LoadingIndicator(props) {
	return (
		<div
			className="loading-indicator"
			style={{
				backgroundColor: 'transparent',
				height: '0.5rem',
				display: 'block',
				textAlign: 'center',
				marginTop: '1rem',
				width: '100%',
			}}
		>
			<Loading />
		</div>
	);
}
