const ChainFlipper = artifacts.require("ChainFlipper");

module.exports = function(deployer) {
  deployer.deploy(ChainFlipper);
};
