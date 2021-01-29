import React from 'react';
import Loading from '../common/animations/loading/loading';

export default function LoadingIndicator(props) {
	return (
		<div
			className="loading-indicator"
			style={{
				display: 'block',
				textAlign: 'center',
				marginTop: '30px',
				width: '100%',
			}}
		>
			<Loading />
		</div>
	);
}
