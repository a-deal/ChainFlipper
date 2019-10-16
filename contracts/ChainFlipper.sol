pragma solidity ^0.5.0;

/// @title A simulated coin flipper with rewards for winners
/// @author Andrew Deal
/// @notice You can use this contract to win ETH if you guess heads or tails correctly!
contract ChainFlipper {

  Outcomes prediction;
  mapping (address => Record) private records;

  struct Record {
    uint wins;
    uint losses;
  }

  enum Outcomes {
    Tails,
    Heads
  }

  /// @param _guess represents a guess by an account
  event Prediction(Outcomes indexed _guess , address indexed _player);
  /// @param _result represents the result returned by a RNG
  event Result(Outcomes indexed _result, address indexed _player);

  constructor() public {
    records[msg.sender] = Record({wins: 0, losses: 0});
  }

  /// @notice Retrieves the current record for a given player
  /// @param _player An account address tied to a specific address
  /// @return win and loss count
  function getRecord(address _player) public view returns(uint, uint) {
    return (records[_player].wins, records[_player].losses);
  }

  /// @notice Takes a player's guess and records it against a generated result
  /// @param _prediction a player's prediction
  function flip(uint _prediction) public {
    // TODO 
    // Record prediction
    // Generate Result
    // Emit Result Event
    // Update Player's record
  }

  /// @notice Records a player's prediction of either Heads or Tails
  /// @param _prediction the prediction of either Heads or Tails
  /// @return the recorded player's prediction
  function predict(uint _prediction) internal returns (uint) {
    emit Prediction(Outcomes(_prediction), msg.sender);
    if (_prediction == uint(Outcomes.Tails)) {
      prediction = Outcomes.Tails;
    } else {
      prediction = Outcomes.Heads;
    }
    return uint(prediction);
  }
}
