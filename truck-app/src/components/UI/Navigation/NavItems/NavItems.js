import React from "react";
import classes from "./NavItems.module.css";
import NavItem from "./NavItem/NavItem";
import logo from "../../../../logo.png";

const navItems = () => (
    <ul className={classes.NavigationItems}>
        <NavItem link="/trucks" exact>
            <img src={logo} width="100px" height="30px" alt="logo" />
        </NavItem>
        <NavItem link="/about" exact>
            About
        </NavItem>
    </ul>
);

export default navItems;
