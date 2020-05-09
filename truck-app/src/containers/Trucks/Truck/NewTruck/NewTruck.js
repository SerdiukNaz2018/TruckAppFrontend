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
            brandSearch: 'MAN_SE',
            brand: 'MAN',
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

    convertPriceYearToFloat = () => {
        const newState = {...this.state};
        newState.truckInformation.priceUSD = +this.state.truckInformation.priceUSD;
        newState.truckInformation.yearGraduation = +this.state.truckInformation.yearGraduation;
        this.setState(newState);
    }

    addTruck = () => {
        this.convertPriceYearToFloat();
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

    setValue = (event, key) => {
        const newState = { ...this.state };
        newState.truckInformation[key] = event.target.value;
        this.setState(newState);
    };

    setBrand = event => {
        const newState = {...this.state};
        newState.truckInformation.brandSearch = event.target.value.name1;
        newState.truckInformation.brand = event.target.value.name2;
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
                    {!this.state.loading ? (
                        <ul>
                            <li>
                                Brand:{" "}
                                <select
                                    name="brand"
                                    id="brand"
                                    defaultValue="MAN_SE"
                                    onChange={event => this.setBrand(event)}
                                >
                                    <option value={{name1: "MAN_SE", name2: "MAN"}}>MAN</option>
                                    <option value={{name1:"Renault", name2: "RENAULT"}}>RENAULT</option>
                                    <option value={{name1:"Tata_Group",name2:"TATA"}}>TATA</option>
                                    <option value={{name1:"DAF_Trucks",name2:"DAF"}}>DAF</option>
                                    <option value={{name1:"Iveco",name2:"IVECO"}}>IVECO</option>
                                    <option value={{name1:"Mercedes-Benz", name2:"Mercedes-Benz"}}>Mercedes-Benz</option>
                                    <option value={{name1:"Volkswagen",name2:"Volkswagen"}}>Volkswagen</option>
                                    <option value={{name1:"Volvo",name2:"VOLVO"}}>VOLVO</option>
                                    <option value={{name1:"GAZ", name2:"GAZ"}}>GAZ</option>
                                    <option value={{name1:"Kamaz", name2:"KAMAZ"}}>KAMAZ</option>
                                    <option value={{name1:"UAZ", name2:"KAMAZ"}}>UAZ</option>
                                    <option value={{name1:"ZiL", name2:"ZIL"}}>ZIL</option>
                                    <option value={{name1:"KrAZ",name2:"KRAZ"}}>KRAZ</option>
                                    <option value={{name1:"BelAZ",name2:"BELAZ"}}>BELAZ</option>
                                    <option value={{name1:"Minsk_Automobile_Plant",name2:"MAZ"}}>MAZ</option>
                                    <option value={{name1:"ZAZ",name2:"ZAZ"}}>ZAZ</option>
                                </select>
                            </li>
                            <li>
                                Model:{" "}
                                <input
                                    onChange={event =>
                                        this.setValue(event, "model")
                                    }
                                    type="text"
                                />
                            </li>
                            <li>
                                Price ($):{" "}
                                <input
                                    onChange={event =>
                                        this.setValue(event, "priceUSD")
                                    }
                                    type="text"
                                />
                            </li>
                            <li>
                                License Plate:{" "}
                                <input
                                    onChange={event =>
                                        this.setValue(
                                            event,
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
                                        this.setValue(event, "yearGraduation")
                                    }
                                    type="text"
                                />
                            </li>
                            <li>
                                Image address:{" "}
                                <input
                                    onChange={event =>
                                        this.setValue(event, "imagePath")
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
