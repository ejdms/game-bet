import React from "react";

const GameColumnBet = props => {
  const { value, click, id, playable, clicked, hasBomb } = props;
  const className = `game-column-bet${playable ? " playable" : ""}${
    clicked ? (hasBomb ? " clicked-negative" : " clicked-positive") : ""
  }`;
  return (
    <div className={className} onClick={() => click(id)}>
      {value}$
    </div>
  );
};

export default GameColumnBet;
