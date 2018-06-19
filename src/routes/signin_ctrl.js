var Managers = require('../core/managers');

var SignInRequest = require('../modules/client/user/signin_request');

var ErrorCode = require('../core/error/error_code');
var ResponseError = require('../core/error/response_error');
var HttpErrorCode = require('../core/error/http_status_code');


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

        // URL이 전달될 경우는 다른 페이지에서 SignIn이 필요해서 전달된 경우임
        res.locals.url = req.query.url || '';
        res.render('signin');
    },

    /**
     * Sign in process controller function. <br />
     * 
     * @since 180410
     * @author TACKSU
     */
    post: (req, res, next) => {
        if (!req.body.email) {
            return next(new ResponseError({
                code: ErrorCode.PARAM_NO_EMAIL,
                status: HttpErrorCode.BAD_REQUEST,
            }));
        } else if (!req.body.pw) {
            return next(new ResponseError({
                code: ErrorCode.PARAM_NO_PASSWORD,
                status: HttpErrorCode.BAD_REQUEST,
            }));
        } else {
            Managers.client().request(new SignInRequest(req.body), (err, result) => {
                if (!!err) {
                    return next(err);
                } else if (!result || !result.token) {
                    return next(new ResponseError({
                        code: ErrorCode.INTERNAL_UNKNOWN,
                        status: HttpErrorCode.INTERNAL_SERVER_ERROR,
                    }))
                } else {
                    return res.set('Set-Cookie', 'JWT=' + result.token)
                        .type('application/json').status(200).json(result);
                }
            });
        }
    }
}