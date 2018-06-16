var Managers = require('../core/managers');

var Env = require('../core/environment');

/**
 * Token authentication middleware. <br />
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
        next(new Error("No token error"));
    }
    try {
        // req.params에는 넣어도 다음 middle ware로 전달이 안됨.
        var verified = tokenManager.verify(token);
        req.query.uId = verified.data.uId;
        req.body.uId = verified.data.uId;
        next();
    } catch (err) {
        console.error(err.stack);
        next(err);
    }
}