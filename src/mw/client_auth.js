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
        var verified = tokenManager.verify(token);
        req.params.uId = verified.data.uId;
        next();
    } catch (e) {
        throw e;
        next(e);
    }
}