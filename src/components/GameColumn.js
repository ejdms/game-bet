import React from "react";

import GameColorColumn from "./GameColorColumn";
import GameOptions from "./GameOptions";
import GameInfo from "./GameInfo";
import GameColumnBet from "./GameColumnBet";
import GameStartScreen from "./GameStartScreen";

const GameColumn = props => {
  const { color, purpose } = props;

  let code = "";

  if (purpose === "history") {
    const { history } = props;
    let i = -3;
    let historyRecords = [];
    history.forEach(record => {
      i += 3;
      for (let index = 0; index < 3; index++) {
        switch (index) {
          case 0:
            historyRecords.push(<div key={i}>{record.bet}</div>);
            break;
          case 1:
            historyRecords.push(<div key={i + 1}>{record.profit}</div>);
            break;
          case 2:
            historyRecords.push(<div key={i + 2}>{record.steps}</div>);
            break;
          default:
            break;
        }
      }
    });
    code = (
      <div className="game-column game-history-column">
        <GameColorColumn color={color}>
          <div>Bet</div>
          <div>Profit</div>
          <div>Steps</div>
          {historyRecords}
        </GameColorColumn>
      </div>
    );
  } else if (purpose === "game") {
    const {
      game,
      handleGameButtonClick,
      handleChangeDifficulty,
      handleChangeBet,
      handleGameFieldClick
    } = props;
    const cells = game.currentGame.cells.map(cell => (
      <GameColumnBet
        key={cell.id}
        id={cell.id}
        value={cell.value}
        click={handleGameFieldClick}
        playable={cell.playable}
        hasBomb={cell.hasBomb}
        clicked={cell.clicked}
      />
    ));

    code = (
      <div className="game-column game-game-column">
        <GameColorColumn
          color={color}
          columnsNumber={`${game.difficulty === "medium" ? 2 : 3}`}
          startScreenVisible={game.startScreenVisible}
        >
          {game.startScreenVisible ? <GameStartScreen /> : [...cells]}
        </GameColorColumn>
        <GameOptions
          game={game}
          handleChangeBet={handleChangeBet}
          handleChangeDifficulty={handleChangeDifficulty}
          handleGameButtonClick={handleGameButtonClick}
        />
      </div>
    );
  } else if (purpose === "info") {
    const { info } = props;
    code = (
      <div className="game-column game-info-column">
        <GameColorColumn color={color}>
          <div>
            <div>Money: {info.money}$</div>
          </div>
          <div>
            <div>Games Played: {info.gamesPlayed}</div>
          </div>
        </GameColorColumn>
        <GameInfo />
      </div>
    );
  }

  return code;
};

export default GameColumn;
