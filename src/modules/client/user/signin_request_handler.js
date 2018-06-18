var Managers = require('../../../core/managers');

var ClientRequest = require('../../client/client_request');
var AbstractClientRequestHandler = require('../abstract_client_request_handler');

var ResponseError = require('../../../core/error/response_error');
var ErrorCode = require('../../../core/error/error_code');
var HttpErrorCode = require('../../../core/error/http_status_code');

/**
 * Handler of SigninRequestEntity. <br />
 * 
 * @since 180410
 * @author TACKSU
 */
class SigninRequestHandler extends AbstractClientRequestHandler {

    /**
     * Default constructor. <br />
     * 
     * @since 180410
     * @author TACKSU
     * 
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    request(requestEntity, cb) {
        var userDAO = Managers.db().getUserDAO();
        userDAO.getByEmail({
            email: requestEntity.user.email
        }, (err, users) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
                return;
            } else if (users.length == 0) {
                cb(ClientRequest.RESULT_FAILURE, new ResponseError({
                    code: ErrorCode.DATA_NO_EMAIL,
                    status: HttpErrorCode.BAD_REQUEST,
                }));
                return;
            } else if (users[0].pw == requestEntity.user.pw) {
                var token = Managers.token().issueToken({
                    uId: users[0].uId
                });

                cb(ClientRequest.RESULT_SUCCESS, {
                    token: token
                });
                return;
            } else {
                cb(ClientRequest.RESULT_FAILURE, new ResponseError({
                    code: ErrorCode.DATA_PASSWORD_INCORRECT,
                    status: HttpErrorCode.BAD_REQUEST,
                }));
                return;
            }
        });
    }
}

module.exports = SigninRequestHandler;