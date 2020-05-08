import React, { Component } from "react";
import classes from "./TruckInfo.module.css";
import Backdrop from "../../../../components/UI/Backdrop/Backdrop";
import axios from "axios";

class TruckInfo extends Component {
    state = {
        price: this.props.price,
        country: this.props.country,
        registrationPlate: this.props.licensePlate,
        amountYear: this.props.years,
        brand: this.props.brand,
        model: this.props.model,
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.visible !== this.props.visible;
    }

    componentDidMount() { //dont forget to uncomment the code below!!!
        // axios
        //     .post('...', {from: this.props.currency, to: 'USD', price: this.props.price})
        //     .then(response => {
        //         this.setState({price: response.data});
        //     })
    }

    updateTruck = () => {
        console.log(this.state);
        axios
            .put(`http://localhost:8088/api/truck/${this.props.truckId}`, this.state)
            .then(response => {
                console.log(response);
                this.props.resetTruckList();
            })
            .catch(error => {
                console.log(error);
            });
    };

    deleteTruck = () => {
        axios
            .delete(`http://localhost:8088/api/truck/${this.props.truckId}`)
            .then(response => {
                console.log(response);
                this.props.resetTruckList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className={classes.TruckInfo}
                    style={{
                        opacity: this.props.visible ? 1 : 0,
                        transform: this.props.visible
                            ? "translateY(0)"
                            : "translateY(-100vh)",
                    }}
                >
                    <h3>
                        {this.props.brand} {this.props.model}
                    </h3>
                    <ul>
                        <li>
                            Price ($):{" "}
                            <input
                                onChange = {event => {this.setState({price: +event.target.value})}}
                                type="text"
                                defaultValue={this.props.price}
                            />
                        </li>
                        <li>
                            License Plate:{" "}
                            <input
                                onChange = {event => {this.setState({registrationPlate: event.target.value})}}
                                type="text"
                                defaultValue={this.props.licensePlate}
                            />
                        </li>
                        <li>
                            Country:{" "}
                            <input
                                onChange = {event => {this.setState({country: event.target.value})}}
                                type="text"
                                defaultValue={this.props.country}
                            />
                        </li>
                        <li>
                            Age (years):{" "}
                            <input
                                onChange = {event => {this.setState({amountYear: +event.target.value})}}
                                type="text"
                                defaultValue={this.props.years}
                            />
                        </li>
                    </ul>
                    <div style={{textAlign: 'center'}}>
                        <button
                            style={{ borderRadius: "10px" }}
                            onClick={this.props.enableRegularMode}
                        >
                            Cancel
                        </button>
                        <button
                            style={{ borderRadius: "10px" }}
                            onClick={this.updateTruck}
                        >
                            Apply
                        </button>
                        <button
                            style={{
                                borderRadius: "10px",
                                backgroundColor: "red",
                                width: "151px",
                            }}
                            onClick={() => {}}
                        >
                            Delete Truck
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
