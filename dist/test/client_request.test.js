'use strict';var _assert = require('assert');var _assert2 = _interopRequireDefault(_assert);
var _initializer = require('../core/initializer');var _initializer2 = _interopRequireDefault(_initializer);
var _managers = require('../core/managers');var _managers2 = _interopRequireDefault(_managers);
var _client_request = require('../modules/client/client_request');var _client_request2 = _interopRequireDefault(_client_request);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe.skip('Client request test suite', function () {
    var clientRequestManager = null;

    before('Service init', function () {
        _initializer2.default.init();
        clientRequestManager = _managers2.default.clientRequest();
    });

    it('Search record command', function (done) {
        var requestEntity = {
            userid: 'asdf',
            orgs: [
            {
                name: 'OPIc',
                code: 'aasdf' }] };




        var requestResult = clientRequestManager.processRequest(requestEntity);
        _assert2.default.equals(requestResult, _client_request2.default.RESULT_PENDING);
    });

    after('Clean up', function () {

    });
});
//# sourceMappingURL=client_request.test.js.map