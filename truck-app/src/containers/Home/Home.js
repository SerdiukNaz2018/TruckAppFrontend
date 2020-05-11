import React, { Component } from "react";
import classes from "./Home.module.css";

class Home extends Component {
    state = {
        login: "",
        password: "",
    };

    shouldComponentUpdate() {
        return false;
    }

    setValue = (value, key) => {
        const newState = { ...this.state };
        newState[key] = value;
        this.setState(newState);
    };

    okButtonHandler = () => {
        console.log(this.state);
    }

    render() {
        return (
            <div className={classes.Home}>
                <div className={classes.AuthorizationForm}>
                    <h3>Sign in:</h3>
                    <input
                        type="email"
                        placeholder="login"
                        onChange={event =>
                            this.setValue(event.target.value, "login")
                        }
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={event =>
                            this.setValue(event.target.value, "password")
                        }
                    />
                    <button style={{ width: "80px" }} onClick = {this.okButtonHandler}>OK</button>
                    <small>I forgot my password</small>
                </div>
            </div>
        );
    }
}

export default Home;
