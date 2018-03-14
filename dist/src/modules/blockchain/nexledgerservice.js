'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _requestJson = require('request-json');var _requestJson2 = _interopRequireDefault(_requestJson);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

NexledgerService = function () {

    function NexledgerService() {_classCallCheck(this, NexledgerService);

    }_createClass(NexledgerService, [{ key: 'newaccount', value: function newaccount(

        nodeurl, callback) {
            var client = _requestJson2.default.createClient(nodeurl);
            //var data = args;
            var reqformatdata = {
                cmd: 'newaccount',
                args: {} };


            client.post('/', reqformatdata, function (err, res, body) {

                //console.error(err);
                //console.log(res);
                console.log("============response function=================");
                console.log(body);
                console.log("==============================================");
                callback(body);
            });

        } }, { key: 'getbytxid', value: function getbytxid(

        nodeurl, txid, callback) {

            var client = _requestJson2.default.createClient(nodeurl);

            var reqformatdata = {
                cmd: 'getbytxid',
                args: {
                    txid: txid } };



            client.post('/', reqformatdata, function (err, res, body) {
                console.log("============response function=================");
                console.log(body);
                console.log("==============================================");
                callback(body);
            });

        } }, { key: 'getbyaddress', value: function getbyaddress(

        nodeurl, address, callback) {
            var client = _requestJson2.default.createClient(nodeurl);
            var reqformatdata = {
                cmd: 'getbyaddress',
                args: {
                    address: address } };


            client.post('/', reqformatdata, function (err, res, body) {
                console.log("============response function=================");
                console.log(body);
                console.log("==============================================");
                callback(body);
            });

        } }, { key: 'put', value: function put(

        nodeurl, address, data, callback) {
            var client = _requestJson2.default.createClient(nodeurl);
            var reqformatdata = {
                cmd: 'put',
                args: {
                    address: address,
                    data: data } };


            client.post('/', reqformatdata, function (err, res, body) {
                console.log("============response function=================");
                console.log(body);
                console.log("==============================================");
                callback(body);
            });

        } }]);return NexledgerService;}();exports.default =



NexledgerService;
//# sourceMappingURL=nexledgerservice.js.map