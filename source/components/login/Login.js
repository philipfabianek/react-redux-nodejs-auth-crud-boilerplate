import axios from "axios";
import React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import Navigation from "./../reusable/Navigation";

import { startLogin } from "./../../actions/user";
import { startSetMemories } from "./../../actions/memories";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: null
        };
    };

    clearError() {
        this.setState(() => ({ error: null }));
    }

    onUsernameChange(event) {
        const username = event.target.value;
        this.setState(() => ({ username }));
    };

    onPasswordChange(event) {
        const password = event.target.value;
        this.setState(() => ({ password }));
    };

    onFormSubmit(event) {
        event.preventDefault();

        const { username, password } = this.state;

        this.props.startLogin(username, password)
            .then((stuff) => {
                // this.props.history.push("/dashboard");
                this.props.startSetMemories();
            }).catch((err) => {
                this.setState(() => ({ error: err.response.data.message }));
            });
    };

    render() {
        const user = this.state.success;

        return (
            <div className="login">
                {/* <Navigation
                    redirect={this.props.history.push}
                /> */}
                <div className="login__content">
                <h1>Login</h1>
                    <form
                        onSubmit={this.onFormSubmit.bind(this)}
                    >
                        <input
                            autoComplete="off"
                            name="username"
                            placeholder="Username"
                            type="text"

                            value={this.state.username}
                            onChange={this.onUsernameChange.bind(this)}
                        />

                        <input
                            name="password"
                            placeholder="Password"
                            type="password"

                            value={this.state.password}
                            onChange={this.onPasswordChange.bind(this)}
                        />

                        <button
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
                <p
                    className={this.state.error ? "login__error login__error--visible" : "login__error"}
                >
                    <span onClick={this.clearError.bind(this)}>x</span>
                    {this.state.error}
                </p>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: (username, password) => dispatch(startLogin(username, password)),
    startSetMemories: () => dispatch(startSetMemories())
});

export default connect(null, mapDispatchToProps)(Login);
