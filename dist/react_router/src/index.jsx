import React                     from "react";
import { render }                from "react-dom";
import { Router, Route, Switch } from "react-router-dom";

// Import Own Components
import AppRoutes from "./config/routes/AppRoutes.jsx";
import history   from "./config/helpers/history";
import "./index.scss";

const appContainer = document.querySelector("#app-container");

render(
	<Router history={history}>
		<div className="bg">
			<Switch>
				{ AppRoutes.map(route => (
					<Route {...route} key={route.path || "not_found"} />
				)) }
			</Switch>
		</div>
	</Router>,
	appContainer
);
