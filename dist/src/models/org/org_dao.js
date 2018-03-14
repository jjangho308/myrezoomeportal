'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}(); //import AbstractDAO from 'abstract_dao.js';
var _org_query = require('./org_query.js');var _org_query2 = _interopRequireDefault(_org_query);
var _util = require('util');var _util2 = _interopRequireDefault(_util);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

/**
                                                                                                                                                                                                                                                                                                                           * DAO for org. <br />
                                                                                                                                                                                                                                                                                                                           * 
                                                                                                                                                                                                                                                                                                                           * @since 180306
                                                                                                                                                                                                                                                                                                                           * @author KWANGWOOK
                                                                                                                                                                                                                                                                                                                           */var
OrgDao = function () {
    function OrgDao(connectionPool) {_classCallCheck(this, OrgDao);
        this.connectionPool = connectionPool;
    }_createClass(OrgDao, [{ key: 'put', value: function put(

        org, cb) {

        }

        /**
           * Get multiple OrgModel by orgcodes. <br />
           * 
           * @since 180313
           * 
           * @param {string} orgcode Specific orgcode.
           * @param {function(err:Error, result:OrgModel[])} cb Callback.
           */ }, { key: 'get', value: function get(
        orgcodes, cb) {

            var makequery = _util2.default.format(_org_query2.default.getByCodes, orgcodes);

            this.connectionPool.getConnection(function (err, connection) {
                if (err) {
                    cb(err);
                } else {
                    connection.query(makequery, function (err, rows) {
                        if (err) {
                            cb(err);
                        } else {
                            var result = [];
                            for (var i in rows) {
                                result.push(new OrgModel(rows[i]));
                            }
                            connection.release();
                            cb(null, rows);
                        }
                    });
                }
            });
        } }, { key: 'findAll', value: function findAll(

        query, cb) {

            var makequery = _util2.default.format(_org_query2.default.findAll);

            this.connection.query(makequery, function (err, rows) {
                if (err) {
                    throw err;
                } else {
                    var response = {};
                    response.code = '200';
                    response.err = '';
                    //res.send(response);
                    cb(rows);
                }
            });
        } }, { key: 'set', value: function set(

        opt, user, cb) {

        } }, { key: 'del', value: function del(

        opt, cb) {

        } }, { key: 'delall', value: function delall(

        opt, cb) {

        } }]);return OrgDao;}();exports.default =


OrgDao;
//# sourceMappingURL=org_dao.js.map