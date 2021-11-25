import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
    const resp = await axios.get(baseUrl);
    return resp.data;
};
const createBlog = async (blog, config) => {
    const response = await axios.post(baseUrl, blog, config);
    return response.data;
};
const login = async (credentials) => {
    const response = await axios.post("/api/login", credentials);
    return response.data;
};
export default { getAll, createBlog, login };
