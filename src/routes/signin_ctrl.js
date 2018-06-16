var Managers = require('../core/managers');

var SignInRequest = require('../modules/client/user/signin_request');

var ErrorCode = require('../core/error/error_code');
var HttpResponseError = require('../core/error/response_error');

/**
 * Controller for /signin URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
module.exports = {

    /**
     * Temporal get request controller. <br />
     * 
     * @since 180410
     * @author TACKSU
     */
    get: (req, res, next) => {
        res.render('signin', {});
    },

    /**
     * Sign in process controller function. <br />
     * 
     * @since 180410
     * @author TACKSU
     */
    post: (req, res, next) => {
        if (!req.body.email) {
            return next(new HttpResponseError({
                code: ErrorCode.PARAM_INVALID,
            }));
        } else if (!!req.body.pw) {
            return next(new HttpResponseError({
                code: ErrorCode.PARAM_INVALID,
            }));
        } else {
            Managers.client().request(new SignInRequest(req.body), (err, result) => {
                if (!!err) {
                    return next(err);
                } else if (!result || !result.token) {
                    return next(new HttpResponseError({
                        code: ErrorCode.INTERNAL_UNKNOWN,
                    }))
                } else {
                    return res.set('Set-Cookie', 'JWT=' + result.token)
                        .type('application/json').status(200).json(result);
                }
            });
        }
    }
}