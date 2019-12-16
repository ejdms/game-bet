import React, { useState, useEffect } from "react";
import { StoreProvider } from "easy-peasy";
import store from "../store";
import GameField from "../components/GameField";
import GameHeader from "../components/GameHeader";
import GameColumns from "../components/GameColumns";
import GameColumn from "../components/GameColumn";

const Game = () => {
  const [history, setHistory] = useState([
    {
      bet: 2,
      profit: 0,
      steps: 1
    },
    {
      bet: 20,
      profit: 12,
      steps: 2
    }
  ]);
  const [game, setGame] = useState({
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
      canChangeDifficultyOrBet: true
    }
  });
  const [info, setInfo] = useState({
    money: 1000,
    gamesPlayed: 0
  });

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

    setGame(prev => ({
      ...prev,
      currentGame: {
        ...prev.currentGame,
        level: 1,
        cells,
        cellsWithBombs: bombIndexes
      }
    }));
  };

  const disableCells = (playable = false, clicked = false) => {
    console.log("Exec disableCells");
    const cells = [...game.currentGame.cells];
    const newCells = cells.map(cell => {
      if (playable) cell.playable = false;
      if (clicked) cell.clicked = false;
      return cell;
    });
    setGame(prev => ({
      ...prev,
      currentGame: {
        ...prev.currentGame,
        cells: [...newCells]
      }
    }));
  };

  const changeTextOnMainButton = () => {
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
    setGame(prev => ({
      ...prev,
      textOnMainButton: text,
      currentGame: {
        ...prev.currentGame
      }
    }));
  };

  const gameOver = (profitIsPositive = true, clickedCell = null) => {
    console.log("Exec gameOver");
    // debugger;
    setHistory(prev => {
      const bet = game.bet;
      let profit = null;
      if (game.currentGame.level === 1) {
        profit = clickedCell.value;
      } else {
        profit = game.bet;
      }
      if (!profitIsPositive) profit *= -1;
      const steps = game.currentGame.level;
      return [
        ...prev,
        {
          bet,
          profit,
          steps
        }
      ];
    });
    setInfo(prev => ({
      ...info,
      money: prev.money + game.currentPrize,
      gamesPlayed: prev.gamesPlayed + 1
    }));

    setGame(prev => ({
      ...prev,
      play: false,
      reset: true,
      currentPrize: 0,
      // textOnMainButton: "Play again",
      currentGame: {
        ...prev.currentGame,
        // activeCells: [],
        canChangeDifficultyOrBet: true
      }
    }));
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
    // console.log(playableIndexes);
    const newCells = cells.map(cell => {
      let playable = false;

      playableIndexes.forEach(index => {
        if (cell.id === index) playable = true;
      });

      if (playable) {
        cell.playable = true;
        activeCells.push(cell);
        // console.log(cell);
      } else {
        cell.playable = false;
      }

      return cell;
    });
    setGame(prev => ({
      ...prev,
      currentGame: {
        ...prev.currentGame,
        activeCells,
        cells: [...newCells]
      }
    }));
  };

  const handleChangeBet = (type, e) => {
    console.log("Exec handleChangeBet");
    if (!game.play) {
      if (type === "-") {
        setGame(prev => ({
          ...game,
          bet: prev.bet - 1
        }));
      } else if (type === "+") {
        setGame(prev => ({
          ...game,
          bet: prev.bet + 1
        }));
      } else if (type === "change") {
        let value = e.target.value;
        if (value === "") value = 0;
        if (!/^[0-9]+$/.test(value)) return console.log("not number");
        const valueString = value + "";
        if (valueString.length > 1 && valueString[0] === "0")
          value = parseInt(valueString.slice(0));
        setGame(prev => ({
          ...prev,
          bet: value,
          currentGame: {
            ...prev.currentGame
          }
        }));
      }
    }
  };
  // OLD CHANGE DIFFICULTY FUNCTION
  // const handleChangeDifficulty = difficulty => {
  //   const easyMultiply = [
  //     1.46,
  //     2.12,
  //     3.08,
  //     4.48,
  //     6.52,
  //     9.49,
  //     13.81,
  //     20.09,
  //     29.23,
  //     42.52
  //   ];
  //   const mediumMultiply = [
  //     1.94,
  //     3.76,
  //     7.3,
  //     14.16,
  //     27.48,
  //     53.31,
  //     103.42,
  //     200.64,
  //     389.24,
  //     755.12
  //   ];
  //   const hardMultiply = [
  //     2.91,
  //     8.47,
  //     24.64,
  //     71.71,
  //     208.67,
  //     607.24,
  //     1767.06,
  //     5142.14,
  //     14963.63,
  //     43544.16
  //   ];
  //   if (
  //     !game.play &&
  //     (difficulty === "easy" ||
  //       difficulty === "medium" ||
  //       difficulty === "hard")
  //   ) {
  //     let cells = [];
  //     let bombIndexes = [];
  //     let mulitplyTable = [];
  //     // Bombs random start
  //     const multiplyier = difficulty === "medium" ? 2 : 3;
  //     let setBombInThisRow = true;
  //     let i = 1;
  //     while (i < 10 * multiplyier) {
  //       if (setBombInThisRow) {
  //         const plus = Math.floor(Math.random() * multiplyier);
  //         bombIndexes.push(i - 1 + plus);
  //       } else {
  //         if (i % multiplyier === 0) setBombInThisRow = true;
  //       }
  //       i += multiplyier;
  //     }

  //     // Bombs random end

  //     if (difficulty === "easy") {
  //       mulitplyTable = easyMultiply;
  //     } else if (difficulty === "medium") {
  //       mulitplyTable = mediumMultiply;
  //     } else {
  //       mulitplyTable = hardMultiply;
  //     }

  //     for (let i = 0; i < 10 * multiplyier; i++) {
  //       const value = Math.floor(
  //         game.bet * mulitplyTable[Math.floor(i / multiplyier)]
  //       );
  //       const hasBomb = bombIndexes.includes(i);

  //       cells.push({
  //         id: i + 1,
  //         value,
  //         hasBomb
  //       });
  //     }

  //     setGame({
  //       ...game,
  //       difficulty,
  //       currentGame: {
  //         ...game.currentGame,
  //         cells,
  //         cellsWithBombs: bombIndexes
  //       }
  //     });
  //   }
  // };
  // NEW CHANGE DIFFICULTY FUNCTION - SHOULD CHANGE DIFFICULTY AND THEN CALL fillPlaygroundWithCells FUNCTION
  const handleChangeDifficulty = difficulty => {
    console.log("Exec handleChangeDifficulty");
    if (
      game.currentGame.canChangeDifficultyOrBet &&
      (difficulty === "easy" ||
        difficulty === "medium" ||
        difficulty === "hard")
    ) {
      setGame(prev => ({
        ...prev,
        // play: true,
        startScreenVisible: false,
        // textOnMainButton: "Click on active field",
        difficulty,
        currentGame: {
          ...prev.currentGame
        }
      }));
      // changeTextOnMainButton();
    }
  };
  // const handleGameButtonClick = () => {
  //   if (game.play && !game.reset) {
  //     //zakonczenie gry

  //     setHistory(prev => {
  //       const bet = game.bet;
  //       const profit = game.currentPrize;
  //       const steps = prev[prev.length - 1].steps + 1;
  //       return [
  //         ...prev,
  //         {
  //           bet,
  //           profit,
  //           steps
  //         }
  //       ];
  //     });
  //     setInfo(prev => ({
  //       ...info,
  //       money: prev.money + game.currentPrize,
  //       gamesPlayed: prev.gamesPlayed + 1
  //     }));

  //     disableCells(true,false);

  //     setGame(prev => ({
  //       ...prev,
  //       play: false,
  //       reset: true,
  //       currentPrize: 0,
  //       textOnMainButton: "Play again",
  //       currentGame: {
  //         ...prev.currentGame,
  //         activeCells: [],
  //         canChangeDifficultyOrBet: true
  //       }
  //     }));
  //   } else if (game.difficulty && !game.reset) {
  //     //rozpoczecie gry
  //     disableCells(true,false);
  //     fillPlaygroundWithCells();
  //     createPlayableCells();
  //     setGame(prev => ({
  //       ...prev,
  //       play: true,
  //       currentPrize: 0,
  //       currentGame: {
  //         ...prev.currentGame
  //       }
  //     }));
  //   } else if (game.reset) {
  //     fillPlaygroundWithCells();
  //     createPlayableCells();
  //   }
  // };
  const handleGameButtonClick = () => {
    console.log("Exec handleGameButtonClick");
    if (game.reset) {
      setGame(prev => ({
        ...prev,
        reset: false,
        currentGame: { ...prev.currentGame }
      }));
      disableCells(true, true);
      fillPlaygroundWithCells();
      createPlayableCells();
      // changeTextOnMainButton();
    } else {
      if (game.currentGame.level > 1) {
        if (game.play) {
          gameOver();
          //zakonczenie gry
          // setHistory(prev => {
          //   const bet = game.bet;
          //   const profit = game.currentPrize;
          //   const steps = prev[prev.length - 1].steps + 1;
          //   return [
          //     ...prev,
          //     {
          //       bet,
          //       profit,
          //       steps
          //     }
          //   ];
          // });
          // setInfo(prev => ({
          //   ...info,
          //   money: prev.money + game.currentPrize,
          //   gamesPlayed: prev.gamesPlayed + 1
          // }));
          // disableCells(true, false);
          // setGame(prev => ({
          //   ...prev,
          //   play: false,
          //   reset: true,
          //   currentPrize: 0,
          //   // textOnMainButton: "Play again",
          //   currentGame: {
          //     ...prev.currentGame,
          //     activeCells: [],
          //     canChangeDifficultyOrBet: true
          //   }
          // }));
          // changeTextOnMainButton();
        } else if (game.difficulty) {
          //rozpoczecie gry
          if (game.reset) {
            disableCells(false, true);
          } else {
            disableCells(true, true);
          }
          fillPlaygroundWithCells();
          if (!game.reset) createPlayableCells();
          setGame(prev => ({
            ...prev,
            reset: false,
            play: true,
            currentPrize: 0,
            currentGame: {
              ...prev.currentGame
            }
          }));
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
        setGame(prev => ({
          ...prev,
          play: true,
          currentGame: {
            ...prev.currentGame,
            canChangeDifficultyOrBet: false
          }
        }));
        setInfo(prev => ({
          ...prev,
          money: prev.money - game.bet
        }));
      }

      if (clickedCell.hasBomb) {
        //game over
        // setGame(prev => ({
        //   ...prev,
        //   play: false,
        //   reset: true,
        //   currentGame: {
        //     ...prev.currentGame,
        //     activeCells: [],
        //     level: 1,
        //     currentPrize: 0
        //   }
        // }));
        // disableCells(true, false);
        // changeTextOnMainButton();
        gameOver(false, clickedCell);
      } else {
        //can play
        setGame(prev => ({
          ...prev,
          currentPrize: prev.currentPrize + clickedCell.value,
          currentGame: {
            ...prev.currentGame,
            level: prev.currentGame.level + 1,
            canChangeDifficultyOrBet: false
          }
        }));
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
    fillPlaygroundWithCells();
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
      // const clickedCells = [...newCells.filter(cell => cell.clicked)];
      setGame(prev => ({
        ...prev,
        // textOnMainButton:
        //   clickedCells.length && game.play
        //     ? `Take ${game.currentPrize}`
        //     : prev.textOnMainButton,
        currentGame: {
          ...prev.currentGame,
          cells: [...newCells]
        }
      }));
      // changeTextOnMainButton();
    }
  }, [game.currentGame.activeCells]);
  useEffect(() => {
    console.log("Exec useEffect textOnButton");
    changeTextOnMainButton();
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
