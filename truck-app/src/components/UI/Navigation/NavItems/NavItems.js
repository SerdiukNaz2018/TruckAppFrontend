import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = () => (
    <ul className = {classes.NavigationItems}>
        <NavItem link = '/home' exact>Home</NavItem>
        <NavItem link = '/trucks' exact>Trucks</NavItem>
        <NavItem link = '/about' exact>About</NavItem>
    </ul>
);

export default navItems;
