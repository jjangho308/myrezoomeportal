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
        console.log("ctrl signout ctrl");
        res.set('Set-Cookie', '')
                        .type('application/json').status(302).redirect('/');
        //res.render('index', {});
        //res.redirect('/');

    },

}