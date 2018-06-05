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

        // TODO 실제 Keystore 값으로 변경 필요
        this.secretKey = 'rezoomesecretkey';
    }

    /**
     * Issue JWT. <br />
     * 
     * {
     *      uId : 'UID'
     * }
     * 
     * @since 180305
     * @param {string} userid 
     */
    issueToken(opt) {
        return jwt.sign({
            data: opt,
            // TODO 이 부분 property로 바꿀 필요가 있어보임.
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 4320) // 6month
            //}, 'rezoomesecretkey', { expiresIn: '1' });
        }, this.secretKey);
    }

    /**
     * Issue refresh token for intergrated user. <br />
     * 
     * @since 180530
     * @author TACKSU
     * 
     * @param {String} clientId Third-Party ID.
     * @param {String} uId Intergrated user id.
     * 
     * @return Token with 1 month
     */
    issueRefreshToken(clientId, uId) {
        return jwt.sign({
            data: {
                clientId: clientId,
                uId: uId
            },
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 720) // 1month
        }, this.secretKey);
    }

    /**
     * Issue OAuth token for intergrated user. <br />
     * 
     * @since 180530
     * @author TACKSU
     * 
     * @param {String} clientId ID of requested third-party. <br />
     * @param {String} uId uid of intergrated user.
     */
    issueOAuthToken(clientId, uId) {
        return jwt.sign({
            data: {
                clientId: clientId,
                uId: uId
            },
            // TODO 1달 단위로 수정 필요
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 720) // 1 month
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