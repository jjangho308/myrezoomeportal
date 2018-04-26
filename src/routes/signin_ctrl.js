import Managers from '../core/managers'

import SignInRequest from '../modules/client/user/signin_request'

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
        if (!!req.xhr) {
            Managers.client().request(new SignInRequest(req.body), (err, result) => {
                if (!!err) {
                    res.status(500).json(err);
                } else {
                    res.set('Set-Cookie', 'JWT=' + result.token);
                    res.json(result);
                }
            });
        } else {
            next(new Error("Not found."));
        }
    }
}