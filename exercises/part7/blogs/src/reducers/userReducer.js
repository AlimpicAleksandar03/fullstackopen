import blogService from "../services/blogs";
const reducer = (state = null, action) => {
    switch (action.type) {
        case "GET_USER": {
            return state;
        }
        case "NEW_USER": {
            return action.data;
        }
        case "LOG_OUT": {
            return null;
        }

        default: {
            return state;
        }
    }
};

export const logIn = (credentials) => {
    return async (dispatch) => {
        const user = await blogService.login(credentials);
        dispatch({ type: "NEW_USER", data: user });
        return user;
    };
};

export const logOut = () => {
    return (dispatch) => {
        dispatch({ type: "LOG_OUT" });
    };
};
export default reducer;
