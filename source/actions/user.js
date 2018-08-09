import axios from "axios";

export const logout = () => ({
    type: "LOGOUT_USER"
});

export const startLogout = () => {
    return (dispatch, getState) => {
        return axios.post("/auth/logout")
            .then((data) => {
                dispatch(logout())
            }).catch((err) => {
                console.log(err);
            });
    };
};

export const login = (user) => ({
    type: "LOGIN_USER",
    user
});

export const startLogin = (username = "", password = "") => {
    return (dispatch, getState) => {
        return axios.post("/auth/login", {
            username, password
        }).then((response) => {
            dispatch(login(response.data));
            return response.data;
        })
        // .catch((err) => {
        //     console.log(err);
        //     // promise.reject(err);
        // });
    };
};
