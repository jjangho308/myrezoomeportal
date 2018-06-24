var Managers = require('../core/managers');

var Env = require('../core/environment');

var ErrorCode = require('../core/error/error_code');
var ResponseError = require('../core/error/response_error');
var HttpStatusCode = require('../core/error/http_status_code');

/**
 * Token authentication middleware. <br />
 * Token이 없는 채로 Token이 필요한 페이지에 접근시
 * Signin page로 redirection. <br />
 * 
 * @since 180310
 * @author TACKSU
 */
module.exports = (req, res, next) => {

    var tokenManager = Managers.token();

    // Authorization Header와 cookie 모두 확인
    var token = req.get('Authorization') ?
        req.get('Authorization').split(' ')[1] :
        req.cookies.JWT;

    if (!token) {
        return res.status(HttpStatusCode.SEE_OTHER).redirect('/signin?url=' + `${req.protocol}://${req.hostname}${req.originalUrl}`);
        // next(new ResponseError({
        //     code: ErrorCode.AUTH_ERROR,
        //     status: HttpStatusCode.UNAUTHORIZED,
        //     redirect : '/',
        // }));
    }
    try {
        // req.params에는 넣어도 다음 middle ware로 전달이 안됨.
        var verified = tokenManager.verify(token);
        req.query.uId = verified.data.uId;
        req.body.uId = verified.data.uId;
        next();
    } catch (err) {
        return res.status(HttpStatusCode.SEE_OTHER).redirect('/signin?url=' + `${req.protocol}://${req.hostname}${req.originalUrl}`);
        // next(new ResponseError({
        //     code: ErrorCode.AUTH_ERROR,
        //     status: HttpStatusCode.UNAUTHORIZED,
        //     redirect : '/',
        // }));
    }
}