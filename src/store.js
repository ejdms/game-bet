import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducers";

// const store = createStore({
//   todos: {
//     items: ["Create store", "Wrap application", "Use store"],
//     add: action((state, payload) => {
//       state.items.push(payload);
//     })
//   }
// });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [];
const store = createStore(
  allReducers,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
