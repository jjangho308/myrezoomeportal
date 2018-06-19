var Managers = require('../core/managers');
var ShareCertRequest = require('../modules/client/certs/share_cert_request');

/**
 * Controller for '/shared_certs' URI. <br />
 * 
 * @since 180412
 * @author TACKSU
 */
module.exports = {

    /**
     * Controll function to create share context of given certificate. <br />
     * 
     * @since
     * @author TACKSU
     */
    post: (req, res, next) => {
        Managers.client().request(new ShareCertRequest(req.body), (err, result) => {
            if (!!err) {
                next(err);
            } else {
                res.json(result);
            }
        })
    }
}