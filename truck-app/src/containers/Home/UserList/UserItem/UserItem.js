import React from "react";
import classes from "./UserItem.module.css";
import { Row, Col } from "react-bootstrap";
import Truck from "../../../Trucks/Truck/Truck";
import { Component } from "react";

class UserItem extends Component {
    state = {
        showTrucks: false
    }

    trucksToggle = () => {
        this.setState({showTrucks: !this.state.showTrucks});
    }

    render () {
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
    
        return (
            <div className={classes.UserItem} onClick = {this.trucksToggle}>
                <Row>
                    <Col md={6}>
                        <img src={this.props.source} alt="user" />
                    </Col>
                    <Col md={6}>
                        <ul>
                            <li>Name: {this.props.name}</li>
                            <li>Age: {this.props.age}</li>
                            <li>Country: {this.props.country}</li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    {this.state.showTrucks ? trucks : null}
                </Row>
            </div>
        );
    }
    
};

export default UserItem;
