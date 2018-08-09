import React from "react";
import { connect } from "react-redux";

import { startRemoveMemory } from "./../../actions/memories";

import Navigation from "./../reusable/Navigation";
import AddMemory from "./AddMemory";

export class Dashboard extends React.Component {
    onRemoveButtonClick(id) {
        this.props.startRemoveMemory(id);
    };

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
                    {
                        this.props.memories.length > 0 &&
                        <ul>
                        {
                            this.props.memories.map((memory) => {
                                return <li key={memory._id}>
                                    <h2>{memory.description}</h2>
                                    {memory.note.length > 0 && <h3>{memory.note}</h3>}
                                    <button onClick={this.onRemoveButtonClick.bind(this, memory._id)}>
                                        REMOVE MEMORY
                                    </button>
                                </li>
                            })
                        }
                        </ul>
                    }
                </div>
            )
        };
    };
};

const mapStateToProps = (state, props) => ({
    user: state.user,
    memories: state.memories
});

const mapDispatchToProps = (dispatch) => ({
    startRemoveMemory: (id) => dispatch(startRemoveMemory(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
