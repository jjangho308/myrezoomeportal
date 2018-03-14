"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _stompit = require("stompit");var _stompit2 = _interopRequireDefault(_stompit);

var _managers = require("../../core/managers");var _managers2 = _interopRequireDefault(_managers);

var _abstract_manager = require("../abstract_manager");var _abstract_manager2 = _interopRequireDefault(_abstract_manager);
var _property = require("../property/property");var _property2 = _interopRequireDefault(_property);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * PushManager. <br />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author 신창호.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @since 180228
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */var
PushManager = function (_AbstractManager) {_inherits(PushManager, _AbstractManager);
    function PushManager(opt) {_classCallCheck(this, PushManager);return _possibleConstructorReturn(this, (PushManager.__proto__ || Object.getPrototypeOf(PushManager)).call(this,
        opt));
    }_createClass(PushManager, [{ key: "init", value: function init()

        {
            //property를 가져온다
            var propertyManager = _managers2.default.property();

            this.connect([{
                host: propertyManager.get(_property2.default.PUSH_HOST),
                port: propertyManager.get(_property2.default.PUSH_PORT),
                ssl: true,
                connectHeaders: {
                    host: propertyManager.get(_property2.default.PUSH_HEADER_HOST),
                    login: propertyManager.get(_property2.default.PUSH_HEADER_LOGIN),
                    passcode: propertyManager.get(_property2.default.PUSH_HEADER_PASSCODE) } }],

            function (factory) {
                console.log("AMQ Connect Success!");
            });
        }

        /**
           * Connect AMQ server. <br />
           * 
           * @since 180302
           * @param {object} opt 
           */ }, { key: "connect", value: function connect(
        opt, cb) {
            var connections = new _stompit2.default.ConnectFailover(opt, {
                maxReconnects: 1 });


            connections.on('connecting', function (connector) {
                var address = connector.serverProperties.remoteAddress.transportPath;
                console.log('Connecting to ' + address);
            });

            connections.on('error', function (error) {
                var connectArgs = error.connectArgs;
                var address = connectArgs.host + ':' + connectArgs.port;

                console.log('Connection error to ' + address + ': ' + error.message);
            });

            this.channelFactory = new _stompit2.default.ChannelFactory(connections);
            this.channelFactory.channel(function (err, channel) {
                if (err) {
                    console.log('channel factory error: ' + error.message);
                    return;
                }
                this.channel = channel;

            }.bind(this));
            cb(this.channelFactory);
        }


        /**
           * Send Message to AMQ Server <br />
           * 
           * @since 180302
           * @param {object} msg
           */ }, { key: "sendMessage", value: function sendMessage(
        msg, orgs, cb) {var _this2 = this;

            // FIXME 이렇게 할 경우 아래의 this.msg에서 access했을 때 의도한 msg와 다른 msg가 들어 있을 가능성 있음
            // this.msg = msg;
            // 1.getting QueueName, using orgcode..
            // 1.1 make SQL Param
            var sqlparam = '';
            for (var i in orgs) {
                sqlparam += JSON.stringify(orgs[i].code);
                if (i != orgs.length - 1) {
                    sqlparam = sqlparam + ",";
                }
            }

            var db = _managers2.default.db();

            db.getOrgDao().getByCodes(orgs, function (err, result) {
                !!err ? cb(err) : function () {
                    var msgString = JSON.stringify(msg);
                    for (var i in result) {

                        //seeting destination at this.destination
                        _this2.channel.send(result[i].queueName, msgString, function (err) {

                            if (err) {
                                console.log('send error: ' + err.message);
                                cb(err);
                            }
                            console.log('sent message');
                            cb(null);
                        });
                    }
                }.call(_this2);
            }.bind(this));
        } }, { key: "disconnect", value: function disconnect()

        {
            this.channel.close();
        } }]);return PushManager;}(_abstract_manager2.default);exports.default =



PushManager;
//# sourceMappingURL=push.js.map