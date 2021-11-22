import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";
const getAll = async () => {
  const resp = await axios.get(baseUrl);
  return resp.data;
};
const createAnecdote = async (content) => {
  const anecdote = { content, important: false, votes: 0 };
  const resp = await axios.post(baseUrl, anecdote);
  return resp.data;
};
const updateAnecdote = async (anecdote) => {
  const resp = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return resp.data;
};

export default {
  getAll,
  createAnecdote,
  updateAnecdote,
};
