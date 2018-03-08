import AbstractManager from "./abstract";
import jwt from 'jsonwebtoken'

/**
 * TokenManager. <br />
 * 
 * @since 180305
 */
class TokenManager extends AbstractManager {
    constructor(opt) {
        super(opt);
    }

    generateToken(info) {
        return jwt.sign({
            data: info,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12) // 12hour
            //}, 'rezoomesecretkey', { expiresIn: '1' });
        }, 'rezoomesecretkey');
    }

    filterToken(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
        } else {
            var ignoredCmd = ['token', 'health']; // ignore cmd
            var ignoredFlag = false;

            ignoredCmd.forEach(function (ingored) {
                if (ingored == req.body.cmd) {
                    innoredFlag = true;
                }
            });

            if (innoredFlag) {
                next();
            } else {
                res.send(403);
            }
        }

        jwt.verify(bearerToken, 'secretkey', function (error, decoded) {
            if (error) {
                console.log(error);
                res.send(403);
            } else {
                console.log(decoded);
                req.token = bearerToken;
                next();
            }
        });
    }

    decodedToken(token) {
        return jwt.decode(token, { complete: true });
    }
}

export default TokenManager;