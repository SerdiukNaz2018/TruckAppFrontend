import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/UI/Toolbar/Toolbar";
import SideDrawer from '../../components/UI/Sidedrawer/Sidedrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    disableSideDrawer = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}));
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/>
                <SideDrawer show = {this.state.showSideDrawer} closed = {this.disableSideDrawer}/>
                <main className={classes.Content}>{this.props.children}</main>
            </React.Fragment>
        );
    }
}

export default Layout;
