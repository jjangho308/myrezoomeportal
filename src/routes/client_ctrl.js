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
        var requestEntity = new(clientRequest.getEntity(req.body.cmd))(req.body.args);
        requestEntity.uId = req.body.uId;
        clientRequest.request(requestEntity, (err, res) => {});
        res.json({
            mid: requestEntity.mId
        })
    },

    default: (req, res, next) => {

    }
}