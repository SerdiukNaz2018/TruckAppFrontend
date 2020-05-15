import React, { Component } from "react";
import classes from "./LoginForm.module.css";
import axios from "axios";

class LoginForm extends Component {
    state = {
        email: "",
        password: "",
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.visible !== this.props.visible ||
            nextState.status !== this.state.status
        );
    }

    setValue = (value, key) => {
        const newState = { ...this.state };
        newState[key] = value;
        this.setState(newState);
    };

    okButtonHandler = () => {
        console.log(this.state);
        axios
            .post("http://localhost:8088/api/user/login", this.state)
            .then(response => {
                this.props.setUserInfo(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <div
                className={classes.LoginForm}
                style={{
                    opacity: this.props.visible ? 1 : 0,
                    transform: this.props.visible
                        ? "translateY(0)"
                        : "translateY(-100vh)",
                }}
            >
                <h3>Sign in:</h3>
                <input
                    type="email"
                    placeholder="e-mail"
                    onChange={event =>
                        this.setValue(event.target.value, "email")
                    }
                />
                <input
                    type="password"
                    placeholder="password"
                    onChange={event =>
                        this.setValue(event.target.value, "password")
                    }
                />
                <button
                    style={{ width: "80px" }}
                    onClick={this.okButtonHandler}
                >
                    OK
                </button>
                <button style={{ width: "80px" }} onClick={this.props.signUp}>
                    Sign Up
                </button>
            </div>
        );
    }
}

export default LoginForm;
