var Managers = require('../../../core/managers');

var ClientRequest = require('../../client/client_request');
var AbstractClientRequestHandler = require('../abstract_client_request_handler');

var Util = require('../../../util/util');
var UserModel = require('../../../models/user/user');

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

    /**
     * Insert UserModel to database. <br />
     * 
     * @since 180410
     * @author PKINGKONG
     * 
     * @param {*} requestEntity 
     * @param {*} cb 
     */
    request(requestEntity, cb) {
        
        var userModel = new UserModel({
            uId: Util.uuid(),
            email: requestEntity.user.email,
            pw: requestEntity.user.pw,
            ci: requestEntity.user.ci,
            familyNameKO: requestEntity.user.familyNameKO,
            firstNameKO: requestEntity.user.firstNameKO,
            fullNameKO: requestEntity.user.fullNameKO,
            birth: requestEntity.user.birth,
            phone: requestEntity.user.phone,
            gender: requestEntity.user.gender,
            carrierName: requestEntity.user.carrierName
        });

        var userDAO = Managers.db().getUserDAO();

        userDAO.put(userModel, (err, insertId) => {
            if (!!err) {
                return cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                return cb(ClientRequest.RESULT_SUCCESS, insertId);
            }
        });
    }
}

module.exports = SignupRequestHandler;