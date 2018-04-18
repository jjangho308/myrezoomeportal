import Managers from '../core/managers';

import Env from '../core/environment';

/**
 * Optional JWT authenticator. <br />
 * 
 * JWT가 존재할 경우 uId를 추출하여 body에 실어서 보내줌
 * 없으면 pass. <br />
 * 
 * @since 180418
 * @author TACKSU
 */
export default (req, res, next) => {

    var tokenManager = Managers.token();
    var token = req.get('Authorization') ? req.get('Authorization').split(' ')[1] : req.cookies.JWT;
    if (!token) {
        next();
    } else {
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
}