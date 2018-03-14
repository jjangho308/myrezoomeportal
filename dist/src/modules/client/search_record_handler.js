'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _managers = require('../../core/managers');var _managers2 = _interopRequireDefault(_managers);

var _db = require('../db/db');var _db2 = _interopRequireDefault(_db);
var _push = require('../push/push');var _push2 = _interopRequireDefault(_push);

var _abstract_clientrequest_handler = require('./abstract_clientrequest_handler');var _abstract_clientrequest_handler2 = _interopRequireDefault(_abstract_clientrequest_handler);

var _client_request = require('./client_request');var _client_request2 = _interopRequireDefault(_client_request);
var _search = require('../push/message/search');var _search2 = _interopRequireDefault(_search);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Handler for SearchRecordRequest. <br />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 이력 검색 요청 핸들러.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author CHANGHO
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @since 180313
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */var
SearchRecordRequestHandler = function (_AbstractClientReques) {_inherits(SearchRecordRequestHandler, _AbstractClientReques);
    function SearchRecordRequestHandler(opt) {_classCallCheck(this, SearchRecordRequestHandler);return _possibleConstructorReturn(this, (SearchRecordRequestHandler.__proto__ || Object.getPrototypeOf(SearchRecordRequestHandler)).call(this,
        opt));
    }

    /**
       * 
       * @param {HttpResponse} httpRes 
       * @param {SearchRecordRequest} clientReq {
       *      userId : "rezoome Id",
       *      orgs    : [{
       *                      code : '기관 코드',
       *                      key : {
       *                                  var1 : '키1',
       * *                                var2 : '키2',
       *                              }
       *                  }
       *              ]
       * }
       */_createClass(SearchRecordRequestHandler, [{ key: 'request', value: function request(
        clientReq, done) {
            // 1. 기관 정보를 db에서 가져오고

            //orgcode => sendmessage 
            var rezoome_id = clientReq.userid;
            var orgs = clientReq.orgs;

            //get personal info(rezoome id => username, birth, gender, phone, ci, email)
            ///////////////////////////////////////////////////////////////////
            var db = _managers2.default.db();

            //send message
            db.getUserDao().get(rezoome_id, function (err, users) {

                var msg = new _search2.default({
                    cmd: clientReq.cmd,
                    mid: clientReq.mid,
                    args: users });


                _managers2.default.push().sendMessage(msg, orgs, function (err) {
                    !!err ? done(_client_request2.default.RESULT_FAILURE, err) : done(_client_request2.default.RESULT_PENDING);
                });
            });
        } }, { key: 'response', value: function response(

        clientRequest, agentRequest) {
            var socket = clientRequest.socket;

            // TODO socket으로 발신
        }

        // makeMSG(clientReq, personalInfo) {

        //     var args = {};
        //     args.username = personalInfo[0].NAME;
        //     args.birth = personalInfo[0].BIRTH;
        //     args.gender = personalInfo[0].GENDER;
        //     args.phone = personalInfo[0].PHONE;
        //     args.ci = personalInfo[0].CI;
        //     args.email = personalInfo[0].EMAIL;

        //     var msg = new SearchRecordPush({
        //         cmd: clientReq.cms,
        //         mid: clientReq.mid,
        //         args = args
        //     });
        //     return msg;
        // }
    }]);return SearchRecordRequestHandler;}(_abstract_clientrequest_handler2.default);exports.default =

SearchRecordRequestHandler;
//# sourceMappingURL=search_record_handler.js.map