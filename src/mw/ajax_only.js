var ErrorCode = require('../core/error/error_code');
var ResponseError = require('../core/error/response_error');
var HttpStatusCode = require('../core/error/http_status_code');

/**
 * Middleware to filter ajax only request. <br />
 * 
 * @since 180618
 * @author TACKSU
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
    if (!!req.ajax) {
        return next();
    } else {
        return next(new ResponseError({
            code: ErrorCode.PARAM_AJAX_ONLY,
            status: HttpStatusCode.BAD_REQUEST,
        }));
    }
}