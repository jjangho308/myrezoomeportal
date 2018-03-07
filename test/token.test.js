import TokenManager from '../modules/token'

describe.skip('TokenManager Test Suit', () => {
    var token;
    var tokenString;

    before('Token module init', () => {
        token = new TokenManager();

        var info = {};
        info.user = 'guest';
        info.scope = 'all';
        token.setInfo(info);
    });

    it('TC#1 TokenManager.generateToken()', done => {
        tokenString = token.generateToken();
        if (typeof tokenString !== 'undefined') {
            console.log("token : \n" + tokenString);
            done();
        }
    });

    it('TC#2 TokenManager.validToken()', done => {
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
