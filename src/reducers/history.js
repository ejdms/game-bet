const initialState = [
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
];

const history = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RECORD":
      const { bet, profit, steps } = action.payload;
      const newRecord = {
        bet,
        profit,
        steps
      };
      return [...state, newRecord];

    default:
      return state;
  }
};

export default history;
