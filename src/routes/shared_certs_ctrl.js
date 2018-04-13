import Managers from '../core/managers';
import ShareCertRequest from '../modules/client/certs/share_cert_request';

/**
 * Controller for '/shared_certs' URI. <br />
 * 
 * @since 180412
 * @author TACKSU
 */
export default {
    /**
     * Get controller. <br />
     */
    get: (req, res, next) => {

    },

    /**
     * Post controller. <br />
     */
    post: (req, res, next) => {
        if (!!req.xhr) {
            Managers.client().request(new ShareCertRequest(req.body), (err, result) => {
                if (!!err) {
                    res.json(JSON.stringify(err));
                } else {
                    res.json(result);
                }
            })
        }
    }
}