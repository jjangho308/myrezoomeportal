var Managers = require('../../core/managers');
var ApiRequest = require('../../modules/api/common/api_request');
var v1Container = require('./apiv1_container');

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
            next({
                err: {
                    code: 200,
                    msg: 'API command is null'
                }
            });
        }

        // API Version이 맞지 않은 경우
        if (!apiContainer[version]) {
            next({
                err: {
                    code: 200,
                    msg: 'API version is not valid'
                }
            });
        }

        // API Command가 없을 경우 에러 처리
        if (!apiContainer[version][command]) {
            next({
                err: {
                    code: 200,
                    msg: 'No API command exists'
                }
            });
        }

        apiContainer[version][command](req, res, next);
    }
})();