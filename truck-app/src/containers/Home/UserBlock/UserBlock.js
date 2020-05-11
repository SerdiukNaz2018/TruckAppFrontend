import React from 'react';
import classes from './UserBlock.module.css';

const userBlock = props => (
    <div className = {classes.UserBlock}>
        <p>{props.name}</p>
        <p>{props.age}</p>
        <p>{props.status}</p>
        <p>{props.dateOfBirth}</p>
        <p>{props.email}</p>
        <p>{props.sex}</p>
        <p>{props.imagePath}</p>
    </div>
);

export default userBlock;
