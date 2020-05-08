import React, { Component } from "react";
import classes from "./NewTruck.module.css";
import Backdrop from "../../../../components/UI/Backdrop/Backdrop";
import axios from "axios";
import Spinner from '../../../../components/UI/Spinner/Spinner';

class TruckInfo extends Component {
    state = {
        truckInformation: {
            priceUSD: null,
            country: null,
            registrationPlate: null,
            yearGraduation: null,
            brand: null,
            model: null
        },
        loading: false
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.visible !== this.props.visible || nextState.loading !== this.state.loading;
    }

    addTruck = () => {
        this.setState({loading: true});
        axios
            .post("http://localhost:8088/api/truck", this.state.truckInformation)
            .then(response => {
                this.setState({loading: false});
                this.props.enableRegularMode();
                this.props.resetTruckList();
            })
            .catch(error => {
                this.setState({loading: false});
                this.props.enableRegularMode();
                console.log(error);
            });
    };

    setValue = (event, key) => {
        const newState = {...this.state};
        newState.truckInformation[key] = event.target.value;
        this.setState(newState);
    }

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
                    {!this.state.loading ? <ul>
                        <li>
                            Brand:{" "}
                            <select name="brand" id="brand" onChange = {event => this.setValue(event, 'brand')}>
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
                                onChange={event => this.setValue(event, 'model')}
                                type="text"
                            />
                        </li>
                        <li>
                            Country:{" "}
                            <input
                                onChange={event => this.setValue(event, 'country')}
                                type="text"
                            />
                        </li>
                        <li>
                            Price ($):{" "}
                            <input
                                onChange={event => this.setValue(event, 'priceUSD')}
                                type="text"
                            />
                        </li>
                        <li>
                            License Plate:{" "}
                            <input
                                onChange={event => this.setValue(event, 'registrarionPlate')}
                                type="text"
                            />
                        </li>
                        <li>
                            Year:{" "}
                            <input
                                onChange={event => this.setValue(event, 'yearGraduation')}
                                type="text"
                            />
                        </li>
                        <li>
                            Image address:{" "}
                            <input
                                onChange={event => this.setValue(event, 'imagePath')}
                                type="text"
                            />
                        </li>
                    </ul> : <Spinner />}
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
