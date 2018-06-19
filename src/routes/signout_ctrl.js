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
        // TODO 토큰 체크같은게 필요없나?
        // SignOut 상태에서 이 Route로 들어와도 아무 문제 없는건가?
        res.clearCookie('JWT')
            .type('application/json').status(302).redirect('/');
    },
}