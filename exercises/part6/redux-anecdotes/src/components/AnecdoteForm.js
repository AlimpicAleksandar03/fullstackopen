import React from "react";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(newAnecdote(content));
    dispatch(setNotification(`${content} added!`, 2));
  };
  return (
    <form onSubmit={addAnecdote}>
      Add content
      <input name="anecdote" />
      <button type="submit">Add anecdote</button>
    </form>
  );
};
export default AnecdoteForm;
