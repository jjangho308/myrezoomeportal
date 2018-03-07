import managers from '../../core/managers';
import AbstractRequestHandler from './abstract_request_handler'

/**
 * 이력 검색 요청 핸들러.
*/
class UserLoginRequestHandler extends AbstractRequestHandler {
    constructor(opt) {
        super(opt);
    }

    /**
     * 
     * @param {HttpRequest} httpReq 
     * @param {SearchRecordRequest} clientReq 
     */
    process(httpReq, clientReq, res) {
        var queryResult;
        var destination = {
            destination: '',
            "content-type": 'application/json'
        }
        
        // 1. 사용자 정보를 DB에서 조회
        managers.database().getUserInfo(clientReq.userid, function(error, response) {
            if(error) {
                console.log(error);
            } else {
                if(!!response) {
                    // 사용자 유저 존재
                    if(clientReq.password === response.password) {
                        // 비밀번호 확인
                        res.send("login ok");
                    } else {
                        res.send("login fail");
                    }
                } else {
                    // 사용자 유저 없음
                    res.send("user not exist");
                }
            }
        });
    }
}

export default UserLoginRequestHandler;

