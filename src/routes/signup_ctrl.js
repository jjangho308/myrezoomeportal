var Managers = require('../core/managers');
var SignUpRequest = require('../modules/client/user/signup_request');

var ErrorCode = require('../core/error/error_code');
var ResponseError = require('../core/error/response_error');
var HttpStatusCode = require('../core/error/http_status_code');

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
        res.render('signup-success', {name: req.query.name});
    },

    post: (req, res, next) => {
        if (!!req.xhr) {
            Managers.client().request(new SignUpRequest(req.body), (err, result) => {               
                if (!!err) {
                    res.status(500).json(err);                    
                } else {             
                    return res.set('Set-Cookie', 'JWT=' + result.token)
                        .type('application/json').json(result);       
                    //res.json(result);
                }
            });
        } else {
            next(new Error("Not found."));
        }
    },

    confirm: (req, res, next) => {
        var email = req.body.email;             
        if (!!req.xhr) {
            Managers.db().getUserDAO().getByEmail({email:email}, (err, users) => {
                console.log(users);
                if (!!err) {
                    next(err);
                } else if (users.length == 0) {
                    //res.send({});
                    //res.send(new ResponseError({
                    return next(new ResponseError({
                        code: ErrorCode.DATA_NO_EMAIL,
                        status: HttpStatusCode.SUCCESS,
                    }));
                } else if (users.length > 0) {
                    res.send({
                        code: "200"
                    });
                }
            });
        } else {
            next(new Error("Not found."));
        }
    }

}