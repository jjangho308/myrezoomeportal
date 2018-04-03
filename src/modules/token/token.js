import jwt from 'jsonwebtoken'

import AbstractManager from "../abstract_manager";


/**
 * TokenManager. <br />
 * 
 * @since 180305
 */
class TokenManager extends AbstractManager {

    /**
     * Default constructor. <br />
     * 
     * @since 180305
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    init(from) {
        super.init(from);
        this.secretKey = 'rezoomesecretkey';
    }

    /**
     * Issue JWT. <br />
     * 
     * @since 180305
     * @param {string} userid 
     */
    issueToken(opt) {
        return jwt.sign({
            data: opt,
            // TODO 이 부분 property로 바꿀 필요가 있어보임.
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 1) // 1hour
            //}, 'rezoomesecretkey', { expiresIn: '1' });
        }, this.secretKey);
    }

    filterToken(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];

            jwt.verify(bearerToken, 'rezoomesecretkey', function (error, decoded) {
                if (error) {
                    console.log(error);
                    res.send(403);
                } else {
                    console.log(decoded);
                    req.token = bearerToken;
                    req.body.args.userid = decoded.data.userid;
                    next();
                }
            });
        } else {
            var ignoredCmd = ['Health', 'Login']; // ignore cmd
            var ignoredFlag = false;

            ignoredCmd.forEach(function (ingored) {
                if (ingored == req.body.cmd) {
                    ignoredFlag = true;
                }
            });

            if (ignoredFlag) {
                next();
            } else {
                res.send(403);
            }
        }
    }

    decodedToken(token) {
        return jwt.decode(token, {
            complete: true
        });
    }

    verify(token) {
        return jwt.verify(token, this.secretKey);
    }
}

export default TokenManager;