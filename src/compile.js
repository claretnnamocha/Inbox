import fs from "fs";
import path from "path";
import solc from "solc";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contractPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(contractPath, "utf-8");

export const { contracts } = solc.compile(source, 1);
