'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _property = require('../modules/property/property');var _property2 = _interopRequireDefault(_property);
var _push = require('../modules/push/push');var _push2 = _interopRequireDefault(_push);
var _blockchain = require('../modules/blockchain/blockchain');var _blockchain2 = _interopRequireDefault(_blockchain);
var _crypto = require('../modules/crypto/crypto');var _crypto2 = _interopRequireDefault(_crypto);
var _db = require('../modules/db/db');var _db2 = _interopRequireDefault(_db);
var _token = require('../modules/token/token');var _token2 = _interopRequireDefault(_token);
var _pdf = require('../modules/pdf/pdf');var _pdf2 = _interopRequireDefault(_pdf);
var _client_request = require('../modules/client/client_request');var _client_request2 = _interopRequireDefault(_client_request);
var _agent_request = require('../modules/agent/agent_request');var _agent_request2 = _interopRequireDefault(_agent_request);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                           * Wrapper function to provide singleton instance of each modules. <br />
                                                                                                                                                                                                                           * 
                                                                                                                                                                                                                           * @TODO add managers.
                                                                                                                                                                                                                           * @since 180304
                                                                                                                                                                                                                           */exports.default =
function () {
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
        property: function property() {
            return propertyInstance = propertyInstance ? propertyInstance : new _property2.default();
        },

        push: function push() {
            return pushInstance = pushInstance ? pushInstance : new _push2.default();
        },

        // blockchain : ()=>{
        //     return bcInstance = bcInstance ? bcInstance : new BlockchainManager();
        // },

        crypto: function crypto() {
            return cryptoInstance = cryptoInstance ? cryptoInstance : new _crypto2.default();
        },

        db: function db() {
            return dbInstance = dbInstance ? dbInstance : new _db2.default();
        },

        token: function token() {
            return tokenInstance = tokenInstance ? tokenInstance : new _token2.default();
        },

        pdf: function pdf() {
            return pdfInstance = pdfInstance ? pdfInstance : new _pdf2.default();
        },

        client: function client() {
            return clientRequestInstance = clientRequestInstance ? clientRequestInstance : new _client_request2.default();
        },

        agent: function agent() {
            return agentRequestInstance = agentRequestInstance ? agentRequestInstance : new _agent_request2.default();
        } };

}();
//# sourceMappingURL=managers.js.map