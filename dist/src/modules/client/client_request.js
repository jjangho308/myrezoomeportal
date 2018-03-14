'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _hashmap = require('hashmap');var _hashmap2 = _interopRequireDefault(_hashmap);

var _abstract_manager = require('../abstract_manager');var _abstract_manager2 = _interopRequireDefault(_abstract_manager);


var _user_login_handler = require('./user_login_handler');var _user_login_handler2 = _interopRequireDefault(_user_login_handler);

var _search_record = require('./search_record');var _search_record2 = _interopRequireDefault(_search_record);
var _search_record_handler = require('./search_record_handler');var _search_record_handler2 = _interopRequireDefault(_search_record_handler);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * Request job manager from client. <br />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * 초기화 시 Job map를 생성하며 Client channel의 HTTP Request 발생 시 Job을 생성하여 저장한다.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * Agent에서 Http 요청이 올 때 여기 저장된 Job을 기반으로 해당 Client에 Socket Push를 전송하도록 한다.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    * @since 180228
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    */var
ClientRequestManager = function (_AbstractManager) {_inherits(ClientRequestManager, _AbstractManager);
    function ClientRequestManager(opt) {_classCallCheck(this, ClientRequestManager);var _this = _possibleConstructorReturn(this, (ClientRequestManager.__proto__ || Object.getPrototypeOf(ClientRequestManager)).call(this,
        opt));
        _this.entityMap = new _hashmap2.default();
        _this.handlerMap = new _hashmap2.default();
        _this.requestMap = new _hashmap2.default();return _this;
    }_createClass(ClientRequestManager, [{ key: 'init', value: function init()

        {
            this.entityMap.set('Search', _search_record2.default);
            this.handlerMap.set(_search_record2.default, new _search_record_handler2.default());

            this.setPrepared();
        } }, { key: 'getEntity', value: function getEntity(

        code) {
            return this.entityMap.get(code);
        } }, { key: 'getHandler', value: function getHandler(

        entity) {
            return this.handlerMap.get(entity.prototype);
        }

        /**
           * Handle client request
           * 
           * @param {AbstractClientRequest} request
           */ }, { key: 'request', value: function request(
        _request) {var _this2 = this;
            this.requestMap.set(_request.mid, _request);
            this.requestHandler.get(_request.constructor).request(_request, function (resultCode, result) {
                switch (resultCode) {
                    case ClientRequestManager.RESULT_FAILURE:
                        {
                            // result instanceof Error Retry?
                            break;
                        }

                    case ClientRequestManager.RESULT_PENDING:
                        {
                            // result instanceof Object Keep request?
                            _this2.requestMap.set(_request.mid, _request);
                            break;
                        }

                    case ClientRequestManager.RESULT_SUCCESS:
                        {
                            // Remove request?
                            break;
                        }}

            }.bind(this));
        }

        /**
           * Agent에서 비동기적인 응답이 전달되면 ClientRequest가 들고 있던
           * socket을 통해 ClientBrowser로 Response를 push 한다.
           * @param {*} requestId 
           * @param {*} response 
           */ }, { key: 'response', value: function response(
        requestId, _response, cb) {
            var entity = this.requestMap.get(requestId);
            this.handlerMap.get(entity.constructor).response(entity, _response);
        } }]);return ClientRequestManager;}(_abstract_manager2.default);


ClientRequestManager.RESULT_SUCCESS = 0;
ClientRequestManager.RESULT_PENDING = 1;
ClientRequestManager.RESULT_FAILURE = 2;exports.default =

ClientRequestManager;
//# sourceMappingURL=client_request.js.map