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

    it('TC#1 TokenManager.generateToken()', done => {
        token = Managers.token().issueToken({
            uId: 'UID2'
        })
        console.log("UID2 : " + token);
        
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
                userid: 'chang8shin'
            },
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12) // 1hour
        }, 'rezoomesecretkey');
        console.log(signedToken);

        signedToken = jwt.sign({
            data: {
                userid: 'sungyeon'
            },
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12) // 1hour
        }, 'rezoomesecretkey');
        console.log(signedToken);

        signedToken = jwt.sign({
            data: {
                userid: 'heonug'
            },
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12) // 1hour
        }, 'rezoomesecretkey');
        console.log(signedToken);
    });

    after(function () {
        // server.close();
    });
});