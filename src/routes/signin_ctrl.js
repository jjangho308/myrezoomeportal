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
        res.render('main', {});
    },

    /**
     * Sign in process controller function. <br />
     * 
     * @since 180410
     * @author TACKSU
     */
    post: (req, res, next) => {
        console.log(req.body);
        var signin = new SignInRequest(req.body);
        Managers.client().request(signin, (err, result) => { 
            if (!!err) {
                console.log(err.toString());
            } else {
                res.set('Set-Cookie', 'JWT=' + result.token);
                res.json(result);
            }
        });
    }
}