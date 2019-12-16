const initialState = {
  money: 1000,
  gamesPlayed: 0
};

const info = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MONEY":
      return {
        ...state,
        money: state.money + action.payload
      };
    default:
      return state;
  }
};

export default info;
