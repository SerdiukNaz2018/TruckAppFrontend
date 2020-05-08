import React, { Component } from "react";
import axios from "axios";
import Truck from "./Truck/Truck";
import classes from "./Trucks.module.css";
import NewTruck from "./Truck/NewTruck/NewTruck";

class Trucks extends Component {
    state = {
        truckList: null,
        loading: true,
        searchRequest: "",
        adding: false,
        admin: false,
        buttonText: "Admin",
    };

    adminUserToggle = () => {
        if (this.state.admin) {
            this.setState({ admin: false, buttonText: "Admin" });
        } else {
            this.setState({ admin: true, buttonText: "User" });
        }
    };

    enableAddingMode = () => {
        this.setState({ adding: true });
    };

    disableAddingMode = () => {
        this.setState({ adding: false });
    };

    shouldComponentUpdate(_, nextState) {
        return (
            JSON.stringify(nextState.truckList) !==
                JSON.stringify(this.state.truckList) ||
            this.state.loading !== nextState.loading ||
            this.state.adding !== nextState.adding ||
            this.state.admin !== nextState.admin
        );
    }

    setupTruckList = () => {
        axios
            .get("https://course-project-react.firebaseio.com/trucks.json")
            .then(response => {
                this.setState({ truckList: response.data, loading: false });
            })
            .catch(error => {
                console.log(error.message);
                this.setState({ loading: false });
            });
    };

    componentDidMount() {
        this.setupTruckList();
    }

    sortHandler = event => {
        axios
            .get(`http://localhost:8088/api/truck?SortBy=${event.target.value}`)
            .then(response => {
                this.setState({ truckList: response.data });
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    searchButtonHandler = () => {
        axios
            .post("", this.state.searchRequest)
            .then(response => {
                this.setState({ truckList: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    };

    setSearchRequest = event => {
        this.setState({ searchRequest: event.target.value });
    };

    reverseTruckList = () => {
        const reversed = [...this.state.truckList];
        reversed.reverse();
        this.setState({ truckList: reversed });
    };

    render() {
        console.log("rendered");
        let trucks = <p>Loading...</p>;

        if (!this.state.loading) {
            trucks = this.state.truckList.map((truck, index) => {
                return (
                    <Truck
                        key={truck.id}
                        reload={this.setupTruckList}
                        truckId={truck.id}
                        brand={truck.brand}
                        model={truck.model}
                        price={truck.priceUSD}
                        years={truck.amountYear}
                        country={truck.country}
                        licensePlate={truck.registrationPlate}
                        source={truck.imagePath}
                        admin={this.state.admin} //!!!!!
                    />
                );
            });
        }

        return (
            <div className={classes.Trucks}>
                <NewTruck
                    visible={this.state.adding}
                    enableRegularMode={this.disableAddingMode}
                />
                <input
                    type="search"
                    placeholder="Search"
                    onChange={this.setSearchRequest}
                />
                <button onClick={this.searchButtonHandler}>Search</button>

                <button
                    style={{ borderRadius: "10px", margin: '10px' }}
                    onClick={this.adminUserToggle}
                >
                    {this.state.buttonText}
                </button>

                <div style={{ margin: "10px" }}>
                    <label htmlFor="sort">Sort by: </label>
                    <select
                        id="sort"
                        style={{ borderRadius: "10px", margin: "10px" }}
                        onChange={this.sortHandler}
                    >
                        <option value="PriceUSD">Price</option>
                        <option value="AmountYear">Years</option>
                        <option value="Brand">Brand</option>
                        <option value="Model">Model</option>
                        <option value="Country">Country</option>
                    </select>
                    <button
                        style={{
                            height: "30px",
                            width: "60px",
                            borderRadius: "10px",
                        }}
                        onClick={this.reverseTruckList}
                    >
                        ↑ ↓
                    </button>
                </div>
                <div>
                    <button
                        style={{
                            height: "50px",
                            width: "215px",
                            borderRadius: "10px",
                        }}
                        onClick={this.enableAddingMode}
                    >
                        New Truck
                    </button>
                </div>
                {this.state.loading ? <p>Loading...</p> : trucks}
            </div>
        );
    }
}

export default Trucks;
