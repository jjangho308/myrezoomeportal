import Managers from '../../../core/managers';

import ClientRequest from '../../client/client_request';
import AbstractClientRequestHandler from '../abstract_client_request_handler';

import Util from "../../../util/util";
import UserModel from '../../../models/user/user';

/**
 * Handler of SigninRequestEntity. <br />
 * 
 * @since 180410
 * @author TACKSU
 */
class SignupRequestHandler extends AbstractClientRequestHandler {

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
        var userModel = new UserModel({
            uId : Util.uuid(),
            email : requestEntity.user.email,
            pw : requestEntity.user.pw,
            ci : requestEntity.user.ci,
            familyNameKO : requestEntity.user.familyNameKO,
            firstNameKO : requestEntity.user.firstNameKO,
            fullNameKO : requestEntity.user.fullNameKO,
            birth : requestEntity.user.birth,
            phone : requestEntity.user.phone,
            gender : requestEntity.user.gender,
            carrierName : requestEntity.user.carrierName
        });

        var userDAO = Managers.db().getUserDAO();

        userDAO.put(userModel, (err, insertId) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                cb(ClientRequest.RESULT_SUCCESS, insertId);
            }
        });
    }
}

export default SignupRequestHandler;