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

        userDAO.get({
            email: requestEntity.email
        }, (err, users) => {
            if (!!err) {
                console.log(err.toString());
            } else if (users.length > 0 && users[0].pw == requestEntity.pw) {
                var token = Managers.token().issueToken({
                    uId: users[0].uId
                });

                cb(ClientRequest.RESULT_SUCCESS, {
                    token: token
                })
            }
        });
    }
}

export default SigninRequestHandler;