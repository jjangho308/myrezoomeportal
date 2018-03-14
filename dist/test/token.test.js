'use strict';var _token = require('../modules/token/token');var _token2 = _interopRequireDefault(_token);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe.skip('TokenManager Test Suit', function () {
    var token;
    var tokenString;

    before('Token module init', function () {
        token = new _token2.default();

        var info = {};
        info.user = 'guest';
        info.scope = 'all';
        token.setInfo(info);
    });

    it('TC#1 TokenManager.generateToken()', function (done) {
        tokenString = token.generateToken();
        if (typeof tokenString !== 'undefined') {
            console.log("token : \n" + tokenString);
            done();
        }
    });

    it('TC#2 TokenManager.validToken()', function (done) {
        var decoded = token.decodedToken(tokenString);

        console.log("decoded :");
        console.log(decoded);

        if (decoded.payload.data.user == 'guest') {
            done();
        }
    });

    after(function () {
        // server.close();
    });
});
//# sourceMappingURL=token.test.js.map