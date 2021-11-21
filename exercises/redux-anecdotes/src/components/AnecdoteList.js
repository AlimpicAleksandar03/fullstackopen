import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { voteMessage } from "../reducers/notificationReducer";

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
  const filterState = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  if (!filterState) {
    return (
      <div>
        {anecdotes
          .sort((a1, a2) => a2.votes - a1.votes)
          .map((anecdote) => (
            <Anecdote
              key={anecdote.id}
              key={anecdote.id}
              content={anecdote.content}
              votes={anecdote.votes}
              handleVote={() => {
                dispatch(vote(anecdote.id));
                dispatch(voteMessage(`you voted '${anecdote.content}'`));
              }}
            />
          ))}
      </div>
    );
  } else {
    const filtered = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filterState.toLowerCase()),
    );
    return (
      <div>
        {filtered.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            key={anecdote.id}
            content={anecdote.content}
            votes={anecdote.votes}
            handleVote={() => {
              dispatch(vote(anecdote.id));
              dispatch(voteMessage(`you voted '${anecdote.content}'`));
            }}
          />
        ))}
      </div>
    );
  }
};

export default AnecdoteList;
