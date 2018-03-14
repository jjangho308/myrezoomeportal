'use strict';var _managers = require('../core/managers');var _managers2 = _interopRequireDefault(_managers);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe.skip('User Login Test Suit', function () {

    before('init', function () {

    });

    it('TC#1 login', function (done) {
        var clientReq = {};
        clientReq.userid = "honggildong";
        clientReq.password = "1234";

        // 1. 사용자 정보를 DB에서 조회
        _managers2.default.db().getUserInfo(clientReq.userid, function (res) {
            // 사용자 유저 존재
            if (!!res) {
                // 비밀번호 확인
                if (clientReq.password === res[0].PASSWORD) {
                    // 토큰 생성
                    var userInfo = {};
                    userInfo.userid = clientReq.userid;
                    userInfo.timestamp = "2018-03-08";
                    var tokenvalue = _managers2.default.token().generateToken(userInfo);

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
                    console.log("login fail::mismatch password");
                    done();
                }
            } else {
                // 사용자 유저 없음
                // res.send("login fail::id not exist");
                console.log("login fail::id not exist");
                done();
            }
        });
    });

    after('', function (done) {

    });

});
//# sourceMappingURL=user_login_handler.test.js.map