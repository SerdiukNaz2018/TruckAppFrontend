import React, { Component } from "react";
import classes from "./TruckInfo.module.css";
import Backdrop from "../../../../components/UI/Backdrop/Backdrop";
import axios from "axios";
import Spinner from '../../../../components/UI/Spinner/Spinner';

class TruckInfo extends Component {
    state = {
        truckInformation: {
            priceUSD: this.props.priceUSD,
            //country: this.props.country,
            //registrationPlate: this.props.licensePlate,
            yearGraduation: this.props.year,
            //brand: this.props.brand,
            model: this.props.model
        },
        loading: false
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.visible !== this.props.visible || this.state.loading !== nextState.loading;
    }

    componentDidMount() { //dont forget to uncomment the code below!!!
        // axios
        //     .post('...', {from: this.props.currency, to: 'USD', price: this.props.price})
        //     .then(response => {
        //         this.setState({price: response.data});
        //     })
    }

    setValue = (value, key) => {
        const newState = {...this.state};
        newState.truckInformation[key] = value;
        this.setState(newState);
    }

    updateTruck = () => {
        console.log(`http://localhost:8088/api/truck/${this.props.truckId}`, this.state.truckInformation);
        this.setState({loading: true});
        axios
            .put(`http://localhost:8088/api/truck/${this.props.truckId}`, this.state.truckInformation)
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

    deleteTruck = () => {
        this.setState({loading: true})
        axios
            .delete(`http://localhost:8088/api/truck/${this.props.truckId}`)
            .then(response => {
                this.setState({loading: false});
                this.props.enableRegularMode();
                console.log(response);
                this.props.resetTruckList();
            })
            .catch(error => {
                this.setState({loading: false});
                this.props.enableRegularMode();
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
                        {this.props.brand}
                    </h3>
                    {!this.state.loading ? 
                        <ul>
                            <li>
                            Model:{" "}
                                <input
                                    onChange = {event => this.setValue(event.target.value, 'model')}
                                    type="text"
                                    defaultValue={this.props.model}
                                />
                            </li>
                            <li>
                                Price ($):{" "}
                                <input
                                    onChange = {event => this.setValue(+event.target.value, 'priceUSD')}
                                    type="text"
                                    defaultValue={this.props.priceUSD}
                                />
                            </li>
                            <li>
                                Year:{" "}
                                <input
                                    onChange = {event => this.setValue(+event.target.value, 'yearGraduation')}
                                    type="text"
                                    defaultValue={this.props.year}
                                />
                            </li>
                        </ul> 
                    : <Spinner />}
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
