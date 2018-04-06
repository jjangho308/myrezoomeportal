import Managers from '../core/managers';

/**
 * /client http controller. <br />
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
        var requestEntity = new(clientRequest.getEntity(req.body.cmd))(req.body.args);
        requestEntity.uId = req.body.uId;
        clientRequest.request(requestEntity, (err, result) => {});
        res.json({
            mid: requestEntity.mid
        })
    },

    default: (req, res, next) => {

    }
}