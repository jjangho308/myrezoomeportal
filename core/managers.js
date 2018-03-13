import PropertyManager from '../modules/property/property';
import PushManager from '../modules/push/push';
import BlockchainManager from '../modules/blockchain/blockchain';
import CryptoManager from '../modules/crypto/crypto';
import DatabaseManager from '../modules/db/db';
import TokenManager from '../modules/token/token';
import PDFManager from '../modules/pdf/pdf';
import ClientRequestManager from '../modules/client/client_request';
import AgentRequestManager from '../modules/agent/agent_request';

/**
 * Wrapper function to provide singleton instance of each modules. <br />
 * 
 * @TODO add managers.
 * @since 180304
 */
export default (() => {
    const propertyInstance = new PropertyManager();
    const cryptoInstance = new CryptoManager();
    const dbInstance = new DatabaseManager();
    const pushInstance = new PushManager();
    const bcInstance = new BlockchainManager();
    const tokenInstance = new TokenManager();
    const pdfInstance = new PDFManager();
    const clientRequestInstance = new ClientRequestManager();
    const agentRequestInstance = new AgentRequestManager();

    return {
        property: () => propertyInstance,

        push: () => pushInstance,

        blockchain: () => bcInstance,

        crypto: () => cryptoInstance,

        db: () => dbInstance,

        token: () => tokenInstance,

        pdf: () => pdfInstance,

        clientRequest: () => clientRequestInstance,

        agentRequest: () => agentRequestInstance
    }
})();