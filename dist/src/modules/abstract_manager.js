"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * AbstratManager. <br />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @since 180228.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */var
AbstractManager = function () {
    function AbstractManager(context) {_classCallCheck(this, AbstractManager);
        this.context = context;
    }_createClass(AbstractManager, [{ key: "init", value: function init()

        {

        }

        /**
           * Set flag to be prepared. <br />
           * 
           * @since 180305
           * @author TACKSU
          */ }, { key: "setPrepared", value: function setPrepared()
        {
            this.prepared = true;
        }

        /**
           * Check whether this manager is ready. <br />
           * 
           * @since 180305
           * @author TACKSU
          */ }, { key: "isPrepared", value: function isPrepared()
        {
            return !!this.prepared;
        } }]);return AbstractManager;}();exports.default =


AbstractManager;
//# sourceMappingURL=abstract_manager.js.map