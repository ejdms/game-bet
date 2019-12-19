const initialState = {
  play: false,
  reset: false,
  bet: 20,
  currentPrize: 0,
  difficulty: null,
  startScreenVisible: true,
  textOnMainButton: "Choose difficulty",
  currentGame: {
    level: null,
    cells: [],
    activeCells: [],
    cellsWithBombs: [],
    canChangeDifficulty: true,
    canChangeBet: true
  }
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case "STOP_GAME":
      return {
        ...state,
        play: false,
        currentGame: { ...state.currentGame }
      };
    case "START_GAME":
      return {
        ...state,
        play: true,
        currentGame: { ...state.currentGame }
      };
    case "ENABLE_RESET":
      return {
        ...state,
        reset: true,
        currentGame: { ...state.currentGame }
      };
    case "DISABLE_RESET":
      return {
        ...state,
        reset: false,
        currentGame: { ...state.currentGame }
      };
    case "CHANGE_BET":
      return {
        ...state,
        bet: action.payload,
        currentGame: { ...state.currentGame }
      };
    case "INCREASE_BET":
      return {
        ...state,
        bet: state.bet + 1,
        currentGame: { ...state.currentGame }
      };
    case "DECREASE_BET":
      return {
        ...state,
        bet: state.bet - 1,
        currentGame: { ...state.currentGame }
      };
    case "CHANGE_CURRENT_PRIZE":
      return {
        ...state,
        currentPrize: action.payload,
        currentGame: { ...state.currentGame }
      };
    case "ADD_TO_CURRENT_PRIZE":
      return {
        ...state,
        currentPrize: state.currentPrize + action.payload,
        currentGame: { ...state.currentGame }
      };
    case "CHANGE_DIFFICULTY":
      return {
        ...state,
        difficulty: action.payload,
        currentGame: { ...state.currentGame }
      };
    case "HIDE_START_SCREEN":
      return {
        ...state,
        startScreenVisible: false,
        currentGame: { ...state.currentGame }
      };
    case "SHOW_START_SCREEN":
      return {
        ...state,
        startScreenVisible: true,
        currentGame: { ...state.currentGame }
      };
    case "CHANGE_TEXT_ON_MAIN_BUTTON":
      return {
        ...state,
        textOnMainButton: action.payload,
        currentGame: { ...state.currentGame }
      };
    case "INCREASE_LEVEL":
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          level: state.currentGame.level + 1
        }
      };
    case "RESET_LEVEL":
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          level: 1
        }
      };
    case "CHANGE_CELLS":
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          cells: action.payload
        }
      };
    case "CHANGE_ACTIVE_CELLS":
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          activeCells: action.payload
        }
      };
    case "CHANGE_CELLS_WITH_BOMBS":
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          cellsWithBombs: action.payload
        }
      };
    case "ENABLE_DIFFICULTY_CHANGE":
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          canChangeDifficulty: true
        }
      };
    case "DISABLE_DIFFICULTY_CHANGE":
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          canChangeDifficulty: false
        }
      };
    case "ENABLE_BET_CHANGE":
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          canChangeBet: true
        }
      };
    case "DISABLE_BET_CHANGE":
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          canChangeBet: false
        }
      };
    default:
      return state;
  }
};

export default game;
