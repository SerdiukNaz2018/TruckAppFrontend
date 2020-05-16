import React, { Component } from "react";
import classes from "./LoginForm.module.css";
import axios from "axios";

class LoginForm extends Component {
    state = {
        email: "",
        password: "",

        errorMessage: "",
        visiblePassword: false,
    };

    passwordVisibilityToggle = () => {
        this.setState({visiblePassword: !this.state.visiblePassword});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.visible !== this.props.visible ||
            nextState.status !== this.state.status ||
            nextState.errorMessage !== this.state.errorMessage ||
            nextState.visiblePassword !== this.state.visiblePassword
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
            .post("http://localhost:8088/api/user/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then(response => {
                this.props.setUserInfo(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    errorMessage:
                        "This account is not accessible. Check you login/password or contact administrator to inform you whether you are active or banned",
                });
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
                    type="login"
                    placeholder="e-mail"
                    onChange={event =>
                        this.setValue(event.target.value, "email")
                    }
                />
                <input
                    type={this.state.visiblePassword ? "text" : "password"}
                    placeholder="password"
                    onChange={event =>
                        this.setValue(event.target.value, "password")
                    }
                />
                <p style = {{display: 'inline'}}><small>Show password</small></p>
                <input style = {{display: 'inline', margin: '10px'}} type="checkbox" onChange={this.passwordVisibilityToggle} />
                {this.state.errorMessage ? (
                    <div style={{ color: "red" }}>
                        <p>{this.state.errorMessage}</p>
                    </div>
                ) : null}
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
