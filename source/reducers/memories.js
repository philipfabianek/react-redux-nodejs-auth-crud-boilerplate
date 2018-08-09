// const memoriesDefaultState = window.__MEMORIES__ || false;

// const memoriesReducer = (state = memoriesDefaultState, action) => {
const memoriesReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_MEMORIES":
            return action.memories;
        case "ADD_MEMORY":
            return [...state, action.memory];
        case "REMOVE_MEMORY":
            return state.filter((memory) => memory._id !== action.id);
        case "EDIT_MEMORY":
            return state.map((memory) => {
                if (memory.id === action.id) {
                    return {
                        ...memory,
                        ...action.updates
                    }
                } else {
                    return memory;
                }
            });
        default:
            return state;
    }
};

export default memoriesReducer;
