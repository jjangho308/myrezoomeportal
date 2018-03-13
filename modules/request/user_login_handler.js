import managers from '../../core/managers';
import AbstractClientRequestHandler from './abstract_clientrequest_handler';

/**
 * 사용자 로그인 요청 핸들러.
*/
class UserLoginRequestHandler extends AbstractClientRequestHandler {
    constructor(opt) {
        super(opt);
    }

    /**
     * 
     * @param {UserLoginRequest} clientReq 
     * @param {UserLoginResponse} clientRes
     */
    process(clientReq, clientRes) {
        
        // 1. 사용자 정보를 DB에서 조회
        managers.db().getUserInfo(clientReq.userid, function (res) {
            // 사용자 유저 존재
            if (!!res) {
                // 비밀번호 확인
                if (clientReq.password === res[0].PASSWORD) {
                    // 토큰 생성
                    var userInfo = {};
                    userInfo.userid = clientReq.userid;
                    userInfo.timestamp = "2018-03-08";
                    var tokenvalue = managers.token().generateToken(userInfo);

                    var response = {};
                    response.token = tokenvalue;
                    response.code = 200;
                    response.result = "login success";
                    clientRes.send(response);                    
                } else {
                    // 비밀번호 실패
                    clientRes.send("login fail::mismatch password");                    
                }
            } else {
                // 사용자 유저 없음
                clientRes.send("login fail::id not exist");
            }            
        });
    }
}

export default UserLoginRequestHandler;

