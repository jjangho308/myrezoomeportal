'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
//import AbstractDAO from 'abstract_dao';
var _cassandraDriver = require('cassandra-driver');var _cassandraDriver2 = _interopRequireDefault(_cassandraDriver);var _anchor_query = require('./anchor_query');var _anchor_query2 = _interopRequireDefault(_anchor_query);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * DAO for anchor model. <br />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @since 180302
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @author 광욱
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */var
AnchorDAO = function () {

    //client = new csdr.Client({ contactPoints: ['127.0.0.1'], keyspace: 'rzm_anchor' });
    //var client;

    function AnchorDAO(host, keyspacename) {_classCallCheck(this, AnchorDAO);
        //this.client = client;
        //super();
        this.client = new _cassandraDriver2.default.Client({ contactPoints: [host], keyspace: keyspacename });
    }

    /*
      constructor(client){
          this.client = client;
      }
      */_createClass(AnchorDAO, [{ key: 'putanchordata', value: function putanchordata(


        usrId, trxId, delFg, formId, orgCd, subCd, callback) {
            //const client = new csdr.Client({ contactPoints: ['127.0.0.1'], keyspace: 'rzm_anchor' });
            var query = _anchor_query2.default.put;

            var params = [usrId, trxId, delFg, formId, orgCd, subCd];

            this.client.execute(query, params).
            then(function (result) {

                console.log("===================execute get==================");
                console.log(result);
                console.log("==================================================");

                //var response = result.rows;
                callback(result);
                //console.log('User with trx_id %s', result.rows[0].trx_id);
            });

        } }, { key: 'getbyUserIdAndFormId', value: function getbyUserIdAndFormId(

        userId, formId, callback) {

            var query = _anchor_query2.default.getbyuseridformid;

            var params = [userId, formId];

            this.client.execute(query, params).
            then(function (result) {

                console.log("===================execute get==================");
                console.log(result);
                console.log("==================================================");

                var response = result.rows;
                callback(response);
                //console.log('User with trx_id %s', result.rows[0].trx_id);
            });

            //this.get(map, callback);
        } }, { key: 'getbyTxId', value: function getbyTxId(

        txId, callback) {
            //const client = new csdr.Client({ contactPoints: ['127.0.0.1'], keyspace: 'rzm_anchor' });
            var query = _anchor_query2.default.getByTxid;

            var params = [txId];

            this.client.execute(query, params).
            then(function (result) {

                console.log("===================execute get==================");
                console.log(result);
                console.log("==================================================");

                var response = result.rows;
                callback(response);
                //console.log('User with trx_id %s', result.rows[0].trx_id);
            });
        } }]);return AnchorDAO;}();exports.default =


AnchorDAO;
//# sourceMappingURL=anchor_dao.js.map