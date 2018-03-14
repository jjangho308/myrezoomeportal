'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _pdfkit = require('pdfkit');var _pdfkit2 = _interopRequireDefault(_pdfkit);
var _managers = require('../../core/managers');var _managers2 = _interopRequireDefault(_managers);
var _abstract_clientrequest_handler = require('./abstract_clientrequest_handler');var _abstract_clientrequest_handler2 = _interopRequireDefault(_abstract_clientrequest_handler);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * 증명서 요청 핸들러.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */var
CertificateRequestHandler = function (_AbstractClientReques) {_inherits(CertificateRequestHandler, _AbstractClientReques);
    function CertificateRequestHandler(opt) {_classCallCheck(this, CertificateRequestHandler);return _possibleConstructorReturn(this, (CertificateRequestHandler.__proto__ || Object.getPrototypeOf(CertificateRequestHandler)).call(this,
        opt));
    }

    /**
       * 
       * @param {CertificateRequest} clientReq 
       * @param {CertificateResponse} clientRes
       */_createClass(CertificateRequestHandler, [{ key: 'process', value: function process(
        clientReq, clientRes) {

            var REZOOME_CERTIFICATE = {};

            // 1. 사용자 정보를 DB에서 조회
            _managers2.default.db().getUserInfo(clientReq.args.userid, function (res) {

                console.log(res);

                // 사용자 유저 존재
                if (!!res) {
                    REZOOME_CERTIFICATE.name = res[0].NAME;
                    REZOOME_CERTIFICATE.birthday = res[0].BIRTH;
                    REZOOME_CERTIFICATE.grade = "AL3";
                    REZOOME_CERTIFICATE.publish_date = "2018년 01월 01일";
                    REZOOME_CERTIFICATE.orgname = "오픽";
                    REZOOME_CERTIFICATE.hash = "ssdfawefasdfv234r34trefwerfswerf";

                    _managers2.default.pdf().makePDF(_pdfkit2.default, REZOOME_CERTIFICATE, clientRes);
                }
            });
        } }]);return CertificateRequestHandler;}(_abstract_clientrequest_handler2.default);exports.default =


CertificateRequestHandler;
//# sourceMappingURL=certificate_handler.js.map