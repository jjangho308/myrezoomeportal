import managers from '../../core/managers';
import AbstractRequestHandler from './abstract_request_handler'

/**
 * 사용자 로그인 요청 핸들러.
*/
class UserJoinRequestHandler extends AbstractRequestHandler {
    constructor(opt) {
        super(opt);
    }

    /**
     * 
     * @param {UserJoinRequest} clientReq 
     * @param {UserJoinResponse} clientRes
     */
    process(clientReq, clientRes) {
        
        // 1. 사용자 정보를 DB에서 조회
        managers.database().getUserInfo(clientReq.userid, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                // 사용자 유저 존재
                if (!!response) {
                    // 비밀번호 확인
                    if (clientReq.password === response.password) {
                        // 토큰 생성
                        tokenInfo = {};
                        tokenInfo.userid = clientReq.userid;
                        tokenInfo.timestamp = current_time;
                        var token = managers.token().generateToken(tokenInfo);

                        var response = {};
                        response.token = token;
                        response.code = 200;
                        response.msg = "login success";
                        res.send(response);
                    } else {
                        // 비밀번호 실패
                        res.send("login fail::mismatch password");
                    }
                } else {
                    // 사용자 유저 없음
                    res.send("login fail::id not exist");
                }
            }
        });
    }
}

export default UserJoinRequestHandler;

