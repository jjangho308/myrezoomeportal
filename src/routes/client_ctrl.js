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

        // Request body undefined일 경우 정의해줌
        if (!req.body) {
            req.body = {};
        }

        // console.log('client ctrl req body cmd : ')
        // console.log(req.body);
        // console.log('==============================================================');

        // Client에서 전달된 CommandName이 매핑된 RequestEntity를 생성.

        if (!!req.body.cmd) {
            next({
                err: {
                    code: 200,
                    msg: 'Command가 존재하지 않습니다.'
                }
            });
        } else {
            var requestEntity = new(clientRequest.getEntity(req.body.cmd))(req.body.args);

            // 모든 요청 객체에 대해 JWT에서 추출한 uId를 injection.
            requestEntity.uId = req.body.uId;
            clientRequest.request(requestEntity, (err, result) => {
                // 아직 Sent 안됐을때만 response
                if (!res.headersSent) {
                    if (!!err) {
                        next(err);
                    } else {
                        res.json({
                            mid: requestEntity.mId,
                            result: result
                        });
                    }
                } else {
                    // 이 경우가 발생하지 않도록 수정 필요
                    // TODO Error 처리
                }
            });
        }
    }
}