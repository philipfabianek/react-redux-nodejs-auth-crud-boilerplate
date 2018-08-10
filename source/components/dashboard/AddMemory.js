import React from "react";
import { connect } from "react-redux";

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

    onDescriptionChange(event) {
        const description = event.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange(event) {
        const note = event.target.value;
        this.setState(() => ({ note }));
    };

    onFormSubmit(event) {
        event.preventDefault();

        const createdAt = Date.now();
        const { description, note } = this.state;

        if (description.length > 0) {
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
                    onSubmit={this.onFormSubmit.bind(this)}
                >
                    {this.state.error && <p>{this.state.error}</p>}
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
            </div>
        )
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddMemory: (memory) => dispatch(startAddMemory(memory))
});

export default connect(null, mapDispatchToProps)(AddMemory);
