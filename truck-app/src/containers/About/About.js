import React from 'react';
import classes from './About.module.css';
import BrandInfo from '../../components/BrandInfo/BrandInfo';

const About = props => (
    <div className = {classes.About}>
        <p>Some text about this WEB-site...</p>
        <BrandInfo />
    </div>
);

export default About;
