'use strict';var _crypto = require('crypto');var _crypto2 = _interopRequireDefault(_crypto);
var _assert = require('assert');var _assert2 = _interopRequireDefault(_assert);

var _property = require('../modules/property/property');var _property2 = _interopRequireDefault(_property);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe.skip('Property test suit', function () {
    var propertyManager;
    before('PropertyManager init', function () {
        process.env.NODE_ENV = process.env.NODE_ENV && process.env.NODE_ENV.trim().toLowerCase() == 'production' ? 'production' : 'development';
        propertyManager = new _property2.default();
        propertyManager.init();
    });

    it('Push Property Test', function () {
        console.log(_property2.default.PUSH_HOST);
        _assert2.default.equal(propertyManager.get(_property2.default.PUSH_HOST, "EMPTY"),
        'b-cb8c6e8c-f893-4464-aa69-b3501991ef60-1.mq.ap-southeast-2.amazonaws.com');
    });

    it('Set & get test', function () {
        var key = 'key.host';
        var value = 'key.value';
        propertyManager.set(key, value);
        _assert2.default.equal(value, propertyManager.get(key, null));
    });

    after('Property file close', function () {

    });
});
//# sourceMappingURL=property.test.js.map