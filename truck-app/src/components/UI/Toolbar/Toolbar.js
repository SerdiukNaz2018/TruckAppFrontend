import React from 'react';
import classes from './Toolbar.module.css';
import NavItems from '../Navigation/NavItems/NavItems';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

const toolbar = props => (
    <header className = {classes.Toolbar}>
        <DrawerToggle openSideDrawer = {props.drawerToggleClicked}/>
        <nav className = {classes.DesktopOnly}>
            <NavItems />
        </nav>
    </header>
);

export default toolbar;
