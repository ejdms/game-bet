const initialState = {
  play: false,
  bet: 20,
  currentPrize: 0,
  difficulty: null,
  currentGame: {
    level: null,
    cells: [],
    cellsWithBombs: []
  }
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case "STOP_GAME":
      return {
        ...state,
        play: false
      };
    default:
      return state;
  }
};

export default game;
