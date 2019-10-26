const Web3 = require("web3");
const chainFlipper = artifacts.require("./ChainFlipper.sol");
const INFURA_KEY = process.env.INFURA_KEY;
const RINKEBY_WSS = `wss://rinkeby.infura.io/ws/v3/${INFURA_KEY}`;

const web3Socket = new Web3(new Web3.providers.WebsocketProvider(RINKEBY_WSS));

const waitForEvent = (_event, _from = 0, _to = "latest") =>
  new Promise((resolve, reject) =>
    _event({ fromBlock: _from, toBlock: _to }, (e, ev) =>
      e ? reject(e) : resolve(ev)
    )
  );

contract("ChainFlipper Tests", async accounts => {
  const gasAmt = 3e6;
  const address = accounts[0];

  before(
    async () => (
      ({ contract } = await chainFlipper.deployed()),
      ({ methods } = contract),
      ({ events } = new web3Socket.eth.Contract(
        contract._jsonInterface,
        contract._address
      ))
    )
  );
  it("Should accept a flip prediction", async () => {
    try {
      await methods.flip(0).send({ from: address, gas: gasAmt });
    } catch (e) {
      assert.fail(`Failed with error: ${e.message}`);
    }
  }).timeout(600000);

  it("Should have logged a prediction event", async () => {
    const {
      returnValues: { _prediction }
    } = await waitForEvent(events.LogPrediction);
    assert.equal(_prediction, 0, "A flip prediction is correctly logged!");
  }).timeout(600000);

  it("Should have logged a result event", async () => {
    const {
      returnValues: { _result }
    } = await waitForEvent(events.LogResult);
    const result = parseInt(_result);
    assert.isAtLeast(
      result,
      0,
      "A random number >= 0 should have been retrieved from Provable call!"
    );
    assert.isAtMost(
      result,
      1,
      "A random number <= 2 should have been retrieved from Provable's randomDS call"
    );
  }).timeout(600000);
});
