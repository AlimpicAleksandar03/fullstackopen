import axios from "axios";
const baseUrl = "/api/persons";

const fetchAll = () => axios.get(baseUrl).then((resp) => resp.data);
const create = (person) =>
    axios.post(baseUrl, person).then((resp) => resp.data);
const deleteUser = (id) => {
    console.log(`${baseUrl}/${id}`);
    return axios.delete(`${baseUrl}/${id}`).then((resp) => resp.data);
};
const updateNumber = (updatedPerson, id) => {
    return axios
        .put(`${baseUrl}/${id}`, { ...updatedPerson })
        .then((resp) => resp.data);
};
export default {
    fetchAll,
    create,
    deleteUser,
    updateNumber,
};
