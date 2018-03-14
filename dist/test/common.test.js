'use strict';var _assert = require('assert');var _assert2 = _interopRequireDefault(_assert);

var _initializer = require('../core/initializer');var _initializer2 = _interopRequireDefault(_initializer);
var _managers = require('../core/managers');var _managers2 = _interopRequireDefault(_managers);
var _property = require('../modules/property/property');var _property2 = _interopRequireDefault(_property);

var _sample = require('./sample.js');var _sample2 = _interopRequireDefault(_sample);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe.skip('Instant test suit', function () {

    it('Initialize managers', function () {
        (0, _initializer2.default)();
        var property = _managers2.default.property();
        _assert2.default.equal(property.get(_property2.default.PUSH_HOST, 'empty'),
        "b-cb8c6e8c-f893-4464-aa69-b3501991ef60-1.mq.ap-southeast-2.amazonaws.com");
    });

    it('Singleton test', function () {
        var property1 = _managers2.default.property();
        var property2 = _sample2.default.property;

        _assert2.default.deepStrictEqual(property1, property2);
    });
});
//# sourceMappingURL=common.test.js.map