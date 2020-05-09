import React, { Component } from "react";
import classes from "./Truck.module.css";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import TruckInfo from "./TruckInfo/TruckInfo";

class Truck extends Component {
    state = {
        price: this.props.priceUSD,
        currencyList: {
            USD: this.props.priceUSD,
            EUR: this.props.priceEUR,
            UAH: this.props.priceUAH,
        },
        editing: false,
    };

    enableEditMode = () => {
        this.setState({ editing: true });
    };

    disableEditMode = () => {
        this.setState({ editing: false });
    };

    formatPriceString = price => {
        let priceStringfied = price.toString().split("");
        for (let i = priceStringfied.length - 3; i > 0; i -= 3) {
            priceStringfied.splice(i, 0, " ");
        }
        return priceStringfied.join("");
    };

    changeCurrency = event => {
        this.setState({price: this.state.currencyList[event.target.value]});
    };

    render() {
        return (
            <div className={classes.Truck}>
                <Row>
                    <Col md={6}>
                        <img src={this.props.source} alt="truck" />
                    </Col>
                    <Col md={6}>
                        <h1>
                            {this.props.brand} {this.props.model}
                        </h1>
                        <ul>
                            <li>
                                Price:{" "}
                                <strong>
                                    {this.formatPriceString(this.state.price)}
                                </strong>
                                <select
                                    id="currency"
                                    onChange={this.changeCurrency}
                                >
                                    <option value="USD">$</option>
                                    <option value="EUR">€</option>
                                    <option value="UAH">₴</option>
                                </select>
                            </li>
                            <li>
                                License plate:{" "}
                                <strong>{this.props.licensePlate}</strong>
                            </li>
                            <li>
                                Country: <strong>{this.props.country}</strong>
                            </li>
                            <li>
                                Year: <strong>{this.props.yearGraduation} </strong>
                                ({this.props.years} years)
                            </li>
                        </ul>
                        {this.props.admin ? (
                            <div
                                style={{
                                    position: "absolute",
                                    right: "15px",
                                    bottom: "0",
                                }}
                            >
                                <button
                                    onClick={this.enableEditMode}
                                    style={{
                                        width: "50px",
                                        borderRadius: "10px",
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        ) : null}
                    </Col>
                </Row>
                <TruckInfo
                    currency = {this.state.currency}
                    resetTruckList={this.props.reload}
                    truckId={this.props.truckId}
                    visible={this.state.editing}
                    enableRegularMode={this.disableEditMode}
                    year={this.props.yearGraduation}
                    country={this.props.country}
                    brand={this.props.brand}
                    model={this.props.model}
                    priceUSD={this.props.priceUSD}
                    priceEUR={this.props.priceEUR}
                    priceUAH={this.props.priceUAH}
                    licensePlate={this.props.licensePlate}
                />
            </div>
        );
    }
}

export default Truck;
