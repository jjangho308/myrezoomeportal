'use strict';var _managers = require('../core/managers');var _managers2 = _interopRequireDefault(_managers);
var _assert = require('assert');var _assert2 = _interopRequireDefault(_assert);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe.skip('Module Test', function () {
    it('Module singleton test', function () {
        var push1 = _managers2.default.push;
        var push2 = _managers2.default.push;

        _assert2.default.deepEqual(push1, push2);
    });
});
//# sourceMappingURL=module.test.js.map