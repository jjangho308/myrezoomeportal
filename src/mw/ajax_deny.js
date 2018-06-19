var ErrorCode = require('../core/error/error_code');
var ResponseError = require('../core/error/response_error');
var HttpStatusCode = require('../core/error/http_status_code');


/**
 * Middleware to deny ajax request. <br />
 * 
 * @since 180618
 * @author TACKSU
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
    if (!!req.xhr) {
        next(new ResponseError({
            code: ErrorCode.PARAM_AJAX_DENY,
            status: HttpStatusCode.BAD_REQUEST,
        }));
    } else {
        next();
    }
}