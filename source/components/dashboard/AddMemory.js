import React from "react";
import { connect } from "react-redux";

import { startAddMemory } from "./../../actions/memories";

export class AddMemory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            note: ""
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

        this.props.startAddMemory({
            description, createdAt, note
        });
        // .then((data) => {
        //     console.log("THEN", data);
        // })
        // .catch((err) => {
        //     console.log("CATCH", err);
        // });
    };

    render() {
        return (
            <div>
                <form
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
            </div>
        )
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddMemory: (memory) => dispatch(startAddMemory(memory))
});

export default connect(null, mapDispatchToProps)(AddMemory);
