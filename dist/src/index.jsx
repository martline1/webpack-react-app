import React                     from "react";
import { render }                from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory      from "history/createBrowserHistory";

// Import Own Components
import app from "./app.jsx";
import "./index.scss";

const history      = createBrowserHistory();
const appContainer = document.querySelector("#app-container");

render(
    <Router history={history}>
        <div className="bg">
            {/* App routes */}
            <Switch>
                <Route path="/" exact component={app} />
                <Route component={props => <h1>404 Not Found</h1> } />
            </Switch>
        </div>
    </Router>,
    appContainer
);
