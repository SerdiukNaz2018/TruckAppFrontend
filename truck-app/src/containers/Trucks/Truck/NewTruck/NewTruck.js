import React, { Component } from "react";
import classes from "./NewTruck.module.css";
import Backdrop from "../../../../components/UI/Backdrop/Backdrop";
import axios from "axios";
import Spinner from "../../../../components/UI/Spinner/Spinner";

class TruckInfo extends Component {
    state = {
        truckInformation: {
            priceUSD: null,
            registrationPlate: null,
            yearGraduation: null,
            brandSearch: "MAN_SE",
            brand: "MAN",
            model: null,
            userId: this.props.userId,
        },
        priceError: "",
        plateError: "",
        yearError: "",
        modelError: "",
    };

    validate = () => {
        this.setState({priceError: "", plateError: "", modelError: "", yearError: ""});

        let pricePattern = /^\+?(0|[1-9]\d*)$/;
        let platePattern = /^[A-Za-z]{2}[0-9]{4}[A-Za-z]{2}$/;
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

        if (!platePattern.test(this.state.truckInformation.registrationPlate)) {
            this.setState({ plateError: "*The form of license plate must be: 'DD1111DD'" });
            check = false;
        }

        if (!modelPattern.test(this.state.truckInformation.model)) {
            this.setState({ modelError: "*Model should not contain any special caracters" });
            check = false;
        }

        return check;
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.visible !== this.props.visible ||
            nextState.loading !== this.state.loading ||
            nextState.priceError !== this.state.priceError ||
            nextState.plateError !== this.state.plateError ||
            nextState.modelError !== this.state.modelError ||
            nextState.yearError !== this.state.yearError
        );
    }

    addTruck = () => {
        let valid = this.validate();
        if (valid) {
            this.setState({
                loading: true,
                
            });
            axios
                .post(
                    "http://localhost:8088/api/truck",
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

    setValue = (value, key) => {
        const newState = { ...this.state };
        newState.truckInformation[key] = value;
        this.setState(newState);
    };

    setBrand = event => {
        const newState = { ...this.state };
        const names = event.target.value.split(" ");
        newState.truckInformation.brandSearch = names[0];
        newState.truckInformation.brand = names[1];
        this.setState(newState);
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
                    {!this.state.loading ? (
                        <ul>
                            <li>
                                Brand:{" "}
                                <select
                                    name="brand"
                                    id="brand"
                                    defaultValue={
                                        this.state.truckInformation.brand
                                    }
                                    onChange={event => this.setBrand(event)}
                                >
                                    <option value="MAN_SE MAN">MAN</option>
                                    <option value="Renault RENAULT">
                                        RENAULT
                                    </option>
                                    <option value="Tata_Group TATA">
                                        TATA
                                    </option>
                                    <option value="DAF_Trucks DAF">DAF</option>
                                    <option value="Iveco IVECO">IVECO</option>
                                    <option value="Mercedes-Benz Mercedes-Benz">
                                        Mercedes-Benz
                                    </option>
                                    <option value="Volkswagen Volkswagen">
                                        Volkswagen
                                    </option>
                                    <option value="Volvo VOLVO">VOLVO</option>
                                    <option value="GAZ GAZ">GAZ</option>
                                    <option value="Kamaz KAMAZ">KAMAZ</option>
                                    <option value="UAZ KAMAZ">UAZ</option>
                                    <option value="ZiL ZIL">ZIL</option>
                                    <option value="KrAZ KRAZ">KRAZ</option>
                                    <option value="Minsk_Automobile_Plant MAZ">
                                        MAZ
                                    </option>
                                    <option value="ZAZ ZAZ">ZAZ</option>
                                </select>
                            </li>
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
                                />
                                <div style={{ color: "red" }}>
                                    {this.state.priceError}
                                </div>
                            </li>
                            <li>
                                License Plate:{" "}
                                <input
                                    onChange={event =>
                                        this.setValue(
                                            event.target.value,
                                            "registrationPlate"
                                        )
                                    }
                                    type="text"
                                />
                                <div style={{ color: "red" }}>
                                    {this.state.plateError}
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
                                />
                                <div style={{ color: "red" }}>
                                    {this.state.yearError}
                                </div>
                            </li>
                            <li>
                                Image address:{" "}
                                <input
                                    onChange={event =>
                                        this.setValue(
                                            event.target.value,
                                            "imagePath"
                                        )
                                    }
                                    type="text"
                                />
                            </li>
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
