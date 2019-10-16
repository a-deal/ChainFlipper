pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ChainFlipper.sol";

contract TestChainFlipper {

  function testItInitializes() public {
    ChainFlipper chainFlipper = new ChainFlipper();

    (uint wins, uint losses) = chainFlipper.getRecord(address(this));

    Assert.isZero(wins, 'ChainFlipper should initialize an account with a zeroed win count');
    Assert.isZero(losses, 'ChainFlipper should initialize an account with a zeroed loss count');
  }

  function testItAllowsPredictions() public {
    ChainFlipper chainFlipper = new ChainFlipper();

    uint tails = 0;
    uint heads = 1;
    uint tailsPrediction = chainFlipper.predict(tails);
    uint headsPrediction = chainFlipper.predict(heads);

    Assert.equal(tailsPrediction, tails, "ChainFlipper should correctly record a player's prediction of Tails");
    Assert.equal(headsPrediction, heads, "ChainFliopper should correctly record a player's prediction of Heads");
  }
}
