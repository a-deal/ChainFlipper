import ChainFlipper from "./contracts/ChainFlipper.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545"
    }
  },
  contracts: [ChainFlipper],
  events: {
    ChainFlipper: ["Prediction", "Result"]
  },
  polls: {
    accounts: 1500
  }
};

export default options;
