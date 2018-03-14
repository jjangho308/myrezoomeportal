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
    var propertyInstance = null;
    var cryptoInstance = null;
    var dbInstance = null;
    var pushInstance = null;
    var bcInstance = null;
    var tokenInstance = null;
    var pdfInstance = null;
    var clientRequestInstance = null;
    var agentRequestInstance = null;

    return {
        property: () => {
            return propertyInstance = propertyInstance ? propertyInstance : new PropertyManager();
        },

        push: () => {
            return pushInstance = pushInstance ? pushInstance : new PushManager();
        },

        // blockchain : ()=>{
        //     return bcInstance = bcInstance ? bcInstance : new BlockchainManager();
        // },

        crypto: () => {
            return cryptoInstance = cryptoInstance ? cryptoInstance : new CryptoManager();
        },

        db: () => {
            return dbInstance = dbInstance ? dbInstance : new DatabaseManager();
        },

        token: () => {
            return tokenInstance = tokenInstance ? tokenInstance : new TokenManager();
        },

        pdf: () => {
            return pdfInstance = pdfInstance ? pdfInstance : new PDFManager();
        },

        client: () => {
            return clientRequestInstance = clientRequestInstance ? clientRequestInstance : new ClientRequestManager();
        },

        agent : ()=>{
            return agentRequestInstance = agentRequestInstance ? agentRequestInstance : new AgentRequestManager();
        }
    }
})();