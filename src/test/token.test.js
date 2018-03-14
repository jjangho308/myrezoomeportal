import Initializer from '../core/initializer';
import Managers from '../core/managers'
import TokenManager from '../modules/token/token'
import jwt from 'jsonwebtoken';

describe('TokenManager Test Suit', () => {
    var token;
    var tokenString;

    before('Token module init', () => {
        Initializer();
        token = Managers.token();

        // var info = {};
        // info.user = 'guest';
        // info.scope = 'all';
        // token.setInfo(info);
    });

    it.skip('TC#1 TokenManager.generateToken()', done => {
        tokenString = token.generateToken();
        if (typeof tokenString !== 'undefined') {
            console.log("token : \n" + tokenString);
            done();
        }
    });

    it.skip('TC#2 TokenManager.validToken()', done => {
        var decoded = token.decodedToken(tokenString);

        console.log("decoded :");
        console.log(decoded);

        if (decoded.payload.data.user == 'guest') {
            done();
        }
    });

    it('JWT POC', done => {
        var signedToken = jwt.sign({
            data: {
                userid: 'asdfasdf123'
            },
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 1) // 1hour
        }, 'rezoomesecretkey');

        console.log(signedToken);

        var decoded = jwt.decode(signedToken, {
            complete: true
        })

        console.log(decoded);

        var verified = jwt.verify(signedToken, 'rezoomesecretkey');
        console.log(verified);
    });

    after(function () {
        // server.close();
    });
});