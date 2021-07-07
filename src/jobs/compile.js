const fs = require("fs");
const path = require("path");
const solc = require("solc");

const contractPath = path.resolve(__dirname, "..", "contracts", "Inbox.sol");
const source = fs.readFileSync(contractPath, "utf-8");

module.exports = () => solc.compile(source, 1);
