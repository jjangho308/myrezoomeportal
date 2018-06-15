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