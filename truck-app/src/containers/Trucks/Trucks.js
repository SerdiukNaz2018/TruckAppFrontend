import React, { Component } from "react";
import axios from "axios";
import Truck from "./Truck/Truck";
import classes from "./Trucks.module.css";
import NewTruck from "./Truck/NewTruck/NewTruck";
import Spinner from "../../components/UI/Spinner/Spinner";
import loginClasses from "../Home/Home.module.css";
import LoginForm from "../Home/LoginForm/LoginForm";
import UserBlock from "../Home/UserBlock/UserBlock";
import UserList from "../Home/UserList/UserList";
import SignUpForm from '../Home/SignUpForm/SignUpForm';

class Trucks extends Component {
    state = {
        truckList: null,
        loading: true,
        searchRequest: "",
        adding: false,
        loggining: true,
        signingUp: false,
        userInfo: {
            status: null,
            id: null,
            fullName: null,
            age: null,
            sex: null,
            email: null,
            dateOfBirth: null,
            imagePath: null,
        },
    };

    disableSignUp = () => {
        this.setState({signingUp: false, loggining: true});
    }

    enableSignUp = () => {
        this.setState({signingUp: true, loggining: false});
    }

    disableLoginForm = () => {
        this.setState({ loggining: false });
    };

    setUserInfo = data => {
        const newState = { ...this.state };
        newState.loggining = false;

        newState.userInfo.age = data.years;
        newState.userInfo.sex = data.sex;
        newState.userInfo.email = data.email;
        newState.userInfo.dateOfBirth = data.dateOfBirth;
        newState.userInfo.imagePath = data.imagePath;
        newState.userInfo.age = data.age;
        newState.userInfo.fullName = data.fullName;
        newState.userInfo.id = data.id;
        newState.userInfo.status = data.role;

        this.setState(newState);

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
            this.state.admin !== nextState.admin ||
            this.state.loggining !== nextState.loggining ||
            JSON.stringify(this.state.userInfo) !==
                JSON.stringify(nextState.userInfo) ||
            nextState.showUsers !== this.state.showUsers ||
            nextState.signingUp !== this.state.signingUp
        );
    }

    setupTruckList = () => {
        this.setState({ loading: true });
        axios
            .get("http://localhost:8088/api/truck")
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
        this.setState({ loading: true });
        axios
            .get(`http://localhost:8088/api/truck?SortBy=${event.target.value}`)
            .then(response => {
                this.setState({ loading: false });
                this.setState({ truckList: response.data });
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            });
    };

    searchButtonHandler = () => {
        this.setState({ loading: true });
        axios
            .get(
                `http://localhost:8088/api/truck?SearchQuery=${this.state.searchRequest}`
            )
            .then(response => {
                this.setState({ loading: false });
                this.setState({ truckList: response.data });
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            });
    };

    setSearchRequest = event => {
        this.setState({ searchRequest: event.target.value });
    };

    searchHandler = event => {
        this.setState({ loading: true });
        axios
            .get(
                `http://localhost:8088/api/truck?SearchQuery=${event.target.value}`
            )
            .then(response => {
                this.setState({ loading: false });
                this.setState({ truckList: response.data });
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            });
    };

    reverseTruckList = () => {
        const reversed = [...this.state.truckList];
        reversed.reverse();
        this.setState({ truckList: reversed });
    };

    render() {
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
                        priceUSD={truck.priceUSD}
                        priceEUR={truck.priceEUR}
                        priceUAH={truck.priceUAH}
                        yearGraduation={truck.yearGraduation}
                        years={truck.amountYear}
                        country={truck.country}
                        licensePlate={truck.registrationPlate}
                        source={truck.imagePath}
                        admin={this.state.userInfo.status === "admin"}
                    />
                );
            });
        }

        return (
            <React.Fragment>
                <SignUpForm visible = {this.state.signingUp} close = {this.disableSignUp}/>
                <div className={loginClasses.Home}>
                    <LoginForm
                        visible={this.state.loggining}
                        enableRegularMode={this.disableLoginForm}
                        setUserInfo={this.setUserInfo}
                        signUp = {this.enableSignUp}
                    />
                    {this.state.userInfo.status ? (
                        <React.Fragment>
                            <UserBlock
                                name={this.state.userInfo.fullName}
                                age={this.state.userInfo.age}
                                email={this.state.userInfo.email}
                                sex={this.state.userInfo.sex}
                                dateOfBirth={this.state.userInfo.dateOfBirth}
                                imagePath={this.state.userInfo.imagePath}
                                status={this.state.userInfo.status}
                            />
                            {this.state.userInfo.status === "admin" ? (
                                <UserList />
                            ) : null}
                        </React.Fragment>
                    ) : null}
                </div>

                { !this.state.loggining && !this.state.signingUp?
                <div className={classes.Trucks}>
                    <h2>Trucks: </h2>
                    <NewTruck
                        visible={this.state.adding}
                        enableRegularMode={this.disableAddingMode}
                        resetTruckList={this.setupTruckList}
                        userId = {this.state.userInfo.id}
                    />
                    <input
                        type="search"
                        placeholder="Search"
                        onChange={this.setSearchRequest}
                    />
                    <button onClick={this.searchButtonHandler}>Search</button>

                    <div style={{ margin: "10px" }}>
                        <label htmlFor="sort">Sort by: </label>
                        <select
                            id="sort"
                            style={{ borderRadius: "10px", margin: "10px" }}
                            onChange={this.sortHandler}
                            defaultValue="Brand"
                        >
                            <option value="PriceUSD">Price</option>
                            <option value="AmountYear">Year</option>
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
                    {this.state.userInfo.status !== 'admin' ?
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
                    : null}
                    {this.state.loading ? (
                        <Spinner />
                    ) : trucks.length === 0 ? (
                        <p>No trucks found...</p>
                    ) : (
                        trucks
                    )}
                </div> : null}
            </React.Fragment>
        );
    }
}

export default Trucks;
