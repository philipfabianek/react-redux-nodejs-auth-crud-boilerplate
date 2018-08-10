import React from "react";
import { connect } from "react-redux";

import { startRemoveMemory, startEditMemory } from "./../../actions/memories";

export class MemoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,

            description: this.props.memory.description,
            note: this.props.memory.note,
            error: null
        }
    };

    startRemoveMemory() {
        const _id = this.props.memory._id;

        if (
            _id.length > 0 &&
            typeof _id === "string"
        ) {
            this.props.startRemoveMemory(_id).then(() => {
                // console.log("SUCCESS");
            }).catch((err) => {
                this.setState(() => ({ error: err.response.data.message }));
            });
        } else {
            this.setState(() => ({ error: "Something went wrong, this is not your fault" }));
        }
    };

    editMemory() {
        const memory = this.props.memory;
        const { description, note } = this.state;

        const inputs = Array.from(document.getElementsByClassName(`input-${memory._id}`));
        const editButton = document.getElementsByClassName(`button-${memory._id}`)[0];

        if (this.state.editing) {
            if (
                typeof description === "string" &&
                typeof note === "string" &&
                description.length > 0
            ) {
                const updates = { description, note };

                this.props.startEditMemory(memory._id, updates).then(() => {
                    console.log("THEN BABY");
                    this.setState(() => ({ editing: false, error: null }));
                    editButton.innerHTML = "EDIT";
                    inputs.map((input) => {
                        input.setAttribute("readonly", true);
                        // input.className = "memory__line__input";
                    });
                }).catch((err) => {
                    console.log("CATCH BABY");
                });
            } else {
                this.setState(() => ({ error: "Please fill out atleast description" }));
            }
        } else {
            this.setState(() => ({ editing: true }));
            editButton.innerHTML = "CHANGE";

            inputs.map((input) => {
                input.removeAttribute("readonly", false);
                // input.className += " memory__line__input--toggled";
            });
        }
    };

    onDescriptionChange(event) {
        const description = event.target.value.toString();
        this.setState(() => ({ description }));
    };

    onNoteChange(event) {
        const note = event.target.value.toString();
        this.setState(() => ({ note }));
    };

    render() {
        // if (typeof window !== "undefined") {
        //     document.onkeydown = (event) => {
        //         if (event.keyCode == 13 && this.state.editing) {
        //             this.editMemory();
        //         }
        //     };
        // };

        const memory = this.props.memory;

        return (
            <li>
                {this.state.error && <p>{this.state.error}</p>}
                <div>
                    <p>Description:</p>
                    <input
                        className={`input-${memory._id}`}
                        readOnly

                        value={this.state.description}
                        onChange={this.onDescriptionChange.bind(this)}
                    />
                </div>
                <div>
                    <p>Note:</p>
                    <input
                        className={`input-${memory._id}`}
                        readOnly

                        value={this.state.note}
                        onChange={this.onNoteChange.bind(this)}
                    />
                </div>
                <button
                    className={`button-${memory._id}`}
                    onClick={this.editMemory.bind(this)}
                >
                    EDIT
                </button>
                <button
                    onClick={this.startRemoveMemory.bind(this)}
                >
                    DELETE
                </button>
            </li>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startRemoveMemory: (id) => dispatch(startRemoveMemory(id)),
    startEditMemory: (id, updates) => dispatch(startEditMemory(id, updates))
});

export default connect(undefined, mapDispatchToProps)(MemoryItem);
