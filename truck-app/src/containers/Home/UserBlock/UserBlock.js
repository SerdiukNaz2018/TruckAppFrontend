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
                <Col md={6} style={classes.imageHolder}>
                    <img src={props.imagePath} alt="person" />
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
                                    <strong>age: </strong>
                                    {props.age}
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>sex: </strong> {props.sex}
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>status: </strong>
                                    {props.status}
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>e-mail: </strong>
                                    {props.email}
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>country: </strong>
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
