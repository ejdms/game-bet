import React from "react";

const GameInfo = props => (
  <div>
    MINE TOWER INFO Minesweeper based game. Can you reach the top of the tower?
    HOW TO PLAY: Choose a difficulty. Enter a bet value. Click START button.
    Pick one from the 3 (amount depends on difficulty) highlighted cells on the
    board. The good cell contains $ sign and the bad cell contains bomb sign. If
    you choosed good cell you are able to continue the game or withdraw the
    value of the chosen cell. If you choosed bad cell you lose the amount of
    money you've bet in that game. You can relad page by clicking the bomb icon
    in the title of the page. Difficulty: EASY - 1 bomb / 3 cells MEDIUM - 1
    bomb / 2 cells HARD - 2 bombs / 3 cells
  </div>
);
export default GameInfo;
