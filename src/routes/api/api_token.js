import Managers from '../core/managers';

import Env from '../core/environment';

/**
 * API Access token extractor. <br />
 * 
 * @since 18604
 * @author TACKSU
 */
export default (req, res, next) => {

    var tokenManager = Managers.token();

    // Authorization Header와 cookie 모두 확인
    var accessToken = req.get('Authorization') ?
        req.get('Authorization').split(' ')[1] :
        req.cookies.accessToken;

    if (!accessToken) {
        next(new Error("No access token error"));
    }
    try {
        // req.params에는 넣어도 다음 middle ware로 전달이 안됨.
        var verified = tokenManager.verify(accessToken);
        req.query.clientId = verified.data.clientId;
        req.query.uId = verified.data.uId;
        req.body.clientId = verified.data.clientId;
        req.body.uId = verified.data.uId;
        next();
    } catch (e) {
        next(e);
    }
}