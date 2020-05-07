import React from 'react';
import classes from './Sidedrawer.module.css';
import NavItems from '../Navigation/NavItems/NavItems';
import Backdrop from '../Backdrop/Backdrop';

const sideDrawer = props => {
    let attahedClasses = [classes.SideDrawer, classes.Close];

    if(props.show) {
        attahedClasses = [classes.SideDrawer, classes.Open];
    }

    return(
        <React.Fragment>
            <Backdrop show = {props.show} regularMode = {props.closed}/>
            <div className = {attahedClasses.join(' ')}>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </React.Fragment> 
        
    );
}

export default sideDrawer;
