"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * Abstraction of Request from client. <br />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @since 180312
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @author TACKSU
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */var
AbstractClientRequestHandler = function () {
    function AbstractClientRequestHandler(opt) {_classCallCheck(this, AbstractClientRequestHandler);
        this.opt = opt;
    }

    /**
       * Client 요청을 처리한다.
       * @param {*} request 
       */_createClass(AbstractClientRequestHandler, [{ key: "processRequest", value: function processRequest(
        request) {

        }

        /**
           * 비동기적으로 전달 된 Response를 처리한다.
           * @param {*} response 
           */ }, { key: "processResponse", value: function processResponse(
        response) {

        } }]);return AbstractClientRequestHandler;}();exports.default =


AbstractClientRequestHandler;
//# sourceMappingURL=abstract_clientrequest_handler.js.map