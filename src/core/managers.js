var PropertyManager = require('../modules/property/property');
var PushManager = require('../modules/push/push');
var DatabaseManager = require('../modules/db/db');
var TokenManager = require('../modules/token/token');
var PDFManager = require('../modules/pdf/pdf');
var ClientRequestManager = require('../modules/client/client_request');
var AgentRequestManager = require('../modules/agent/agent_request');
var CryptoManager = require('../modules/crypto/crypto');
var NexLedgerManger = require('../modules/blockchain/nexledgerservice');
var ApiRequestManager = require('../modules/api/api_request');

/**
 * Wrapper function to provide singleton instance of each modules. <br />
 * 
 * @TODO add managers.
 * @since 180304
 */
var propertyInstance = null;
var cryptoInstance = null;
var dbInstance = null;
var pushInstance = null;
var tokenInstance = null;
var pdfInstance = null;
var clientRequestInstance = null;
var agentRequestInstance = null;
var nexLedgerInstance = null;
var apiRequestInstance = null;

exports.property = () => {
    return propertyInstance = propertyInstance ? propertyInstance : new PropertyManager();
};

exports.push =
    () => {
        return pushInstance = pushInstance ? pushInstance : new PushManager();
    };

exports.crypto =
    () => {
        return cryptoInstance = cryptoInstance ? cryptoInstance : new CryptoManager();
    };

exports.db =
    () => {
        return dbInstance = dbInstance ? dbInstance : new DatabaseManager();
    };

exports.token =
    () => {
        return tokenInstance = tokenInstance ? tokenInstance : new TokenManager();
    };

exports.pdf =
    () => {
        return pdfInstance = pdfInstance ? pdfInstance : new PDFManager();
    };

exports.client = () => {
    return clientRequestInstance = clientRequestInstance ? clientRequestInstance : new ClientRequestManager();
};

exports.agent = () => {
    return agentRequestInstance = agentRequestInstance ? agentRequestInstance : new AgentRequestManager();
};

exports.nex = () => {
    return nexLedgerInstance = nexLedgerInstance ? nexLedgerInstance : new NexLedgerManger();
};

exports.api = () => {
    return apiRequestInstance = apiRequestInstance ? apiRequestInstance : new ApiRequestManager();
};