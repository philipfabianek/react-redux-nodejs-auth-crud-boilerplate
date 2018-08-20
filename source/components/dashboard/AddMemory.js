import React from "react";
import { connect } from "react-redux";

import specialTransition from "./../../scripts/specialTransition";
import { startAddMemory } from "./../../actions/memories";

export class AddMemory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            note: "",
            error: null
        };
    };

    clearError() {
        this.setState(() => ({ error: null }));
    };

    onDescriptionChange(event) {
        const description = event.target.value.toString();
        this.setState(() => ({ description }));
    };

    onNoteChange(event) {
        const note = event.target.value.toString();
        this.setState(() => ({ note }));
    };

    onFormSubmit(event) {
        event.preventDefault();

        const createdAt = Date.now();
        const { description, note } = this.state;

        if (
            typeof description === "string" &&
            typeof note === "string" &&
            description.length > 0
        ) {
            this.props.startAddMemory({
                description, createdAt, note
            }).then(() => {
                this.setState(() => ({
                    description: "",
                    note: "",
                    error: null
                }));
            }).catch((err) => {
                this.setState(() => ({ error: err.response.data.message }));
            });
        } else {
            this.setState(() => ({ error: "Please fill out atleast description" }));
        }
    };

    render() {
        return (
            <div>
                <form
                    className="add-memory"
                    onSubmit={this.onFormSubmit.bind(this)}
                >
                    <input
                        type="text"
                        placeholder="Memory description"

                        value={this.state.description}
                        onChange={this.onDescriptionChange.bind(this)}
                    />

                    <input
                        type="text"
                        placeholder="Memory note (optional)"

                        value={this.state.note}
                        onChange={this.onNoteChange.bind(this)}
                    />

                    <button
                        type="submit"
                    >
                        ADD MEMORY
                    </button>
                </form>

                <p
                    className={this.state.error ? "login__error login__error--visible" : "login__error"}
                >
                    <span onClick={this.clearError.bind(this)}>x</span>
                    {this.state.error}
                </p>
            </div>
        )
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddMemory: (memory) => dispatch(startAddMemory(memory))
});

export default connect(null, mapDispatchToProps)(AddMemory);
