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
        },
        loading: false,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.visible !== this.props.visible ||
            nextState.loading !== this.state.loading
        );
    }

    addTruck = () => {
        console.log(this.truckInformation);
        console.log(this.state.truckInformation);
        this.setState({ loading: true });
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
