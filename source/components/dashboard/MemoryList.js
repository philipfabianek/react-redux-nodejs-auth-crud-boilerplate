import React from "react";
import { connect } from "react-redux";

import { startRemoveMemory } from "./../../actions/memories";

import MemoryItem from "./MemoryItem";

export class MemoryList extends React.Component {
    onRemoveButtonClick(id) {
        this.props.startRemoveMemory(id);
    };

    render() {
        return (
            <div>
                {
                    this.props.memories.length > 0 &&
                    <ul>
                    {
                        this.props.memories.map((memory) => {
                            return <MemoryItem
                                key={memory._id}
                                memory={memory}
                            />
                        })
                    }
                    </ul>
                }
            </div>
        )
    };
};

const mapStateToProps = (state, props) => ({
    memories: state.memories
});

const mapDispatchToProps = (dispatch) => ({
    startRemoveMemory: (id) => dispatch(startRemoveMemory(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoryList);
