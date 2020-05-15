import React, { Component } from "react";
import classes from "./Truck.module.css";
import { Row, Col } from "react-bootstrap";
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
            <div className={classes.Truck}
            style={{width: this.props.preview ? 'fit-content' : '70%', display: this.props.preview ? 'inline' : 'block'}}>
                <Row>
                    
                    {!this.props.preview ? <Col md={6} style = {{overflow: 'hidden'}}> <img src={this.props.source} alt="truck" /> </Col> : null}
                    
                    <Col md={!this.props.preview ? 6 : null}>
                        <h1>
                            {this.props.brand} {this.props.model}
                        </h1>
                        <ul>
                            <li>
                                <img className = {classes.Icon} src="https://image.flaticon.com/icons/svg/858/858151.svg" alt="price"/>
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
                                <img className = {classes.Icon} src="https://image.flaticon.com/icons/svg/290/290081.svg" alt="plate"/>
                                <strong>{this.props.licensePlate}</strong>
                            </li>
                            {!this.props.preview ? 
                            <React.Fragment>
                                <li>
                                    <img className = {classes.Icon} src="https://image.flaticon.com/icons/png/512/446/446075.png" alt="country"/>
                                    <strong>{this.props.country}</strong>
                                </li>
                                <li>
                                    <img className = {classes.Icon} src="https://image.flaticon.com/icons/png/512/2/2192.png" alt="age"/>
                                    <strong>{this.props.yearGraduation} </strong>
                                    {this.props.years !== 0 ? this.props.years === 1 ? <span>({this.props.years} year)</span> :<span>({this.props.years} years)</span> : <span>(new)</span>}
                                </li> 
                            </React.Fragment>
                            : null}
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
                    resetTruckList={this.props.reload}
                    truckId={this.props.truckId}
                    visible={this.state.editing}
                    enableRegularMode={this.disableEditMode}
                    year={this.props.yearGraduation}
                    //country={this.props.country}
                    //brand={this.props.brand}
                    model={this.props.model}
                    priceUSD={this.props.priceUSD}
                    //priceEUR={this.props.priceEUR}
                    //priceUAH={this.props.priceUAH}
                    //licensePlate={this.props.licensePlate}
                />
            </div>
        );
    }
}

export default Truck;
