import { MsgExecuteContractParams } from "secretjs";
import { CosmosCredential, InnerQueries, GatewayExecuteMsg as GatewayExecuteMsg,  GatewayQueryMsg } from "./types.js";
import {  loadContractConfig } from "./config.js";
import { consumerWallet, secretClient } from "./clients.js";
import { getEncryptedSignedMsg } from "./crypto.js";
import { OfflineAminoSigner } from "@cosmjs/amino";
import { AminoWallet } from "secretjs/dist/wallet_amino.js";

export const getGatewayEncryptionKey = async () => {
    const res = await queryGateway({ encryption_key: {} });
    return res as string;
}

export const queryGateway = async (query: GatewayQueryMsg) => {
    const config = loadContractConfig();
    const res = await secretClient.query.compute.queryContract({
        contract_address: config.gateway!.address,
        code_hash: config.gateway!.hash,
        query
    });
    return res;
}

export const queryGatewayAuth = (query: InnerQueries, credentials: CosmosCredential[]) => {
    return queryGateway({
        with_auth_data: {
            query,
            auth_data: {
                credentials,
            }
        }
    })
}

export const executeGateway = async (execute_msg: GatewayExecuteMsg) => {
    const config = loadContractConfig();

    const msg : MsgExecuteContractParams<GatewayExecuteMsg> = {
        msg: execute_msg,
        sender: secretClient.address,
        contract_address: config.gateway!.address,
        code_hash: config.gateway!.hash,
        sent_funds: [],
    }
    const tx = await secretClient.tx.compute.executeContract(msg, { gasLimit: 900_000 });
    return tx;
}


export const executeGatewayEncrypted = async (
    execute_msg: GatewayExecuteMsg, 
    wallet?: OfflineAminoSigner | AminoWallet,
    gatewayKey?: string,
) => {

    return await executeGateway(
        await getEncryptedSignedMsg(
            wallet ?? consumerWallet,
            execute_msg,
            gatewayKey
        )
    )
}


