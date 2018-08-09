import axios from "axios";
import React from "react";

import Navigation from "./../reusable/Navigation";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    };

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

        axios.post("/auth/register", {
            username, password
        }).then((info) => {
            this.props.history.push("/login");
        }).catch((err) => {
            console.log(err);
        });
    };

    render() {
        return (
            <div>
                <Navigation
                    redirect={this.props.history.push}
                />
                <h1>Register</h1>
                <form
                    onSubmit={this.onFormSubmit.bind(this)}
                >
                    <input
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
                        Register
                    </button>
                </form>
            </div>
        );
    };
};
