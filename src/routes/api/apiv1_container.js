var IssueCertEntity = require('../../modules/client/api/v1/api_issue_cert_entity');
var IssueCertHandler = require('../../modules/client/api/v1/api_issue_cert_handler');

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
    'issuecert': (req, res, next) => {
        // Access token for API.
        var accessToken = req.body.accessToken;

        // Access granted user Id.
        var uId = req.body.uId;

        var clientId = req.body.clientId;

        // Raw data of Client server
        var data = req.body.data;

        var entity = new IssueCertEntity({
            uId: uId,
            clientId: clientId,
            data: data
        });

        Managers.client().request(entity, (err, result) => {
            if (!!err) {
                next(err);
            }
            res.send(result);
        });
    }
}