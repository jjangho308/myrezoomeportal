'use strict';var _assert = require('assert');var _assert2 = _interopRequireDefault(_assert);
var _push = require('../modules/push/push');var _push2 = _interopRequireDefault(_push);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
describe.skip('Push suit', function () {
    var push = new _push2.default();

    before('create Push Connection', function () {
        push.init();
    });

    it.skip('1. Send message', function (done) {
        push.sendMessage('Hello, world!', "01", function (err) {
            console.log(err);
            done();
        });
    }).timeout(3000);

    after('Diconnect AMQ', function (done) {
        //push.disconnect();
        done();
    });
});
//# sourceMappingURL=push.test.js.map