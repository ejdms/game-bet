import React, { useEffect } from "react";
import { StoreProvider } from "easy-peasy";
import { useSelector, useDispatch } from "react-redux";
import {
  addRecord,
  // resetRecords,
  stopGame,
  startGame,
  enableReset,
  disableReset,
  changeBet,
  increaseBet,
  decreaseBet,
  changeCurrentPrize,
  addToCurrentPrize,
  changeDifficulty,
  hideStartScreen,
  // showStartScreen,
  changeTextOnMainButton,
  increaseLevel,
  resetLevel,
  changeCells,
  changeActiveCells,
  changeCellsWithBombs,
  disableDifficultyChange,
  enableDifficultyChange,
  disableBetChange,
  enableBetChange,
  addMoney,
  removeMoney,
  incrementGamesPlayed
  // resetGamesPlayed
} from "../actions";

import store from "../store";
import GameField from "../components/GameField";
import GameHeader from "../components/GameHeader";
import GameColumns from "../components/GameColumns";
import GameColumn from "../components/GameColumn";

const Game = () => {
  const dispatch = useDispatch();
  const history = useSelector(state => state.history);
  const game = useSelector(state => state.game);
  const info = useSelector(state => state.info);

  //
  const fillPlaygroundWithCells = () => {
    console.log("Exec fillPlaygroundWithCells");
    const { difficulty } = game;
    const easyMultiply = [
      1.46,
      2.12,
      3.08,
      4.48,
      6.52,
      9.49,
      13.81,
      20.09,
      29.23,
      42.52
    ];
    const mediumMultiply = [
      1.94,
      3.76,
      7.3,
      14.16,
      27.48,
      53.31,
      103.42,
      200.64,
      389.24,
      755.12
    ];
    const hardMultiply = [
      2.91,
      8.47,
      24.64,
      71.71,
      208.67,
      607.24,
      1767.06,
      5142.14,
      14963.63,
      43544.16
    ];

    let cells = [];
    let bombIndexes = [];
    let mulitplyTable = [];
    // Bombs random start
    const multiplyier = difficulty === "medium" ? 2 : 3;
    let setBombInThisRow = true;
    let i = 1;
    while (i < 10 * multiplyier) {
      if (setBombInThisRow) {
        const plus = Math.floor(Math.random() * multiplyier);
        bombIndexes.push(i - 1 + plus);
      } else {
        if (i % multiplyier === 0) setBombInThisRow = true;
      }
      i += multiplyier;
    }
    // Bombs random end

    if (difficulty === "easy") {
      mulitplyTable = easyMultiply;
    } else if (difficulty === "medium") {
      mulitplyTable = mediumMultiply;
    } else {
      mulitplyTable = hardMultiply;
    }

    for (let i = 0; i < 10 * multiplyier; i++) {
      const value = Math.floor(
        game.bet * mulitplyTable[Math.floor(i / multiplyier)]
      );
      const hasBomb = bombIndexes.includes(i);

      cells.push({
        id: i + 1,
        value,
        hasBomb,
        playable: false,
        clicked: false
      });
    }

    cells.reverse();

    dispatch(resetLevel());
    dispatch(changeCells(cells));
    dispatch(changeCellsWithBombs(bombIndexes));
  };

  const disableCells = (playable = false, clicked = false) => {
    console.log("Exec disableCells");
    const cells = [...game.currentGame.cells];
    const newCells = cells.map(cell => {
      if (playable) cell.playable = false;
      if (clicked) cell.clicked = false;
      return cell;
    });
    dispatch(changeCells([...newCells]));
  };

  const changeTextOnMainButtonFunction = () => {
    console.log("Exec changeTextOnMainButton");
    let text = "";
    if (!game.play && !game.reset) {
      text = game.difficulty ? "Click on active field" : "Choose difficulty";
    } else if (game.play && !game.reset) {
      text =
        game.currentGame.level > 1
          ? `Take ${game.currentPrize}$`
          : "Click on active field";
    } else if (!game.play && game.reset) {
      text = "Reset";
    } else {
      text = "Not defined";
    }
    dispatch(changeTextOnMainButton(text));
  };

  const gameOver = (profitIsPositive = true, clickedCell = null) => {
    console.log("Exec gameOver");
    const bet = game.bet;
    let profit = null;
    if (game.currentGame.level === 1) {
      profit = clickedCell.value;
    } else {
      profit = game.bet;
    }
    if (!profitIsPositive) profit *= -1;
    const steps = game.currentGame.level;
    dispatch(
      addRecord({
        bet,
        profit,
        steps
      })
    );
    dispatch(addMoney(game.currentPrize));
    dispatch(incrementGamesPlayed());
    dispatch(stopGame());
    dispatch(enableReset());
    dispatch(changeCurrentPrize(0));
    dispatch(disableDifficultyChange());
    dispatch(disableBetChange());
    disableCells(true, false);
  };

  const createPlayableCells = () => {
    console.log("Exec createPlayableCells");
    let cells = [...game.currentGame.cells];
    let activeCells = [];
    const multiplyier = game.difficulty === "medium" ? 2 : 3;
    const { level } = game.currentGame;
    let playableIndexes = [];
    for (let i = 0; i < multiplyier; i++) {
      playableIndexes.push((level - 1) * multiplyier + i + 1);
    }
    const newCells = cells.map(cell => {
      let playable = false;

      playableIndexes.forEach(index => {
        if (cell.id === index) playable = true;
      });

      if (playable) {
        cell.playable = true;
        activeCells.push(cell);
      } else {
        cell.playable = false;
      }

      return cell;
    });
    dispatch(changeActiveCells(activeCells));
    dispatch(changeCells([...newCells]));
  };

  const handleChangeBet = (type, e) => {
    console.log("Exec handleChangeBet");
    if (game.currentGame.canChangeBet) {
      if (type === "-") {
        dispatch(decreaseBet());
      } else if (type === "+") {
        dispatch(increaseBet());
      } else if (type === "change") {
        let value = e.target.value;
        if (value === "") value = 0;
        if (!/^[0-9]+$/.test(value)) return console.log("not number");
        const valueString = value + "";
        if (valueString.length > 1 && valueString[0] === "0")
          value = parseInt(valueString.slice(0));
        dispatch(changeBet(value));
      }
    }
  };
  const handleChangeDifficulty = difficulty => {
    console.log("Exec handleChangeDifficulty");
    if (
      game.currentGame.canChangeDifficulty &&
      (difficulty === "easy" ||
        difficulty === "medium" ||
        difficulty === "hard")
    ) {
      dispatch(hideStartScreen());
      dispatch(changeDifficulty(difficulty));
    }
  };
  const handleGameButtonClick = () => {
    console.log("Exec handleGameButtonClick");
    if (game.reset) {
      dispatch(disableReset());
      dispatch(enableBetChange());
      dispatch(enableDifficultyChange());
      disableCells(true, true);
      fillPlaygroundWithCells();
      createPlayableCells();
    } else {
      if (game.currentGame.level > 1) {
        if (game.play) {
          //zakonczenie gry
          gameOver();
        } else if (game.difficulty) {
          //rozpoczecie gry
          if (game.reset) {
            disableCells(false, true);
          } else {
            disableCells(true, true);
          }
          fillPlaygroundWithCells();
          if (!game.reset) createPlayableCells();
          dispatch(enableReset());
          dispatch(startGame());
          dispatch(changeCurrentPrize(0));
        }
      }
    }
  };
  const handleGameFieldClick = id => {
    console.log("Exec handleGameFieldClick");
    let cells = [...game.currentGame.cells];
    const clickedCell = cells.filter(cell => cell.id === id)[0];
    if (clickedCell.playable) {
      clickedCell.clicked = true;
      //pierwszy wybor gracza
      if (game.currentGame.level === 1) {
        dispatch(startGame());
        dispatch(disableDifficultyChange());
        dispatch(enableBetChange());
        dispatch(removeMoney(game.bet));
      }

      if (clickedCell.hasBomb) {
        //game over
        gameOver(false, clickedCell);
      } else {
        //can play
        dispatch(addToCurrentPrize(clickedCell.value));
        dispatch(increaseLevel());
        dispatch(disableDifficultyChange());
        dispatch(enableBetChange());
      }
    }
  };
  //
  useEffect(() => {
    console.log("Exec useEffect game.play");
    createPlayableCells();
  }, [game.play]);
  //
  useEffect(() => {
    console.log("Exec useEffect game.bet");
    if (!game.play) fillPlaygroundWithCells();
  }, [game.bet]);
  //
  useEffect(() => {
    console.log("Exec useEffect game.difficulty");
    fillPlaygroundWithCells();
  }, [game.difficulty]);

  useEffect(() => {
    console.log("Exec useEffect game.currerntGame.level");
    if (game.currentGame.level) {
      createPlayableCells();
    }
  }, [game.currentGame.level]);

  useEffect(() => {
    console.log("Exec useEffect game.currentGame.cells");
    if (game.currentGame.cells.length && !game.reset) {
      const activeCellsOnGameField = game.currentGame.cells.filter(
        cell => cell.playable
      );
      if (!activeCellsOnGameField.length) {
        createPlayableCells();
      }
    }
    const playableCells = game.currentGame.cells.filter(cell => cell.playable);
    if (game.reset && playableCells.length) {
      disableCells(true, false);
    }
  }, [game.currentGame.cells]);
  useEffect(() => {
    console.log("Exec useEffect game.currentGame.activeCells");
    const { activeCells } = game.currentGame;
    if (activeCells.length) {
      const cells = [...game.currentGame.cells];
      const newCells = cells.map(cell => {
        let shouldBePlayable = false;
        activeCells.forEach(activeCell => {
          if (cell.id === activeCell.id) {
            shouldBePlayable = true;
          }
        });
        if (shouldBePlayable) {
          cell.playable = true;
        } else {
          cell.playable = false;
        }
        return cell;
      });
      dispatch(changeCells([...newCells]));
    }
  }, [game.currentGame.activeCells]);
  useEffect(() => {
    console.log("Exec useEffect textOnButton");
    changeTextOnMainButtonFunction();
  }, [game.play, game.reset, game.difficulty, game.currentGame.level]);
  //
  return (
    <StoreProvider store={store}>
      <GameField>
        <GameHeader />
        <GameColumns>
          <GameColumn purpose="history" color="red" history={history} />
          <GameColumn
            purpose="game"
            color="blue"
            game={game}
            handleChangeBet={handleChangeBet}
            handleChangeDifficulty={handleChangeDifficulty}
            handleGameButtonClick={handleGameButtonClick}
            handleGameFieldClick={handleGameFieldClick}
          />
          <GameColumn purpose="info" color="yellow" info={info} />
        </GameColumns>
      </GameField>
    </StoreProvider>
  );
};

export default Game;
