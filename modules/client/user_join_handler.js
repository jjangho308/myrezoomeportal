import managers from '../../core/managers';
import AbstractClientRequestHandler from './abstract_clientrequest_handler';

/**
 * 사용자 로그인 요청 핸들러.
*/
class UserJoinRequestHandler extends AbstractClientRequestHandler {
    constructor(opt) {
        super(opt);
    }

    /**
     * 
     * @param {UserJoinRequest} clientReq 
     * @param {UserJoinResponse} clientRes
     */
    process(clientReq, clientRes) {
        
        // 1. 사용자 정보를 DB에 입력
        managers.database().setUserInfo(clientReq, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                // 사용자 정보 업데이트 == 가입 완료
                
            }
        });
    }
}

export default UserJoinRequestHandler;

