import React from "react";
import Layout from "./hoc/Layout/Layout";
import { Redirect, Route, Switch } from "react-router-dom";
import Trucks from "./containers/Trucks/Trucks";
import Home from "./containers/Home/Home";
import About from "./containers/About/About";

const App = props => (
    <React.Fragment>
        <Layout>
            <Switch>
                <Route path="/home" component = {Home} />
                <Route path="/trucks" component={Trucks} />
                <Route path="/About" component = {About} />
                <Redirect from="/" to="/home" />
            </Switch>
        </Layout>
    </React.Fragment>
);

export default App;
