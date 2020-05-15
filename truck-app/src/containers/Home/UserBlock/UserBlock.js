import React from "react";
import classes from "./UserBlock.module.css";
import { Row, Col } from "react-bootstrap";

const userBlock = props => {
    const reload = () => {
        window.location.reload(false);
    }
    return (
        <div className={classes.UserBlock}>
        <Row>
            <Col md={6} style={classes.imageHolder}>
                <img src={props.imagePath} alt="person" />
            </Col>
            <Col md={6}>
                <h1>
                    {props.name}
                </h1>
                <ul>
                    <li><p><strong>age: </strong>{props.age}</p></li>
                    <li><p><strong>sex: </strong> {props.sex}</p></li>
                    <li><p><strong>status: </strong>{props.status}</p></li>
                    <li><p><strong>date of birth: </strong>{props.dateOfBirth}</p></li>
                    <li><p><strong>e-mail: </strong>{props.email}</p></li>
                    <li><p><strong>country: </strong>{props.country}</p></li>
                    <button style = {{position: 'absolute', top: '5px', right: '20px'}} onClick = {reload}>Log Out</button>
                </ul>
            </Col>
        </Row>
    </div>
    );
};

export default userBlock;
