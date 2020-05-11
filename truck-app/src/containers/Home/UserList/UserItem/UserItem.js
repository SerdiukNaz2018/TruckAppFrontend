import React from "react";
import classes from "./UserItem.module.css";
import { Row, Col } from "react-bootstrap";

const userItem = props => (
    <div className={classes.UserItem}>
        <Row>
            <Col md={6}>
                <img src={props.source} alt="user" />
            </Col>
            <Col md={6}>
                <ul>
                    <li>Name: {props.name}</li>
                    <li>Age: {props.age}</li>
                    <li>Country: {props.country}</li>
                </ul>
            </Col>
        </Row>
    </div>
);

export default userItem;
