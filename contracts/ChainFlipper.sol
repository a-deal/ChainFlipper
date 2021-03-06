pragma solidity ^0.5.0;

import "./provableAPI_0.5.sol";
import "./SafeMath.sol";

/// @title A simulated coin flipper with rewards for winners!
/// @author Andrew Deal
/// @notice You can use this contract to win ETH if you guess heads or tails correctly!
contract ChainFlipper is usingProvable {

  using SafeMath for uint;

  address owner;
  uint constant MAX_INT_FROM_BYTE = 256;
  uint constant NUM_RANDOM_BYTES_REQUESTED = 7;

  mapping (bytes32 => Flip) private flipsInProgress;

  enum Outcomes {
    Tails,
    Heads
  }
  struct Flip {
    Outcomes prediction;
    address sender;
  }

  /// @param _prediction represents a guess by an account
  /// @param _player represents a player's address
  event LogPrediction(address indexed _player, Outcomes _prediction, bytes32 _queryId);

  /// @param _result represents the coin flip result
  /// @param _player represents a player's address
  event LogResult(address indexed _player, Outcomes _result, bytes32 _queryId);

  constructor() public payable {
    // require(msg.value > 1 ether, '1 ether initial funding required');
    owner = msg.sender;
    provable_setProof(proofType_Ledger);
  }

  function __callback(
    bytes32 _queryId,
    string memory _result,
    bytes memory _proof
  ) public {
    require(msg.sender == provable_cbAddress());
    require(flipsInProgress[_queryId].sender != address(0), "Flip query not found");

    if (provable_randomDS_proofVerify__returnCode(_queryId, _result, _proof) != 0) {
      revert('Invalid proof while generating random number with Provable');
    } else {
      uint ceiling = (MAX_INT_FROM_BYTE ** NUM_RANDOM_BYTES_REQUESTED) - 1;
      uint randomNumber = uint256(keccak256(abi.encodePacked(_result))) % ceiling;
      uint flipResult = (randomNumber % 2);

      Flip memory flip = flipsInProgress[_queryId];

      emit LogResult(flip.sender, Outcomes(flipResult), _queryId);
      delete flipsInProgress[_queryId];
    }
  }

  /// @notice Takes a player's guess and records it against a generated result
  /// @param _prediction a player's prediction
  function flip(uint _prediction) external payable {
    uint QUERY_EXECUTION_DELAY = 0;
    uint GAS_FOR_CALLBACK = 200000;

    bytes32 queryId = provable_newRandomDSQuery(
        QUERY_EXECUTION_DELAY,
        NUM_RANDOM_BYTES_REQUESTED,
        GAS_FOR_CALLBACK
    );

    emit LogPrediction(msg.sender, Outcomes(_prediction), queryId);
    flipsInProgress[queryId] = Flip(Outcomes(_prediction), msg.sender);
  }
}
