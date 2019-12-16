import React from "react";

const GameOptions = props => {
  const {
    game,
    handleGameButtonClick,
    handleChangeDifficulty,
    handleChangeBet
  } = props;
  return (
    <>
      <button className="game-button" onClick={handleGameButtonClick}>
        {game.textOnMainButton}
      </button>
      <ul className="bet">
        <li>
          <div onClick={() => handleChangeBet("-")}>-</div>
        </li>
        <li>
          <input
            className="bet-input"
            type="text"
            value={game.bet}
            onChange={e => handleChangeBet("change", e)}
          />
        </li>
        <li>
          <div onClick={() => handleChangeBet("+")}>+</div>
        </li>
      </ul>
      <ul className="difficulty">
        <li
          className={`easy${game.difficulty === "easy" ? " active" : ""}`}
          onClick={() => handleChangeDifficulty("easy")}
        >
          easy
        </li>
        <li
          className={`medium${game.difficulty === "medium" ? " active" : ""}`}
          onClick={() => handleChangeDifficulty("medium")}
        >
          medium
        </li>
        <li
          className={`hard${game.difficulty === "hard" ? " active" : ""}`}
          onClick={() => handleChangeDifficulty("hard")}
        >
          hard
        </li>
      </ul>
    </>
  );
};

export default GameOptions;
