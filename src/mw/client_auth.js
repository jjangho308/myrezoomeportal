import Managers from '../core/managers';

import Env from '../core/environment';

/**
 * Token authentication middleware. <br />
 * 
 * @since 180310
 * @author TACKSU
 */
export default (req, res, next) => {

    var tokenManager = Managers.token();
    var token = req.get('Authorization') ? req.get('Authorization').split(' ')[1] : req.cookies.JWT;
    if (!token) {
        next(new Error("No token error"));
    }
    try {
        // req.params에는 넣어도 다음 middle ware로 전달이 안되서 삭제함
        var verified = tokenManager.verify(token);
        req.query.uId = verified.data.uId;
        req.body.uId = verified.data.uId;
        next();
    } catch (e) {
        // Error middleware call
        next(e);
    }
}