import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouteProfile = ({
	component: Component,
	authenticated,
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			authenticated ? (
				<Component {...rest} {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/login',
						state: { from: props.location },
					}}
				/>
			)
		}
	/>
);

export default PrivateRouteProfile;
