// history

export const addRecord = record => ({
  type: "ADD_RECORD",
  payload: record
});

export const resetRecords = () => ({
  type: "RESET_RECORDS"
});

// game

export const stopGame = () => ({
  type: "STOP_GAME"
});

export const startGame = () => ({
  type: "START_GAME"
});

export const enableReset = () => ({
  type: "ENABLE_RESET"
});

export const disableReset = () => ({
  type: "DISABLE_RESET"
});

export const changeBet = bet => ({
  type: "CHANGE_BET",
  payload: bet
});

export const increaseBet = () => ({
  type: "INCREASE_BET"
});

export const decreaseBet = () => ({
  type: "DECREASE_BET"
});

export const changeCurrentPrize = currentPrize => ({
  type: "CHANGE_CURRENT_PRIZE",
  payload: currentPrize
});

export const addToCurrentPrize = addedValue => ({
  type: "ADD_TO_CURRENT_PRIZE",
  payload: addedValue
});

export const changeDifficulty = difficulty => ({
  type: "CHANGE_DIFFICULTY",
  payload: difficulty
});

export const hideStartScreen = () => ({
  type: "HIDE_START_SCREEN"
});

export const showStartScreen = () => ({
  type: "SHOW_START_SCREEN"
});

export const changeTextOnMainButton = text => ({
  type: "CHANGE_TEXT_ON_MAIN_BUTTON",
  payload: text
});

export const increaseLevel = () => ({
  type: "INCREASE_LEVEL"
});

export const resetLevel = () => ({
  type: "RESET_LEVEL"
});

export const changeCells = cells => ({
  type: "CHANGE_CELLS",
  payload: cells
});

export const changeActiveCells = activeCells => ({
  type: "CHANGE_ACTIVE_CELLS",
  payload: activeCells
});

export const changeCellsWithBombs = cellsWithBombs => ({
  type: "CHANGE_CELLS_WITH_BOMBS",
  payload: cellsWithBombs
});

export const disableDifficultyChange = () => ({
  type: "DISABLE_DIFFICULTY_CHANGE"
});

export const enableDifficultyChange = () => ({
  type: "ENABLE_DIFFICULTY_CHANGE"
});

export const disableBetChange = () => ({
  type: "DISABLE_BET_CHANGE"
});

export const enableBetChange = () => ({
  type: "ENABLE_BET_CHANGE"
});

// info

export const addMoney = money => ({
  type: "ADD_MONEY",
  payload: money
});

export const removeMoney = money => ({
  type: "REMOVE_MONEY",
  payload: money
});

export const incrementGamesPlayed = () => ({
  type: "INCREMENT_GAMES_PLAYED"
});

export const resetGamesPlayed = money => ({
  type: "RESET_GAMES_PLAYED"
});
