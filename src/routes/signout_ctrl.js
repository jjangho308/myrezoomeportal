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
        console.log("ctrl signout ctrl");
        res.set('Set-Cookie', '')
                        .type('application/json').status(302).redirect('/');
        //res.render('index', {});
        //res.redirect('/');

    },

}