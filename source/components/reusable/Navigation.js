import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { startLogout } from "./../../actions/user";

export class Navigation extends React.Component {
    onLogoutClick() {
        this.props.startLogout().then(() => {
            this.props.redirect("/");
        });
    };

    render() {
        const user = this.props.user;

        if (user) {
            return (
                <div className="navigation">
                    <NavLink to="/">HOME</NavLink>
                    <NavLink to="/dashboard">DASHBOARD</NavLink>
                    <button onClick={this.onLogoutClick.bind(this)}>
                        LOGOUT
                    </button>
                </div>
            );
        } else {
            return (
                <div className="navigation">
                    <NavLink to="/">HOME</NavLink>
                    <NavLink to="/login">LOGIN</NavLink>
                    <NavLink to="/register">REGISTER</NavLink>
                </div>
            );
        }
    };
};

const mapStateToProps = (state, props)  => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
