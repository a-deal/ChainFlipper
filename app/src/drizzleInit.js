import { Drizzle, generateStore } from "@drizzle/store";
import reducers from "./reducers";

import ChainFlipper from "./contracts/ChainFlipper.json";

const options = {
  web3: {
    block: false
  },
  contracts: [ChainFlipper],
  events: {
    ChainFlipper: [
      {
        eventName: "LogPrediction",
        eventOptions: { fromBlock: 0, toBlock: "latest" }
      },
      {
        eventName: "LogResult",
        eventOptions: { fromBlock: 0, toBlock: "latest" }
      }
    ]
  },
  polls: {
    accounts: 10000
  }
};

const store = generateStore({
  options,
  appReducers: {
    ...reducers
  }
});

export const initializeDrizzle = () => {
  return new Drizzle(options, store);
};
