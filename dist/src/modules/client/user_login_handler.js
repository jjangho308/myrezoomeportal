'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _managers = require('../../core/managers');var _managers2 = _interopRequireDefault(_managers);
var _abstract_clientrequest_handler = require('./abstract_clientrequest_handler');var _abstract_clientrequest_handler2 = _interopRequireDefault(_abstract_clientrequest_handler);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 사용자 로그인 요청 핸들러.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */var
UserLoginRequestHandler = function (_AbstractClientReques) {_inherits(UserLoginRequestHandler, _AbstractClientReques);
    function UserLoginRequestHandler(opt) {_classCallCheck(this, UserLoginRequestHandler);return _possibleConstructorReturn(this, (UserLoginRequestHandler.__proto__ || Object.getPrototypeOf(UserLoginRequestHandler)).call(this,
        opt));
    }

    /**
       * 
       * @param {UserLoginRequest} clientReq 
       * @param {UserLoginResponse} clientRes
       */_createClass(UserLoginRequestHandler, [{ key: 'process', value: function process(
        clientReq, clientRes) {

            // 1. 사용자 정보를 DB에서 조회
            _managers2.default.db().getUserInfo(clientReq.userid, function (res) {

                console.log(res);

                // 사용자 유저 존재
                if (!!res) {
                    // 비밀번호 확인
                    if (clientReq.password === res[0].PASSWORD) {
                        // 토큰 생성
                        var date = new Date();
                        var userInfo = {};
                        userInfo.userid = clientReq.userid;
                        userInfo.timestamp = date.getTime();
                        var tokenvalue = _managers2.default.token().generateToken(userInfo);

                        var response = {};
                        response.token = tokenvalue;
                        response.code = 200;
                        response.result = "login success";
                        clientRes.send(response);
                    } else {
                        // 비밀번호 실패
                        clientRes.send("login fail::mismatch password");
                    }
                } else {
                    // 사용자 유저 없음
                    clientRes.send("login fail::id not exist");
                }
            });
        } }]);return UserLoginRequestHandler;}(_abstract_clientrequest_handler2.default);exports.default =


UserLoginRequestHandler;
//# sourceMappingURL=user_login_handler.js.map