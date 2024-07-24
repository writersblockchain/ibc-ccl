import { readFileSync} from "fs";
import {  ContractConfig} from "./types.js";

export const CONFIG_DIR = 'configs';
export const CONTRACTS_FILE = 'contracts.json';
export const CONTRACT_CONFIG_PATH = `${CONFIG_DIR}/${CONTRACTS_FILE}`;

export const loadContractConfig = () : ContractConfig => {
    return JSON.parse(readFileSync(CONTRACT_CONFIG_PATH, 'utf8')) as ContractConfig;
}
