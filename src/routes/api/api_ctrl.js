var Managers = require('../../core/managers');
var ApiRequest = require('../../modules/api/common/api_request');
var v1Container = require('./apiv1_container');

var ErrorCode = require('../../core/error/error_code');
var ResponseError = require('../../core/error/response_error');
var HttpStatusCode = require('../../core/error/http_status_code');

module.exports = (() => {
    var apiContainer = {
        'v1': v1Container
    }

    /**
     * Controller function for '/api' Router.
     * 
     * @since 180509
     * @author TACKSU
     * 
     */
    return (req, res, next) => {
        var version = req.params.version || 'v1';
        var command = req.params.command;
        if (!command) {
            return next(new ResponseError({
                code : ErrorCode.API_NO_CMD,
                status : HttpStatusCode.BAD_REQUEST,
            }));
        }

        // API Version이 없는 경우
        if (!apiContainer[version]) {
            return next(new ResponseError({
                code : ErrorCode.API_VERSION_INVALID,
                status : HttpStatusCode.NOT_FOUND,
            }));
        }

        // API Command가 없을 경우 에러 처리
        if (!apiContainer[version][command]) {
            return next(new ResponseError({
                code : ErrorCode.API_NO_CMD,
                status : HttpStatusCode.BAD_REQUEST,
            }));
        }

        return apiContainer[version][command](req, res, next);
    }
})();