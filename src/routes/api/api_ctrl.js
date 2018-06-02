import Managers from '../../core/managers'
import ApiRequest from '../../modules/api/common/api_request'

import v1Container from './api_container';

/**
 * Controller function for '/api' Router.
 * 
 * @since 180509
 * @author TACKSU
 * 
 */
var apiController = (req, res, next) => {
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

    // API Command가 없을 경우 에러 처리
    if (!apiController[version][command]) {
        next({
            err: {
                code: 200,
                msg: 'No API command exists'
            }
        });
    }

    apiController[version][command](req, res, next);
};

apiController['v1'] = v1Container;

export default apiController;