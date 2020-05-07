import React from "react";
import Layout from "./hoc/Layout/Layout";
import { Redirect, Route, Switch } from "react-router-dom";
import Trucks from "./containers/Trucks/Trucks";

const App = props => (
    <React.Fragment>
        <Layout>
            <Switch>
                <Route path="/home" render={() => <p>Home</p>} />
                <Route path="/trucks" component={Trucks} />
                <Route path="/About" render={() => <p>About</p>} />
                <Redirect from="/" to="/home" />
            </Switch>
        </Layout>
    </React.Fragment>
);

export default App;
