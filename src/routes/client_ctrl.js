import Managers from '../core/managers';

/**
 * /client http controller. <br />
 * 
 * @since 180313
 * @author TACKSU
 */
export default {
    post: (req, res, next) => {
        var clientRequest = Managers.client();
        var requestEntity = new (clientRequest.getEntity(req.body.cmd))(req.body.args);
        clientRequest.request(requestEntity, (err, result) => {});
        res.json({
            mid: requestEntity.mid
        })
    },

    default: (req, res, next) => {

    }
}