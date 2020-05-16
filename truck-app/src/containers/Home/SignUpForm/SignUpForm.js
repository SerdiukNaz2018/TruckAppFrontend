import React, { Component } from "react";
import classes from "../LoginForm/LoginForm.module.css";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Spinner from "../../../components/UI/Spinner/Spinner";

class SignUpForm extends Component {
    state = {
        loading: false,
        email: "",
        password: "",
        passwordConf: "",
        firstName: "",
        secondName: "",
        sex: "male",
        day: "1",
        month: "1",
        year: "2000",
        imagePath: "",

        emailError: "",
        passwordError: "",
        firstNameError: "",
        secondNameError: "",
        authError: "",

        visiblePassword: false,
    };

    passwordVisibilityToggle = () => {
        this.setState({ visiblePassword: !this.state.visiblePassword });
    };

    validate = () => {
        this.setState({
            authError: "",
            firstNameError: "",
            secondNameError: "",
            emailError: "",
            passwordError: "",
        });
        let check = true;

        if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                this.state.email
            )
        ) {
            this.setState({ emailError: "wrong email" });
            check = false;
        }

        if (this.state.password !== this.state.passwordConf) {
            this.setState({ passwordError: "password is not confirmed" });
            check = false;
        }

        if (this.state.password.length < 5) {
            this.setState({ passwordError: "password is too short" });
            check = false;
        }

        if (!/^[A-Za-z]+$/.test(this.state.firstName)) {
            this.setState({
                firstNameError:
                    "first name can't include any special cahracters",
            });
            check = false;
        }

        if (!/^[A-Za-z]+$/.test(this.state.secondName)) {
            this.setState({
                secondNameError:
                    "last name can't include any special cahracters",
            });
            check = false;
        }

        return check;
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.visible !== this.props.visible ||
            nextState.status !== this.state.status ||
            nextState.passwordError !== this.state.passwordError ||
            nextState.emailError !== this.state.emailError ||
            nextState.firstNameError !== this.state.secondNameError ||
            nextState.authError !== this.state.authError ||
            nextState.visiblePassword !== this.state.visiblePassword
        );
    }

    setValue = (value, key) => {
        const newState = { ...this.state };
        newState[key] = value;
        this.setState(newState);
    };

    componentDidUpdate(_, prevState) {
        if (prevState === this.state) {
            this.setState({ emailError: "", passwordError: "" });
        }
    }

    okButtonHandler = () => {
        let valid = this.validate();
        if (valid) {
            this.setState({ loading: true });
            axios
                .post("http://localhost:8088/api/user/create", {
                    firstName: this.state.firstName,
                    lastName: this.state.secondName,
                    confirmPassword: this.state.passwordConf,
                    email: this.state.email,
                    password: this.state.password,
                    dateOfBirth: `${this.state.month}.${this.state.day}.${this.state.year}`,
                    sex: this.state.sex,
                    imagePath: this.state.imagePath,
                })
                .then(response => {
                    this.props.close();
                    this.setState({ loading: false });
                })
                .catch(error => {
                    this.setState({
                        loading: false,
                        authError: "The e-mail is already in use",
                    });
                });
        }
    };

    render() {
        const days = [];
        const years = [];
        const months = [];
        for (let i = 1; i <= 31; ++i) {
            days.push(i);
        }
        for (let i = 1; i <= 12; ++i) {
            months.push(i);
        }
        for (let i = 1950; i <= 2020; ++i) {
            years.push(i);
        }

        const yearsOpt = years.map(year => (
            <option key={year} value={year}>
                {year}
            </option>
        ));
        const monthsOpt = months.map(month => (
            <option key={month} value={month}>
                {month}
            </option>
        ));
        const daysOpt = days.map(day => (
            <option key={day} value={day}>
                {day}
            </option>
        ));

        return (
            <div
                className={classes.LoginForm}
                style={{
                    top: "20%",
                    opacity: this.props.visible ? 1 : 0,
                    transform: this.props.visible
                        ? "translateY(0)"
                        : "translateY(-100vh)",
                }}
            >
                <h3>Sign Up:</h3>
                {this.state.loading ? (
                    <Spinner />
                ) : (
                    <React.Fragment>
                        <Row>
                            <Col md={6}>
                                <input
                                    type="text"
                                    placeholder="first name"
                                    onChange={event =>
                                        this.setValue(
                                            event.target.value,
                                            "firstName"
                                        )
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="last name"
                                    onChange={event =>
                                        this.setValue(
                                            event.target.value,
                                            "secondName"
                                        )
                                    }
                                />
                                <input
                                    type="login"
                                    placeholder="e-mail"
                                    onChange={event =>
                                        this.setValue(
                                            event.target.value,
                                            "email"
                                        )
                                    }
                                />
                            </Col>
                            <Col md={6}>
                                <input
                                    type={
                                        this.state.visiblePassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="password"
                                    onChange={event =>
                                        this.setValue(
                                            event.target.value,
                                            "password"
                                        )
                                    }
                                />

                                <input
                                    type={
                                        this.state.visiblePassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="confirm password"
                                    onChange={event =>
                                        this.setValue(
                                            event.target.value,
                                            "passwordConf"
                                        )
                                    }
                                />
                                <input
                                    type="imageAdress"
                                    placeholder="image adress"
                                    onChange={event =>
                                        this.setValue(
                                            event.target.value,
                                            "imagePath"
                                        )
                                    }
                                />
                            </Col>
                        </Row>
                        <p style={{ display: "inline" }}>
                            <small>Show password</small>
                        </p>
                        <input
                            style={{ display: "inline", margin: "10px" }}
                            type="checkbox"
                            onChange={this.passwordVisibilityToggle}
                        />
                        <select
                            style={{ display: "block" }}
                            name="sex"
                            id="sex"
                            onChange={event =>
                                this.setValue(event.target.value, "sex")
                            }
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <div>
                            <select
                                name="day"
                                defaultValue="dd"
                                onChange={event =>
                                    this.setValue(event.target.value, "day")
                                }
                            >
                                <option value="dd">dd</option>
                                {daysOpt}
                            </select>
                            <select
                                name="month"
                                defaultValue="mm"
                                onChange={event =>
                                    this.setValue(event.target.value, "month")
                                }
                            >
                                <option value="mm">mm</option>
                                {monthsOpt}
                            </select>
                            <select
                                name="year"
                                defaultValue="yy"
                                onChange={event =>
                                    this.setValue(event.target.value, "year")
                                }
                            >
                                <option value="yy">yy</option>
                                {yearsOpt}
                            </select>
                        </div>

                        <div style={{ height: "min-content", color: "red" }}>
                            <small style={{ display: "block" }}>
                                {this.state.emailError}
                            </small>
                            <small style={{ display: "block" }}>
                                {this.state.passwordError}
                            </small>
                            <small style={{ display: "block" }}>
                                {this.state.firstNameError}
                            </small>
                            <small style={{ display: "block" }}>
                                {this.state.secondNameError}
                            </small>
                            <small style={{ display: "block" }}>
                                {this.state.authError}
                            </small>
                        </div>
                    </React.Fragment>
                )}
                <button
                    style={{ width: "80px" }}
                    onClick={this.okButtonHandler}
                >
                    OK
                </button>
                <button style={{ width: "80px" }} onClick={this.props.close}>
                    Cancel
                </button>
            </div>
        );
    }
}

export default SignUpForm;
