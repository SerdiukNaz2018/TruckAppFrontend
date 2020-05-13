import React from "react";
import classes from "./UserBlock.module.css";
import { Row, Col } from "react-bootstrap";

const userBlock = props => (
    <div className={classes.UserBlock}>
        <Row>
            <Col md={6}>
                <img src={props.imagePath} alt="person" />
            </Col>

            <Col md={6}>
                <h1>
                    {props.name}
                </h1>
                <ul>
                    <li><p>age: {props.age}</p></li>
                    <li><p>sex: {props.sex}</p></li>
                    <li><p>status: {props.status}</p></li>
                    <li><p>date of birth: {props.dateOfBirth}</p></li>
                    <li><p>e-mail: {props.email}</p></li>
                </ul>
            </Col>
        </Row>
    </div>
);

export default userBlock;
