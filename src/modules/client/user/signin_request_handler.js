import Managers from '../../../core/managers';

import ClientRequest from '../../client/client_request';
import AbstractClientRequestHandler from '../abstract_client_request_handler';

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
        userDAO.getByEmail({email: requestEntity.user.email}, (err, users) => {                        
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else if(users.length == 0) {
                cb(ClientRequest.RESULT_FAILURE, "USER_IS_NOT_FOUND");
            } else if (users.length > 0 && users[0].pw == requestEntity.user.pw) {
                var token = Managers.token().issueToken({
                    uId: users[0].uId
                });

                cb(ClientRequest.RESULT_SUCCESS, {
                    token: token
                });
            } else if(users.length > 0 && users[0].pw != requestEntity.user.pw) {
                cb(ClientRequest.RESULT_FAILURE, "MISMATCH_PASSWORD");
            } 
        });
    }
}

export default SigninRequestHandler;