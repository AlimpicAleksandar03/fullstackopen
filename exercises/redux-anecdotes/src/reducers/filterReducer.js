const reducer = (state, action) => {
  switch (action.type) {
    case "FILTER": {
      return action.filter;
    }
    default:
      return "";
  }
};

export const filterChange = (filter) => {
  return {
    type: "FILTER",
    filter,
  };
};

export default reducer;
