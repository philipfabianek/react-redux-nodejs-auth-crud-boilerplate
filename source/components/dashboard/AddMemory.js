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

    onTestClick() {
        const first = document.getElementsByClassName("add-memory__test__3")[0];
        const second = document.getElementsByClassName("add-memory__test__1")[0];
        const third = document.getElementsByClassName("add-memory__test__2")[0];

        first.classList.add("add-memory__test__3--active");
        setTimeout(() => {
            second.classList.add("add-memory__test__1--active");
            third.classList.add("add-memory__test__2--active");
        }, 300);
    };

    render() {
        return (
            // <div className="add-memory__test" onClick={this.onTestClick.bind(this)}>
            //     <div className="add-memory__test__1"></div>
            //     <div className="add-memory__test__2"></div>
            //     <div className="add-memory__test__3"></div>
            // </div>
            <div>
                <form
                    className="add-memory"
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
