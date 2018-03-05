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

    setInfo(info) {
        this.info = info;
    }

    generateToken() {
        return jwt.sign({
            data: this.info,
            //exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
            //}, 'rezoomesecretkey', { expiresIn: '1' });
        }, 'rezoomesecretkey'); // not expired time
    }

    filterToken(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
        } else {
            res.send(403);
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