import React from 'react';
import Loading from '../common/animations/loading/loading';

export default function LoadingIndicator(props) {
	return (
		<div
			className="loading-indicator"
			style={{
				backgroundColor: 'transparent',
				height: '10%',
				display: 'block',
				textAlign: 'center',
				marginTop: '12%',
				margin: '0 auto',
				width: '20%',
			}}
		>
			<Loading />
		</div>
	);
}
