import React from "react";
import { connect } from "react-redux";

import AddMemory from "./AddMemory";
import MemoryList from "./MemoryList";

import { startLogout } from "./../../actions/user";

export class Dashboard extends React.Component {
    onLogoutClick() {
        this.props.startLogout().then(() => {
            this.props.redirect("/");
        });
    };

    render() {
        const { username, id } = this.props.user;

        if (this.props.user) {
            return (
                <div className="dashboard">
                    <div className="dashboard__header">
                        <h1>Dashboard</h1>
                        <button className="dashboard__logout" onClick={this.onLogoutClick.bind(this)}>
                            LOGOUT
                        </button>
                    </div>

                    <div className="dashboard__content">
                        <h2>Welcome to your dashboard, {username.charAt(0).toUpperCase() + username.slice(1)}</h2>
                        <AddMemory />
                        <MemoryList />
                    </div>
                </div>
            )
        };
    };
};

const mapStateToProps = (state, props) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
