'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _jsonwebtoken = require('jsonwebtoken');var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _abstract_manager = require('../abstract_manager');var _abstract_manager2 = _interopRequireDefault(_abstract_manager);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}


/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * TokenManager. <br />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @since 180305
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */var
TokenManager = function (_AbstractManager) {_inherits(TokenManager, _AbstractManager);
    function TokenManager(opt) {_classCallCheck(this, TokenManager);return _possibleConstructorReturn(this, (TokenManager.__proto__ || Object.getPrototypeOf(TokenManager)).call(this,
        opt));
    }_createClass(TokenManager, [{ key: 'generateToken', value: function generateToken(

        info) {
            return _jsonwebtoken2.default.sign({
                data: info,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 1 // 1hour
                //}, 'rezoomesecretkey', { expiresIn: '1' });
            }, 'rezoomesecretkey');
        } }, { key: 'filterToken', value: function filterToken(

        req, res, next) {
            var bearerToken;
            var bearerHeader = req.headers["authorization"];
            if (typeof bearerHeader !== 'undefined') {
                var bearer = bearerHeader.split(" ");
                bearerToken = bearer[1];

                _jsonwebtoken2.default.verify(bearerToken, 'rezoomesecretkey', function (error, decoded) {
                    if (error) {
                        console.log(error);
                        res.send(403);
                    } else {
                        console.log(decoded);
                        req.token = bearerToken;
                        req.body.args.userid = decoded.data.userid;
                        next();
                    }
                });
            } else {
                var ignoredCmd = ['Health', 'Login']; // ignore cmd
                var ignoredFlag = false;

                ignoredCmd.forEach(function (ingored) {
                    if (ingored == req.body.cmd) {
                        ignoredFlag = true;
                    }
                });

                if (ignoredFlag) {
                    next();
                } else {
                    res.send(403);
                }
            }
        } }, { key: 'decodedToken', value: function decodedToken(

        token) {
            return _jsonwebtoken2.default.decode(token, { complete: true });
        } }]);return TokenManager;}(_abstract_manager2.default);exports.default =


TokenManager;
//# sourceMappingURL=token.js.map