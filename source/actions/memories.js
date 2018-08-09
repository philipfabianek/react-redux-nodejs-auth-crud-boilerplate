import axios from "axios";

export const addMemory = (memory) => ({
    type: "ADD_MEMORY",
    memory
});

export const startAddMemory = (memory) => {
    return (dispatch, getState) => {
        const userId = getState().user.id;

        const {
            description = "",
            createdAt = Date.now(),
            note = ""
        } = memory;

        const finalMemory = { userId, description, createdAt, note };

        return axios.post("/api/add-memory", { memory: finalMemory })
            .then((response) => {
                const memoryId = response.data;
                dispatch(addMemory({
                    _id: memoryId,
                    ...finalMemory
                }));
            }).catch((err) => {
                console.log(err);
            });
    };
};

export const removeMemory = (id) => ({
    type: "REMOVE_MEMORY",
    id
});

export const startRemoveMemory = (id) => {
    return (dispatch, getState) => {
        return axios.post("/api/remove-memory", { id })
        .then((response) => {
            dispatch(removeMemory(id));
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const editMemory = (id, updates) => ({
    type: "EDIT_MEMORY",
    id,
    updates
});

export const startEditMemory = (memory) => {

};

export const setMemories = (memories) => ({
    type: "SET_MEMORIES",
    memories
});

export const startSetMemories = () => {
    return (dispatch, getState) => {
        const userId = getState().user.id;

        return axios.post("/api/get-memories", { userId })
            .then((response) => {
                const memories = response.data.memories;
                dispatch(setMemories(memories));
            }).catch((err) => {
                console.log(err);
            });
    };
};
