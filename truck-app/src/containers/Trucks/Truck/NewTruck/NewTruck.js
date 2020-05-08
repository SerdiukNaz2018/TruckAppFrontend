import React, { Component } from "react";
import classes from "./NewTruck.module.css";
import Backdrop from "../../../../components/UI/Backdrop/Backdrop";
import axios from "axios";

class TruckInfo extends Component {
    state = {
        priceUSD: null,
        country: null,
        registrationPlate: null,
        yearGraduation: null,
        brand: null,
        model: null,
        imagePath: null,
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.visible !== this.props.visible;
    }

    addTruck = () => {
        console.log(this.state);
        console.log(this.state);
        axios
            .post("http://localhost:8088/api/truck", this.state)
            .then(response => {
                console.log(response);
                this.props.resetTruckList();
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <React.Fragment>
                <div
                    className={classes.NewTruck}
                    style={{
                        opacity: this.props.visible ? 1 : 0,
                        transform: this.props.visible
                            ? "translateY(0)"
                            : "translateY(-100vh)",
                    }}
                >
                    <ul>
                        <li>
                            Brand:{" "}
                            <select name="brand" id="brand" onChange = {event => {
                                this.setState({brand: event.target.value})
                            }}>
                                <option value="MAN_SE">MAN</option>
                                <option value="Renault">Renault</option>
                                <option value="TATA">TATA</option>
                                <option value="Volkswagen">Volkswagen</option>
                                <option value="BELAZ">BELAZ</option>
                            </select>
                        </li>
                        <li>
                            Model:{" "}
                            <input
                                onChange={event => {
                                    this.setState({
                                        model: event.target.value,
                                    });
                                }}
                                type="text"
                            />
                        </li>
                        <li>
                            Price ($):{" "}
                            <input
                                onChange={event => {
                                    this.setState({
                                        priceUSD: +event.target.value,
                                    });
                                }}
                                type="text"
                            />
                        </li>
                        <li>
                            License Plate:{" "}
                            <input
                                onChange={event => {
                                    this.setState({
                                        registrationPlate: event.target.value,
                                    });
                                }}
                                type="text"
                            />
                        </li>
                        <li>
                            Age (years):{" "}
                            <input
                                onChange={event => {
                                    this.setState({
                                        yearGraduation: +event.target.value,
                                    });
                                }}
                                type="text"
                            />
                        </li>
                        <li>
                            Image address:{" "}
                            <input
                                onChange={event => {
                                    this.setState({
                                        imagePath: event.target.value,
                                    });
                                }}
                                type="text"
                            />
                        </li>
                    </ul>
                    <div style={{ textAlign: "center" }}>
                        <button
                            style={{ borderRadius: "10px" }}
                            onClick={this.props.enableRegularMode}
                        >
                            Cancel
                        </button>
                        <button
                            style={{ borderRadius: "10px" }}
                            onClick={this.addTruck}
                        >
                            Add
                        </button>
                    </div>
                </div>
                <Backdrop
                    show={this.props.visible}
                    regularMode={this.props.enableRegularMode}
                />
            </React.Fragment>
        );
    }
}

export default TruckInfo;
