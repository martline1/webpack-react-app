import React        from "react";
import { Provider } from "react-redux";
import { render }   from "react-dom";

// Import Own Components
import HomePage  from "./components/HomePage/HomePage.jsx";
import AppBar    from "./components/AppBar/AppBar.jsx";
import Drawer    from "./components/Drawer/Drawer.jsx";
import Store     from "./config/store/Store.jsx";
import "./index.scss";

const appContainer = document.querySelector("#app-container");

render(
	<Provider store={Store}>
		<AppBar />
		<Drawer />
		<div className="bg">
			<HomePage />
		</div>
	</Provider>,
	appContainer
);
