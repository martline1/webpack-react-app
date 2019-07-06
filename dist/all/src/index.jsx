import React                     from "react";
import { Provider }              from "react-redux";
import { render }                from "react-dom";
import { Router, Route, Switch } from "react-router-dom";

// Import Own Components
import AppRoutes from "./config/routes/AppRoutes.jsx";
import AppBar    from "./components/AppBar/AppBar.jsx";
import Drawer    from "./components/Drawer/Drawer.jsx";
import Store     from "./config/store/Store.jsx";
import history   from "./config/helpers/history";
import "./index.scss";

const appContainer = document.querySelector("#app-container");

render(
	<Router history={history}>
		<Provider store={Store}>
			<AppBar />
			<Drawer />
			<div className="bg">
				<Switch>
					{ AppRoutes.map(route => (
						<Route {...route} key={route.path || "not_found"} />
					)) }
				</Switch>
			</div>
		</Provider>
	</Router>,
	appContainer
);
