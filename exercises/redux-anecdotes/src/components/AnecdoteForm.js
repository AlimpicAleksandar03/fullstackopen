import React from "react";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { createdNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(newAnecdote(content));
    console.log(content);
    dispatch(createdNotification(`${content} added!`));
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
