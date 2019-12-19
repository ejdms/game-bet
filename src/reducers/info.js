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
    case "REMOVE_MONEY":
      return {
        ...state,
        money: state.money - action.payload
      };
    case "INCREMENT_GAMES_PLAYED":
      return {
        ...state,
        gamesPlayed: state.gamesPlayed + 1
      };
    case "RESET_GAMES_PLAYED":
      return {
        ...state,
        gamesPlayed: 0
      };
    default:
      return state;
  }
};

export default info;
