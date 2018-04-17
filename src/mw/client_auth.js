import Managers from '../core/managers';

import Env from '../core/environment';

/**
 * Token authentication middleware. <br />
 * 
 * @since 180310
 * @author TACKSU
 */
export default (req, res, next) => {

    // TODO Authorization 뿐만 아니라 cookie에서 JWT 항목 추출하여 검증해야 함.
    var tokenManager = Managers.token();
    var token = req.get('Authorization').split(' ')[1];
    try {
        // req.params에는 넣어도 다음 middle ware로 전달이 안되서 삭제함
        var verified = tokenManager.verify(token);
        req.query.uId = verified.data.uId;
        req.body.uId = verified.data.uId;
        next();
    } catch (e) {
        throw e;
        next(e);
    }
}