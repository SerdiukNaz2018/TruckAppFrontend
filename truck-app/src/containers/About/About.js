import React from 'react';
import classes from './About.module.css';
import BrandInfo from '../../components/BrandInfo/BrandInfo';
import errorMessage from '../../errorMessage.jpg';

const About = props => (
    <div className = {classes.About}>
        <h3>Why</h3>
        <p>The main idea was to apply our initial knowledge on WEB.</p>
        <h3>Duration</h3>
        <p>We have been working on the project for a week. The page was created on 15  May 2020.</p>
        <h3>Features</h3>
        <ul>
            <li><p><strong>HTML parser</strong><br/>We parsed the WIKI pages to find out the headquarter and logo of the current car like this:</p><BrandInfo /></li>
            <li><p>We use PrivatBank API for converting truck price into another currency.</p></li>
            <li><p>We exploit auto mappers to convert from DTO to Entities.</p></li>
            <li><p>We followed REST architecture in our project.</p></li>
            <li><p>The main React feature is, of course, component-based architecture, so we used it as there is a lot of list-item in our project.</p></li>
            <li><p>This WEB site is adaptive for the devices of any size (desktop, tablet, smartphone).</p></li>
        </ul>
        <h3>What was the most difficult</h3>
        <ul>
            <li><h4>Cors Policy</h4> 
                <p>Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served</p>
                <img src={errorMessage} width= "70%" height= "30%"alt="error"/>
            </li>
            <li>
                <p>As React requires the knowledge of the pretty big amount of third-party libraries it was not so easy to handle some of them: ‘react-router’ for making out single page application a multi-page one, ‘react-bootstrap’ for easier styling, most of it was custom, though. Also, the ‘axios’ library was used for sending requests.</p>
            </li>
            
        </ul>
        <h3>Environment</h3>
        <ul>
            <li>Frontend: <strong>React.js</strong></li>
            <li>Backend: <strong>ASP.Net Core, Web API</strong></li>
        </ul>
        <h3>Github</h3>
        <ul>
            <li><p><a href = "https://github.com/SerdiukNaz2018/TruckAppFrontend">Frontend</a></p></li>
            <li><p><a href = "https://github.com/YuriyBen/TruckAppBackend">Backend</a></p></li>
        </ul>
        
    </div>
);

export default About;
