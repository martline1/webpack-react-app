import React from "react";

// Import Own Components
import HomePage from "../../pages/HomePage.jsx";

const AppRoutes = [
	{
		path      : "/",
		component : props => <HomePage {...props} />,
		exact     : true,
	},
	{
		component : props => <h1>404 Not Found</h1>,
	},
];

export default AppRoutes;
