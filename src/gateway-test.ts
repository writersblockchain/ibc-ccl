import { executeGatewayEncrypted, getGatewayEncryptionKey, queryGatewayAuth } from '../src/gateway';
import { consumerWallet} from '../src/clients';
import { getArb36Credential } from '../src/crypto';

let test = async () => {

    const gatewayKey = await getGatewayEncryptionKey();
    console.log("Gateway key:", gatewayKey)

    const consumerQueryCredential = await getArb36Credential(consumerWallet, "data")
    // const secretQueryCredential = await getArb36Credential(secretWallet, "data")

    const new_text = "new_text_" + Math.random().toString(36).substring(7);

    await executeGatewayEncrypted(
        { extension: { msg: { store_secret: { text: new_text } } } },
        consumerWallet,
        gatewayKey
    )

    const updated_text = await queryGatewayAuth(
        { get_secret: {} },
        [consumerQueryCredential]
    )

    console.log("Updated text:", updated_text)



}

test();