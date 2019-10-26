const dotenv = require("dotenv");
const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");

dotenv.config();
const INFURA_MNEMONIC = process.env.INFURA_MNEMONIC;
const INFURA_KEY = process.env.INFURA_KEY;
const RINKEBY_HTTPS = `https://rinkeby.infura.io/v3/${INFURA_KEY}`;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      gas: 500000
    },
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider() {
        return new HDWalletProvider(INFURA_MNEMONIC, RINKEBY_HTTPS);
      },
      network_id: 4,
      gas: 6e6,
      gasPrice: 5e9,
      websockets: true
    }
  }
};
