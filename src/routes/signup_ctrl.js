var Managers = require('../core/managers');
var SignUpRequest = require('../modules/client/user/signup_request');

/**
 * Controller for /signup URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
module.exports = {

    get: (req, res, next) => {
        res.render('signup', {});
    },

    signup_success: (req, res, next) => {
        res.render('signup-success', {});
    },

    post: (req, res, next) => {
        if (!!req.xhr) {
            Managers.client().request(new SignUpRequest(req.body), (err, result) => {               
                if (!!err) {
                    res.status(500).json(err);                    
                } else {
                    res.json(result);
                }
            });
        } else {
            next(new Error("Not found."));
        }
    }

}