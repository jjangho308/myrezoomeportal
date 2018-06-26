var APIIssueCertEntity = require('../../modules/client/api/v1/api_issue_cert_entity');

var Managers = require('../../core/managers');

/**
 * API Version 1 function container. <br />
 * 
 * @since 180528
 * @author TACKSU
 */
module.exports = {

    /**
     * API function to issue certificate by given data from request client. <br />
     * 
     * @since 180528
     * @author TACKSU
     */
    issuecert: (req, res, next) => {
        Managers.client().request(new APIIssueCertEntity({
            uId: req.body.uId,
            clientId: req.body.clientId,
            data: req.body.data,
        }, (err, result) => {
            if (!!err) {
                return next(err);
            }
            res.send(result);
        }));
    }
}