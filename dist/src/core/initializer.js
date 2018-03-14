'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =








init;var _managers = require('./managers');var _managers2 = _interopRequireDefault(_managers);var _abstract_manager = require('../modules/abstract_manager');var _abstract_manager2 = _interopRequireDefault(_abstract_manager);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                                                                                                                                                                               * Rezoome portal initialize. <br />
                                                                                                                                                                                                                                                                                                                               * 
                                                                                                                                                                                                                                                                                                                               * @since 180302
                                                                                                                                                                                                                                                                                                                               * @author TACKSU
                                                                                                                                                                                                                                                                                                                               * @param {*} cb 
                                                                                                                                                                                                                                                                                                                               */function init(from) {// Initialize managers.
    for (var i in _managers2.default) {if (_managers2.default[i] instanceof Function) {var manager = _managers2.default[i]();if (manager instanceof _abstract_manager2.default) {manager.init();
            }
        }
    }
};
//# sourceMappingURL=initializer.js.map