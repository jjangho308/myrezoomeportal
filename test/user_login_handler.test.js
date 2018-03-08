import managers from '../core/managers';

describe('user login process Test Suit', function () {

    before('init', () => {

    })

    it('TC#1 login', done => {
        var clientReq = {};
        clientReq.userid = "honggildong";
        clientReq.password = "1234";

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
                    // res.send(response);

                    console.log(response);
                    done();
                } else {
                    // 비밀번호 실패
                    // res.send("login fail::mismatch password");
                }
            } else {
                // 사용자 유저 없음
                // res.send("login fail::id not exist");
            }
            //}).timeout(10000);
        });
    });

    after('', done => {

    })

});