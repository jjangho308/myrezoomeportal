'use strict';var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _chaiHttp = require('chai-http');var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../src/app');var _app2 = _interopRequireDefault(_app);

var _initializer = require('../src/core/initializer');var _initializer2 = _interopRequireDefault(_initializer);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe.skip('Chai HTTP test suite', function () {
    before('Chai init', function () {
        _chai2.default.use(_chaiHttp2.default);
        (0, _initializer2.default)();
    });

    it('Chai GET Request test', function (done) {
        _chai2.default.request(_app2.default).get('/client').end(function (err, res) {
            done();
        });
    });

    it('Agent Request Search record', function (done) {
        _chai2.default.request(_app2.default).
        post('/client').
        set('Content-Type', 'application/json').
        send({
            mid: 'salifeliajlsdf',
            cmd: 'Search',
            args: {
                pkey: 'asdfasefa' } }).


        end(function (err, res) {
            done();
        });;
    });
});
//# sourceMappingURL=chai.test.js.map