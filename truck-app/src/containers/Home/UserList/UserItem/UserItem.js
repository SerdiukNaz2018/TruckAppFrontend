import React from "react";
import classes from "./UserItem.module.css";
import { Row, Col } from "react-bootstrap";
import Truck from "../../../Trucks/Truck/Truck";
import { Component } from "react";
import axios from "axios";

class UserItem extends Component {
    state = {
        showTrucks: false,
        status: this.props.isActive,
    };

    trucksToggle = () => {
        this.setState({ showTrucks: !this.state.showTrucks });
    };

    activeBannedToggle = () => {
        axios.put(`http://localhost:8088/api/user/${this.props.userId}`, { isActive: !this.state.status });
        this.setState({ status: !this.state.status });
    };

    render() {
        const trucks = this.props.trucks.map(truck => (
            <Truck
                key={truck.id}
                truckId={truck.id}
                brand={truck.brand}
                model={truck.model}
                priceUSD={truck.priceUSD}
                priceEUR={truck.priceEUR}
                priceUAH={truck.priceUAH}
                yearGraduation={truck.yearGraduation}
                years={truck.amountYear}
                country={truck.country}
                licensePlate={truck.registrationPlate}
                source={truck.imagePath}
                admin={false}
                preview
            />
        ));

        let status;
        if (this.state.status) {
            status = (
                <button
                    style={{
                        borderRadius: "10px",
                        color: "white",
                        backgroundColor: "green",
                    }}
                    onClick={this.activeBannedToggle}
                >
                    active
                </button>
            );
        } else {
            status = (
                <button
                    style={{
                        borderRadius: "10px",
                        color: "white",
                        backgroundColor: "red",
                    }}
                    onClick={this.activeBannedToggle}
                >
                    banned
                </button>
            );
        }

        return (
            <div className={classes.UserItem}>
                <Row>
                    <Col md={6}>
                        <img
                            src={this.props.source}
                            width="100%"
                            height="100%"
                            alt="user"
                        />
                    </Col>
                    <Col md={6}>
                        <ul>
                            <li>Name: {this.props.name}</li>
                            <li>Age: {this.props.age}</li>
                            <li>Country: {this.props.country}</li>
                            <li>{status}</li>
                        </ul>
                        <button
                            style={{
                                width: "60%",
                                borderRadius: "10px",
                                backgroundColor: "rgb(61, 83, 83)",
                                color: "white",
                            }}
                            onClick={this.trucksToggle}
                        >
                            Show Trucks
                        </button>
                    </Col>
                </Row>
                <Row>{this.state.showTrucks ? trucks : null}</Row>
            </div>
        );
    }
}

export default UserItem;
