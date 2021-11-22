import anecdoteService from "../services/anecdote";
const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE": {
      const anecdoteToVote = state.find(
        (anecdote) => anecdote.id === action.id,
      );
      const changed = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };
      return state.map((a) => (a.id == anecdoteToVote.id ? changed : a));
    }
    case "NEW_ANECDOTE": {
      return [...state, action.data];
    }
    case "INIT_ANECDOTES": {
      return action.data;
    }
    default:
      return state;
  }
};
export const vote = (updatedAnecdote) => {
  return async (dispatch) => {
    const updated = await anecdoteService.updateAnecdote(updatedAnecdote);
    dispatch({ type: "VOTE", id: updated.id });
  };
};
export const newAnecdote = (content) => {
  return async (dispatch) => {
    const created = await anecdoteService.createAnecdote(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: created,
    });
  };
};
export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default reducer;
