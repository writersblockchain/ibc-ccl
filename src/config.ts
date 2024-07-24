import { readFileSync} from "fs";
import {  ContractConfig, IbcConfig} from "./types.js";

export const CONFIG_DIR = 'configs';
export const CONTRACTS_FILE = 'contracts.json';
export const CONTRACT_CONFIG_PATH = `${CONFIG_DIR}/${CONTRACTS_FILE}`;

export const IBC_FILE = 'ibc.json';
export const IBC_CONFIG_PATH = `${CONFIG_DIR}/${IBC_FILE}`;

export const loadContractConfig = () : ContractConfig => {
    return JSON.parse(readFileSync(CONTRACT_CONFIG_PATH, 'utf8')) as ContractConfig;
}

export const loadIbcConfig = () : IbcConfig => {
    return JSON.parse(readFileSync(IBC_CONFIG_PATH, 'utf8')) as IbcConfig;
}