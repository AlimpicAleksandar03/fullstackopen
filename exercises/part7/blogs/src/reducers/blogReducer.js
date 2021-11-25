import blogService from "../services/blogs";
const reducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_BLOGS": {
            return action.data;
        }
        case "NEW_BLOG": {
            return [...state, action.data];
        }
        default:
            return state;
    }
};

export const initialBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch({ type: "INIT_BLOGS", data: blogs });
    };
};

export const createBlog = (blog, config) => {
    return async (dispatch) => {
        const created = await blogService.createBlog(blog, config);
        dispatch({ type: "NEW_BLOG", data: created });
    };
};

export default reducer;
