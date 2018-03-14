'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _managers = require('../../core/managers');var _managers2 = _interopRequireDefault(_managers);
var _abstract_clientrequest_handler = require('./abstract_clientrequest_handler');var _abstract_clientrequest_handler2 = _interopRequireDefault(_abstract_clientrequest_handler);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 사용자 로그인 요청 핸들러.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */var
UserJoinRequestHandler = function (_AbstractClientReques) {_inherits(UserJoinRequestHandler, _AbstractClientReques);
    function UserJoinRequestHandler(opt) {_classCallCheck(this, UserJoinRequestHandler);return _possibleConstructorReturn(this, (UserJoinRequestHandler.__proto__ || Object.getPrototypeOf(UserJoinRequestHandler)).call(this,
        opt));
    }

    /**
       * 
       * @param {UserJoinRequest} clientReq 
       * @param {UserJoinResponse} clientRes
       */_createClass(UserJoinRequestHandler, [{ key: 'process', value: function process(
        clientReq, clientRes) {

            // 1. 사용자 정보를 DB에 입력
            _managers2.default.database().setUserInfo(clientReq, function (error, response) {
                if (error) {
                    console.log(error);
                } else {
                    // 사용자 정보 업데이트 == 가입 완료

                }
            });
        } }]);return UserJoinRequestHandler;}(_abstract_clientrequest_handler2.default);exports.default =


UserJoinRequestHandler;
//# sourceMappingURL=user_join_handler.js.map