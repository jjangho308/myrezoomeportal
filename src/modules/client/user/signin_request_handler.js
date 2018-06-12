import Managers from '../../../core/managers';

import ClientRequest from '../../client/client_request';
import AbstractClientRequestHandler from '../abstract_client_request_handler';

import ResponseError from '../../../core/error/response_error';
import ErrorCode from '../../../core/error/error_code';

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
                    code: ErrorCode.DATA_NO_USER_ID
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
                    code: ErrorCode.DATA_PASSWORD_INCORRECT
                }));
                return;
            }
        });
    }
}

export default SigninRequestHandler;