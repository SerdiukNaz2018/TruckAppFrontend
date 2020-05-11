import React, { Component } from "react";
import classes from "./Home.module.css";
import LoginForm from "./LoginForm/LoginForm";
import UserBlock from "./UserBlock/UserBlock";
import UserList from "./UserList/UserList";

class Home extends Component {
    state = {
        loggining: true,
        status: null,
        id: null,
        fullName: null,
        age: null,
        sex: null,
        email: null,
        dateOfBirth: null,
        imagePath: null,
    };

    disableLoginForm = () => {
        this.setState({ loggining: false });
    };

    setUserInfo = data => {
        if (data) {
            this.setState({
                loggining: false,
                status: data.role,
                id: data.id,
                fullName: data.fullName,
                age: data.years,
                sex: data.sex,
                email: data.email,
                dateOfBirth: data.dateOfBirth,
                imagePath: data.imagePath,
            });
        }
    };

    render() {
        return (
            <div className={classes.Home}>
                <LoginForm
                    visible={this.state.loggining}
                    enableRegularMode={this.disableLoginForm}
                    setUserInfo={this.setUserInfo}
                />
                {this.state.status ? (
                    <React.Fragment>
                        <UserBlock 
                            name = {this.state.fullName}
                            age = {this.state.age}
                            email = {this.state.email}
                            sex = {this.state.sex}
                            dateOfBirth = {this.state.dateOfBirth}
                            imagePath = {this.state.imagePath}
                            status = {this.state.status}
                        />
                        {this.state.status === "admin" ? <UserList /> : null}
                    </React.Fragment>
                ) : null}
            </div>
        );
    }
}

export default Home;
