'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}(); //import AbstractDAO from 'abstract_dao.js'
var _user_query = require('./user_query.js');var _user_query2 = _interopRequireDefault(_user_query);
var _user = require('./user');var _user2 = _interopRequireDefault(_user);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

/**
                                                                                                                                                                                                                                                                                                                             * DAO for user. <br />
                                                                                                                                                                                                                                                                                                                             * 
                                                                                                                                                                                                                                                                                                                             * @since 180302
                                                                                                                                                                                                                                                                                                                             * @author TACKSU
                                                                                                                                                                                                                                                                                                                             */var

UserDao = function () {

    function UserDao(connectionPool) {_classCallCheck(this, UserDao);
        this.connectionPool = connectionPool;
    }_createClass(UserDao, [{ key: 'put', value: function put(

        user, cb) {

        } }, { key: 'get', value: function get(

        userid, cb) {

            var param = [userid];

            this.connectionPool.getConnection(function (err, connection) {
                if (err) {
                    throw err;
                } else {
                    connection.query(_user_query2.default.get, param, function (err, rows) {
                        if (err) {
                            throw err;
                        } else {
                            var result = null;
                            for (var i in rows) {
                                result = new _user2.default(rows[i]);
                            }
                            connection.release();
                            cb(result);
                        }
                    });
                }
            });
        } }, { key: 'set', value: function set(

        opt, user, cb) {

        } }, { key: 'del', value: function del(

        opt, cb) {

        } }, { key: 'delall', value: function delall(

        opt, cb) {

        } }]);return UserDao;}();exports.default =


UserDao;
//# sourceMappingURL=user_dao.js.map