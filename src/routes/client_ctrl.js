import Managers from '../core/managers';

/**
 * /client request controller. <br />
 * 
 * @since 180313
 * @author TACKSU
 */
export default {

    /**
     * Generic controller function of '/client' URI Request. <br />
     * 
     * @since 180313
     * @author TACKSU
     */
    post: (req, res, next) => {
        var clientRequest = Managers.client();

        // TODO Request body undefined일 경우 정의해줌
        if (!req.body) {
            req.body = {};
        }

        console.log('client ctrl req body cmd : ')
        console.log(req.body);
        console.log('==============================================================');

        // Client에서 전달된 CommandName이 매핑된 RequestEntity를 생성.
        var requestEntity = new(clientRequest.getEntity(req.body.cmd))(req.body.args);

        // 모든 요청 객체에 대해 JWT에서 추출한 uId를 injection.
        requestEntity.uId = req.body.uId;
        clientRequest.request(requestEntity, (err, result) => {
            if (!!err) {
                next(err);
            } else {
                res.json({
                    mid: requestEntity.mId
                });
            }
        });
    }
}