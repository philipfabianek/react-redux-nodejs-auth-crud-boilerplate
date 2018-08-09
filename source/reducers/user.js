// const userDefaultState = window.__USER__ || false;

// const userReducer = (state = userDefaultState, action) => {
const userReducer = (state = false, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return action.user;
        case "LOGOUT_USER":
            return false;
        case "EDIT_USER":
            return state;
        default:
            return state;
    }
};

export default userReducer;
