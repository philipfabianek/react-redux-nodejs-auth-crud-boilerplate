import React from "react";
import { connect } from "react-redux";

import { startRemoveMemory, startEditMemory } from "./../../actions/memories";

export class MemoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,

            description: this.props.memory.description,
            prevDescription: this.props.memory.description,
            note: this.props.memory.note,
            prevNote: this.props.memory.note,

            error: null
        }
    };

    clearError() {
        this.setState(() => ({ error: null }));
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
        const { description, note, prevDescription, prevNote } = this.state;

        const inputs = Array.from(document.getElementsByClassName(`input-${memory._id}`));
        const editButton = document.getElementsByClassName(`button-${memory._id}`)[0];

        if (this.state.editing) {
            if (
                typeof description === "string" &&
                typeof note === "string" &&
                description.length > 0
            ) {
                const updates = { description, note };

                if (
                    description !== prevDescription ||
                    note !== prevNote
                ) {
                    this.props.startEditMemory(memory._id, updates).then(() => {
                        this.setState(() => ({ editing: false, error: null, prevDescription: description, prevNote: note }));
                        editButton.innerHTML = "EDIT";
                        inputs.map((input) => {
                            input.setAttribute("readonly", true);
                            input.className = `memory-item__input input-${memory._id}`;
                        });
                    }).catch((err) => {
                        this.setState(() => ({ error: "Please fill out atleast description" }));
                    });
                } else {
                    this.setState(() => ({ editing: false, error: null }));
                    editButton.innerHTML = "EDIT";
                    inputs.map((input) => {
                        input.setAttribute("readonly", true);
                        input.className = `memory-item__input input-${memory._id}`;
                    });
                }
            } else {
                this.setState(() => ({ error: "Please fill out atleast description" }));
            }
        } else {
            this.setState(() => ({ editing: true }));
            editButton.innerHTML = "CHANGE";

            inputs.map((input) => {
                input.removeAttribute("readonly", false);
                input.className += " memory-item__input--editable";
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
            <li className="memory-item">
                <div className="memory-item__description">
                    <p>Description:</p>
                    <input
                        className={`memory-item__input input-${memory._id}`}
                        readOnly

                        value={this.state.description}
                        onChange={this.onDescriptionChange.bind(this)}
                    />
                </div>
                <div className="memory-item__note">
                    <p>Note:</p>
                    <input
                        className={`memory-item__input input-${memory._id}`}
                        readOnly

                        value={this.state.note}
                        onChange={this.onNoteChange.bind(this)}
                    />
                </div>
                <div className="memory-item__buttons">
                    <button
                        className={`memory-item__button memory-item__button--edit button-${memory._id}`}
                        onClick={this.editMemory.bind(this)}
                    >
                        EDIT
                    </button>
                    <button
                        className="memory-item__button memory-item__button--delete"
                        onClick={this.startRemoveMemory.bind(this)}
                    >
                        DELETE
                    </button>
                </div>
                <p
                    className={this.state.error ? "login__error login__error--visible" : "login__error"}
                >
                    <span onClick={this.clearError.bind(this)}>x</span>
                    {this.state.error}
                </p>
            </li>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startRemoveMemory: (id) => dispatch(startRemoveMemory(id)),
    startEditMemory: (id, updates) => dispatch(startEditMemory(id, updates))
});

export default connect(undefined, mapDispatchToProps)(MemoryItem);
