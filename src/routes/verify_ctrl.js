var Managers = require('../core/managers');
var VerifyRequest = require('../modules/client/verify/verify_request');

/**
 * Controller function for '/v' Router.
 * 
 * @since 180509
 * @author TACKSU
 * 
 */
module.exports = {
    get: (req, res, next) => {
        req.body.shortUrl = req.params.shortUrl;
        Managers.client().request(new VerifyRequest(req.body), (err, result) => {
            if (!!err) {
                next(err);
            } else {
                console.log("===========Verify ctrl============================");
                console.log(req.body);
                console.log(result);
                console.log("==================================================");
                if (req.body.shortUrl.substring(0, 1) == 'c') {
                    res.render('share-cert', {
                        data: result
                    });
                } else {
                    res.render('verify', {
                        data: result
                    });
                }
            }
        });
    }
}