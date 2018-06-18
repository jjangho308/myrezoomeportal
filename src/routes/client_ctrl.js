var Managers = require('../core/managers');

var ErrorCode = require('../core/error/error_code');
var ResponseError = require('../core/error/response_error');
var HttpStatuCode = require('../core/error/http_status_code');

/**
 * /client request controller. <br />
 * 
 * @since 180313
 * @author TACKSU
 */
module.exports = {

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

        // Client에서 전달된 CommandName이 매핑된 RequestEntity를 생성.

        if (!!req.body.cmd) {
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
                    return;
                }
            });
        } else {
            next(new ResponseError({
                code: ErrorCode.PARAM_NO_CMD,
                status: HttpStatuCode.BAD_REQUEST,
            }));
        }
    }
}