const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { compile } = require("../jobs");
const { contracts } = compile();

const web3 = new Web3(ganache.provider());
let accounts;

describe("Inbox", () => {
  let inbox;
  const INITIAL_MESSAGE = "Hi there!";

  it("can get accounts", async () => {
    accounts = await web3.eth.getAccounts();
    assert.strictEqual(accounts instanceof Array && accounts.length > 0, true);
  });

  it("can deploy contract", async () => {
    const contract = contracts[":Inbox"];
    const { bytecode, interface: intf } = contract;

    inbox = await new web3.eth.Contract(JSON.parse(intf))
      .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
      .send({ from: accounts[0], gas: "1000000" });

    assert.ok(inbox.options.address);
  });

  it("can get initial message", async () => {
    const message = await inbox.methods.getMessage().call();
    assert.strictEqual(message, INITIAL_MESSAGE);
  });

  it("can set message", async () => {
    const new_message = "Hello world!";

    await inbox.methods.setMessage(new_message).send({ from: accounts[0] });

    const message = await inbox.methods.getMessage().call();
    assert.strictEqual(message, new_message);
  });
});
