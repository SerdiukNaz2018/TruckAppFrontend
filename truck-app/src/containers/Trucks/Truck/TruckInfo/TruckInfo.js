import React, { Component } from "react";
import classes from "./TruckInfo.module.css";
import Backdrop from "../../../../components/UI/Backdrop/Backdrop";
import axios from "axios";
import Spinner from "../../../../components/UI/Spinner/Spinner";

class TruckInfo extends Component {
    state = {
        truckInformation: {
            priceUSD: this.props.priceUSD,
            //country: this.props.country,
            //registrationPlate: this.props.licensePlate,
            yearGraduation: this.props.year,
            //brand: this.props.brand,
            model: this.props.model,
        },
        priceError: "",
        yearError: "",
        modelError: "",
        loading: false,
    };

    validate = () => {
        this.setState({
            priceError: "",
            modelError: "",
            yearError: "",
        });

        let pricePattern = /^\+?(0|[1-9]\d*)$/;
        let yearPattern = /^(19[0-9][0-9]|20[0-1][0-9]|2020)$/;
        let modelPattern = /^[a-zA-Z 0-9]+$/;
        let check = true;

        if (!pricePattern.test(this.state.truckInformation.priceUSD)) {
            this.setState({ priceError: "*Price has to be an integer" });
            check = false;
        }

        if (!yearPattern.test(this.state.truckInformation.yearGraduation)) {
            this.setState({ yearError: "*Year has to be an integer" });
            check = false;
        }

        if (!modelPattern.test(this.state.truckInformation.model)) {
            this.setState({
                modelError: "*Model should not contain any special caracters",
            });
            check = false;
        }

        return check;
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.visible !== this.props.visible ||
            this.state.loading !== nextState.loading ||
            nextState.priceError !== this.state.priceError ||
            nextState.modelError !== this.state.modelError ||
            nextState.yearError !== this.state.yearError
        );
    }

    setValue = (value, key) => {
        const newState = { ...this.state };
        newState.truckInformation[key] = value;
        this.setState(newState);
    };

    updateTruck = () => {
        const valid = this.validate();
        if (valid) {
            this.setState({ loading: true });
            axios
                .put(
                    `http://localhost:8088/api/truck/${this.props.truckId}`,
                    this.state.truckInformation
                )
                .then(response => {
                    this.setState({ loading: false });
                    this.props.enableRegularMode();
                    this.props.resetTruckList();
                })
                .catch(error => {
                    this.setState({ loading: false });
                    this.props.enableRegularMode();
                    console.log(error);
                });
        }
    };

    deleteTruck = () => {
        this.setState({ loading: true });
        axios
            .delete(`http://localhost:8088/api/truck/${this.props.truckId}`)
            .then(response => {
                this.setState({ loading: false });
                this.props.enableRegularMode();
                console.log(response);
                this.props.resetTruckList();
            })
            .catch(error => {
                this.setState({ loading: false });
                this.props.enableRegularMode();
                console.log(error);
            });
    };

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
                    <h3>{this.props.brand}</h3>
                    {!this.state.loading ? (
                        <ul>
                            <li>
                                Model:{" "}
                                <input
                                    onChange={event =>
                                        this.setValue(
                                            event.target.value,
                                            "model"
                                        )
                                    }
                                    type="text"
                                    defaultValue={this.props.model}
                                />
                                <div style={{ color: "red" }}>
                                    {this.state.modelError}
                                </div>
                            </li>
                            <li>
                                Price ($):{" "}
                                <input
                                    onChange={event =>
                                        this.setValue(
                                            +event.target.value,
                                            "priceUSD"
                                        )
                                    }
                                    type="text"
                                    defaultValue={this.props.priceUSD}
                                />
                                <div style={{ color: "red" }}>
                                    {this.state.priceError}
                                </div>
                            </li>
                            <li>
                                Year:{" "}
                                <input
                                    onChange={event =>
                                        this.setValue(
                                            +event.target.value,
                                            "yearGraduation"
                                        )
                                    }
                                    type="text"
                                    defaultValue={this.props.year}
                                />
                            </li>
                            <div style={{ color: "red" }}>
                                {this.state.yearError}
                            </div>
                        </ul>
                    ) : (
                        <Spinner />
                    )}
                    <div style={{ textAlign: "center" }}>
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
                            onClick={this.deleteTruck}
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
