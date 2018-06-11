import Managers from '../core/managers'

import SignInRequest from '../modules/client/user/signin_request'

import ErrorCode from '../core/error/error_code';
import HttpResponseError from '../core/error/response_error';

/**
 * Controller for /signin URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
export default {

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
        if (!!req.body.email && req.body.pw) {
            Managers.client().request(new SignInRequest(req.body), (err, result) => {
                if (!!err) {
                    next(err);
                } else {
                    res.set('Set-Cookie', 'JWT=' + result.token)
                        .type('application/json').status(200).json(result);
                }
            });
        } else {
            next(new HttpResponseError({
                code: ErrorCode.PARAM_INVALID
            }));
        }
    }
}