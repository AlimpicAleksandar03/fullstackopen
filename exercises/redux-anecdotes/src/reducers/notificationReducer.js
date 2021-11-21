const reducer = (state, action) => {
  switch (action.type) {
    case "VOTED": {
      return action.message;
    }
    case "CLEAR": {
      return "";
    }
    case "CREATED": {
      return action.message;
    }
    default:
      return "";
  }
};

export const voteMessage = (message) => {
  return {
    type: "VOTED",
    message,
  };
};
export const clearMessage = () => {
  return {
    type: "CLEAR",
  };
};
export const createdNotification = (message) => {
  return {
    type: "CREATED",
    message,
  };
};

export default reducer;
