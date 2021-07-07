import assert from "assert";
import ganache from "ganache-cli";
import Web3 from "web3";
import { contracts } from "../compile.js";

const web3 = new Web3(ganache.provider());
let accounts, inbox;

describe("Inbox", () => {
  it("can get accounts", async () => {
    accounts = await web3.eth.getAccounts();
    assert.strictEqual(accounts instanceof Array && accounts.length > 0, true);
  });

  it("can deploy contract", async () => {
    const contract = contracts[":Inbox"];
    const { bytecode, interface: intf } = contract;

    inbox = await new web3.eth.Contract(JSON.parse(intf))
      .deploy({
        data: bytecode,
        arguments: ["Hi there!"],
      })
      .send({ from: accounts[0], gas: "1000000" });
  });
});
