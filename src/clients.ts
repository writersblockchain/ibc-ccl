import { SecretNetworkClient, Wallet } from "secretjs"
import dotenv from "dotenv";
dotenv.config();
const { 
    CONSUMER_CHAIN_ENDPOINT, 
    CONSUMER_CHAIN_ID, 
    CONSUMER_MNEMONIC, 
    CONSUMER_PREFIX, 
    CONSUMER_TOKEN, 

    SECRET_CHAIN_ENDPOINT, 
    SECRET_CHAIN_ID, 
    SECRET_MNEMONIC 
} = process.env;


export const secretWallet = new Wallet(SECRET_MNEMONIC);


export const secretClient = new SecretNetworkClient({
    chainId: SECRET_CHAIN_ID!,
    url: SECRET_CHAIN_ENDPOINT!,
    wallet: secretWallet,
    walletAddress: secretWallet.address,
});

// console.log("Secret Wallet Address: ", secretWallet.address);

export const consumerWallet = new Wallet(CONSUMER_MNEMONIC, {
    bech32Prefix: CONSUMER_PREFIX,
    coinType: CONSUMER_TOKEN == "uscrt" ? 529 : 118,
});


export const consumerClient = new SecretNetworkClient({
    chainId: CONSUMER_CHAIN_ID!,
    url: CONSUMER_CHAIN_ENDPOINT!,
    wallet: consumerWallet,
    walletAddress: consumerWallet.address,
});