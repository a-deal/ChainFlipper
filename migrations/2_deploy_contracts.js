const ChainFlipper = artifacts.require("ChainFlipper");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ChainFlipper, {
    from: accounts[0],
    gas: 6721975,
    value: 500000000000000000
  });
};
