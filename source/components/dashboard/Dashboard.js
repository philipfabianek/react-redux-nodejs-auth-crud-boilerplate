import React from "react";
import { connect } from "react-redux";

import Navigation from "./../reusable/Navigation";
import AddMemory from "./AddMemory";
import MemoryList from "./MemoryList";

export class Dashboard extends React.Component {
    render() {
        const { username, id } = this.props.user;

        // console.log(this.props);

        if (this.props.user) {
            return (
                <div>
                    <Navigation
                        redirect={this.props.history.push}
                    />
                    <h1>Dashboard</h1>
                    <h2>Welcome to your dashboard, {username.charAt(0).toUpperCase() + username.slice(1)}</h2>
                    <AddMemory />
                    <MemoryList />
                </div>
            )
        };
    };
};

const mapStateToProps = (state, props) => ({
    user: state.user
});

export default connect(mapStateToProps)(Dashboard);
