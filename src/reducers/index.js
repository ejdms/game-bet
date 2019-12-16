import game from "./game";
import history from "./history";
import info from "./info";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  game,
  history,
  info
});

export default allReducers;
