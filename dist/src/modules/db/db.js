'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _mysql = require('mysql');var _mysql2 = _interopRequireDefault(_mysql);
var _user_dao = require('../../models/user/user_dao');var _user_dao2 = _interopRequireDefault(_user_dao);
var _org_dao = require('../../models/org/org_dao');var _org_dao2 = _interopRequireDefault(_org_dao);
var _managers = require('../../core/managers');var _managers2 = _interopRequireDefault(_managers);
var _property = require('../property/property');var _property2 = _interopRequireDefault(_property);
var _abstract_manager = require('../abstract_manager');var _abstract_manager2 = _interopRequireDefault(_abstract_manager);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}


/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * Data accessor. <br />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @since 180228
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */var
DataManager = function (_AbstractManager) {_inherits(DataManager, _AbstractManager);

    function DataManager(opt) {_classCallCheck(this, DataManager);return _possibleConstructorReturn(this, (DataManager.__proto__ || Object.getPrototypeOf(DataManager)).call(this,
        opt));
    }

    /*
      example
      var dbConfig = {
          host :db_config.host,
          port : db_config.port,
          user : db_config.user,
          password : db_config.password,
          database:db_config.database
      }
      */_createClass(DataManager, [{ key: 'init', value: function init()
        {
            var propertyManager = _managers2.default.property();

            this.connectionPool = _mysql2.default.createPool({
                host: propertyManager.get(_property2.default.MySQL_HOST),
                port: propertyManager.get(_property2.default.MySQL_PORT),
                user: propertyManager.get(_property2.default.MySQL_ID),
                password: propertyManager.get(_property2.default.MySQL_PW),
                database: propertyManager.get(_property2.default.MySQL_DATABASE) });


            this.connectionPool.getConnection(function (err, connection) {
                if (err) {
                    throw err;
                } else {
                    /*
                        connection.query("select * from TBL_USER", function(err, rows){
                        if(err) {
                            throw err;
                        } else {              
                            var response = {};
                            response.code = '200';
                            response.err = '';
                            res.send(response);
                        }
                        });
                        */
                    connection.release();
                }
            });
        } }, { key: 'getUserInfo', value: function getUserInfo(

        userid, cb) {
            this.connectionPool.getConnection(function (err, connection) {
                if (err) {
                    throw err;
                } else {
                    var userDao = new _user_dao2.default(connection);
                    userDao.get(userid, function (res) {
                        cb(res);
                    });
                }
                connection.release();
            });

        } }, { key: 'getOrgInfo', value: function getOrgInfo(

        orgcodes, cb) {
            this.connectionPool.getConnection(function (err, connection) {
                if (err) {
                    throw err;
                } else {
                    var orgDao1 = new _org_dao2.default(connection);
                    orgDao1.get(orgcodes, function (res) {
                        cb(res);
                    });
                }
                connection.release();
            });
        } }, { key: 'getOrgAllInfo', value: function getOrgAllInfo(

        cb) {
            this.connectionPool.getConnection(function (err, connection) {
                if (err) {
                    throw err;
                } else {
                    var orgDao1 = new _org_dao2.default(connection);
                    orgDao1.getall(function (res) {
                        cb(res);
                    });
                }
                connection.release();
            });
        } }, { key: 'getUserDao', value: function getUserDao()

        {
            return new _user_dao2.default(this.connectionPool);
        } }, { key: 'getOrgDao', value: function getOrgDao()

        {
            return new OrgDao(this.connectionPool);
        } }]);return DataManager;}(_abstract_manager2.default);exports.default =


DataManager;
//# sourceMappingURL=db.js.map