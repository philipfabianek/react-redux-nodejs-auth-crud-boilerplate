import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./../reducers/user";
import memoriesReducer from "./../reducers/memories";

export default (state = {}) => {
    const store = createStore(
        combineReducers({
            user: userReducer,
            memories: memoriesReducer
        }),
        state,
        compose(applyMiddleware(thunk))
    );

    return store;
};
