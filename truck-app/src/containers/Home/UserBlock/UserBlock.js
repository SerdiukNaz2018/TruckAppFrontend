import React from "react";
import classes from "./UserBlock.module.css";
import { Row, Col } from "react-bootstrap";

const userBlock = props => {
    const reload = () => {
        window.location.reload(false);
    };
    return (
        <div className={classes.UserBlock}>
            <Row>
                <Col md={6} style = {{overflow: 'hidden'}}>
                    <img src={props.imagePath} alt="person"/>
                </Col>
                <Col md={6}>
                    <Row>
                        <Col md={6}>
                            <h1>{props.name}</h1>
                        </Col>
                        <Col md={6}>
                            <div
                                style={{ display: "block", textAlign: "right" }}
                            >
                                <button onClick={reload}>Log Out</button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <ul>
                            <li>
                                <p>
                                    <img className = {classes.Icon} src="https://image.flaticon.com/icons/svg/2720/2720599.svg" alt="age"/>
                                    {props.age} years
                                </p>
                            </li>
                            <li>
                                <img className = {classes.Icon} src="https://image.flaticon.com/icons/svg/2847/2847940.svg" alt="sex"/>
                                {props.sex}
                            </li>
                            <li>
                                <p>
                                    <img className = {classes.Icon} src="https://image.flaticon.com/icons/svg/2705/2705056.svg" alt="status"/>
                                    {props.status}
                                </p>
                            </li>
                            <li>
                                <p>
                                    <img className = {classes.Icon} src="https://image.flaticon.com/icons/svg/726/726623.svg" alt="email"/>
                                    {props.email}
                                </p>
                            </li>
                            <li>
                                <p>
                                    <img className = {classes.Icon} src="https://image.flaticon.com/icons/svg/854/854929.svg" alt="country"/>
                                    {props.country}
                                </p>
                            </li>
                        </ul>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default userBlock;
