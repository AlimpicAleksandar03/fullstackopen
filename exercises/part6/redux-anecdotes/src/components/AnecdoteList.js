import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ id, content, votes, handleVote }) => {
  return (
    <div key={id}>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotesToShow = useSelector(({ filter, anecdotes }) => {
    if (!filter) return anecdotes;
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()),
    );
  });
  const dispatch = useDispatch();
  return (
    <div>
      {anecdotesToShow
        .sort((a1, a2) => a2.votes - a1.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            content={anecdote.content}
            votes={anecdote.votes}
            handleVote={() => {
              const updatedAnecdote = {
                ...anecdote,
                votes: anecdote.votes + 1,
              };
              dispatch(vote(updatedAnecdote));
              dispatch(setNotification(`you voted '${anecdote.content}'`, 2));
            }}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
