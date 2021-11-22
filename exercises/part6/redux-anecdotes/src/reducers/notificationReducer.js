const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      return action.message;
    }
    case "CLEAR": {
      return "";
    }
    default:
      return state;
  }
};
export const clearMessage = () => {
  return {
    type: "CLEAR",
  };
};

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch({ type: "SET_NOTIFICATION", message });
    setTimeout(() => dispatch(clearMessage()), time * 1000);
  };
};

export default reducer;
