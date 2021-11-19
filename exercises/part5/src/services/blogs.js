import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};
const createBlog = async (blog, config) => {
    const response = await axios.post(baseUrl, blog, config);
    return response.data;
};
const addLike = async (blog) => {
    const url = `${baseUrl}/${blog.id}`;
    const response = await axios.put(url, blog);
    return response.data;
};
const deleteBlog = async (blog, config) => {
    const url = `${baseUrl}/${blog.id}`;

    const response = await axios.delete(url, config);
    return response.status;
};

export default { getAll, createBlog, addLike, deleteBlog };
