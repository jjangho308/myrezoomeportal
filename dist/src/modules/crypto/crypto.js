'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _crypto = require('crypto');var _crypto2 = _interopRequireDefault(_crypto);

var _abstract_manager = require('../abstract_manager');var _abstract_manager2 = _interopRequireDefault(_abstract_manager);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * CryptoManager. <br />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @since 183013
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @author TACKSU
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */var
CryptoManager = function (_AbstractManager) {_inherits(CryptoManager, _AbstractManager);

    function CryptoManager(opt) {_classCallCheck(this, CryptoManager);return _possibleConstructorReturn(this, (CryptoManager.__proto__ || Object.getPrototypeOf(CryptoManager)).call(this,
        opt));
    }_createClass(CryptoManager, [{ key: 'init', value: function init()

        {

        }

        /**
           * 
           * @param {object} spec {
           *      symAlg      : Algorithm of symetric crypto.
           *      symLength   : Length of AES Key,
           *      asmAlg      : ALgorithm of assymetric crypto.
           *      asmLength   : Length of RSA Key pair.
           *      encode      : Encoding scheme.
           * }
           */ }, { key: 'setDefaultSpec', value: function setDefaultSpec(
        spec) {
            this.spec = spec;
        }

        /**
           * Generate random number with given length. <br />
           * 
           * @since 180305
           * @author TACKSU
           * 
           * @param {number} length Length of data to be generated..
           * @param {function} cb Callback.
           */ }, { key: 'generatePRN', value: function generatePRN(
        length, cb) {
            _crypto2.default.randomBytes(length, cb);
        } }, { key: 'generateAESKey', value: function generateAESKey(

        cb) {var _this2 = this;
            _crypto2.default.randomBytes(this.spec.symLength, function (err, key) {
                if (err) {
                    cb(err);
                }
                cb(null, key.toString(_this2.spec.encode));
            });
        } }, { key: 'generateRSAKeyPair', value: function generateRSAKeyPair(

        cb) {
            var dh = _crypto2.default.createDiffieHellman(this.spec.asmLength);
            dh.generateKeys(this.spec.encode);
            cb(null, {
                pub: dh.getPublicKey(this.spec.encode),
                pri: dh.getPrivateKey(this.spec.encode) });

        }

        /**
           * Encrypt data with symmetric key and iv. <br />
           * 
           * @param {string} plain Plain text.
           * @param {string} key Symmetric key.
           * @param {function} cb Callback function
           */ }, { key: 'encryptAES', value: function encryptAES(
        plain, key, cb) {var _this3 = this;
            this.generatePRN(this.spec.ivLength, function (err, iv) {
                var cipher = _crypto2.default.createCipheriv(_this3.spec.symAlg, Buffer.from(key, _this3.spec.encode), iv);
                cipher.setAutoPadding(true);
                var encrypted = cipher.update(plain, 'utf8', _this3.spec.encode);
                encrypted += cipher.final(_this3.spec.encode);
                cb(null, iv.toString(_this3.spec.encode), encrypted);
            }.bind(this));
        }

        /**
           * Decrypt string with symmetric key and iv.
           * 
           * @param {*} encrypted 
           * @param {*} key 
           * @param {*} iv 
           * @param {*} cb 
           */ }, { key: 'decryptAES', value: function decryptAES(
        encrypted, key, iv, cb) {
            var decipher = _crypto2.default.createDecipheriv(this.spec.symAlg, Buffer.from(key, this.spec.encode), Buffer.from(iv, this.spec.encode));
            var decrypted = decipher.update(encrypted, this.spec.encode, 'utf8');
            decrypted += decipher.final('utf8');
            cb(null, decrypted);
        } }, { key: 'encryptRSA', value: function encryptRSA(

        plain, key, cb) {

        } }, { key: 'decryptRSA', value: function decryptRSA(

        encrypted, key, cb) {

        } }]);return CryptoManager;}(_abstract_manager2.default);exports.default =


CryptoManager;
//# sourceMappingURL=crypto.js.map