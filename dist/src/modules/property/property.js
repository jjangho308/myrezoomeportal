'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _get = function get(object, property, receiver) {if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {var parent = Object.getPrototypeOf(object);if (parent === null) {return undefined;} else {return get(parent, property, receiver);}} else if ("value" in desc) {return desc.value;} else {var getter = desc.get;if (getter === undefined) {return undefined;}return getter.call(receiver);}};var _propertiesReader = require('properties-reader');var _propertiesReader2 = _interopRequireDefault(_propertiesReader);

var _environment = require('../../core/environment');var _environment2 = _interopRequireDefault(_environment);
var _abstract_manager = require('../abstract_manager');var _abstract_manager2 = _interopRequireDefault(_abstract_manager);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * Read configuration properties from config.properties file. <br />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @author TACKSU
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @since 180226
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */var
PropertyManager = function (_AbstractManager) {_inherits(PropertyManager, _AbstractManager);

    function PropertyManager(opt) {_classCallCheck(this, PropertyManager);return _possibleConstructorReturn(this, (PropertyManager.__proto__ || Object.getPrototypeOf(PropertyManager)).call(this,
        opt));
    }_createClass(PropertyManager, [{ key: 'init', value: function init()

        {
            _get(PropertyManager.prototype.__proto__ || Object.getPrototypeOf(PropertyManager.prototype), 'init', this).call(this);
            this.filePath = _environment2.default.developement() ? './debug.properties' : './config.properties';
            this.properties = (0, _propertiesReader2.default)('./debug.properties');
        }

        /**
           * Watch proper file. <br />
           * 
           * @since 180305
           * @author TACKSU
           * 
           * @param {*} cb 
           */ }, { key: 'watchFile', value: function watchFile(
        cb) {

        } // TODO Implement here.

        /**
         * Get configuration value by given key. <br />
         * 
         * @param {string} key 
         * @param {*} defValue 
         */ }, { key: 'get', value: function get(
        key, defValue) {
            if (!this.properties) {
                throw new ReferenceError("Failed to load property file.");
            }

            var value = this.properties.get(key);
            return value ? value : defValue;
        } }, { key: 'set', value: function set(

        key, value) {
            if (!this.properties)
            throw new ReferenceError("Failed to load property file.");

            this.properties.set(key, value);
        } }]);return PropertyManager;}(_abstract_manager2.default);


/****************************************/
/* Amazon MQ                            */
/****************************************/
PropertyManager.PUSH_HOST = 'push.host';
PropertyManager.PUSH_PORT = 'push.port';
PropertyManager.PUSH_SSL = 'push.ssl';
PropertyManager.PUSH_HEADER_HOST = 'push.header.host';
PropertyManager.PUSH_HEADER_LOGIN = 'push.header.login';
PropertyManager.PUSH_HEADER_PASSCODE = 'push.header.passcode';
PropertyManager.PUSH_ = 'push.header.passcode';


/****************************************/
/* NOSQL                                */
/****************************************/
PropertyManager.NOSQL_HOST = 'nosql.host';
PropertyManager.NOSQL_KEYSPACE_NAME = 'nosql.keyspacename';
//PropertyManager.NOSQL_PORT = 'nosql.port'
//PropertyManager.NOSQL_PROTOCOL = 'nosql.protocol';
//PropertyManager.NOSQL_ID = 'nosql.id';
//PropertyManager.NOSQL_PW = 'nosql.pw';
//PropertyManager.NOSQL_TIMEOUT = 'nosql.timeout';


/****************************************/
/* MySQL                                */
/****************************************/
PropertyManager.MySQL_HOST = 'mysql.host';
PropertyManager.MySQL_PORT = 'mysql.port';
PropertyManager.MySQL_ID = 'mysql.id';
PropertyManager.MySQL_PW = 'mysql.pw';
PropertyManager.MySQL_TIMEOUT = 'mysql.timeout';
PropertyManager.MySQL_DATABASE = 'mysql.database';exports.default =


PropertyManager;
//# sourceMappingURL=property.js.map