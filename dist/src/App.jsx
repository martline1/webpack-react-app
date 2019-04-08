import React      from "react";
import { Helmet } from "react-helmet";

import "./App.scss";

const App = props => (
    <>
        <Helmet>
            <title>App</title>
        </Helmet>
        
        <div className="App">
            <h1>Hi there, this is HomePage at /</h1>
        </div>
    </>
);

export default App;
