import Managers from '../core/managers';
import UserDao from '../dao/user_dao';

import UserModel from '../models/user/user';

import Util from '../util/util';

/**
 * Controller for '/oauth2' URI. <br />
 * 
 * @since 180528
 * @author TACKSU
 */
var defaultController = {
    /**
     * Check phone number exists. <br />
     * GET method
     * 
     * @since 180529
     * @author TACKSU
     * 
     * @return result : [{
     *      uId(string) : 'rezoome id',
     *      state(number) : [0 : lite, 1 : full]
     * }]
     */
    phone: (req, res, next) => {
        // 핸드폰 번호를 기준으로 사용자를 조회해서 있으면 id를 반환하고
        // 없으면 빈값을 전달하여 기준값으로 삼게 한다.
        var phone = req.query.phone;
        if (!phone) {
            // TODO Invalid paramter exception.
            // next(new InvalidException);
        } else {
            Mangers.db().getUserDAO().getByPhone(phone, (err, users) => {
                if (!!err) {
                    next(err);
                } else {
                    var result = [];
                    for (var user in users) {
                        result.push({

                            // 회원 상태가 L일 경우에만 Lite 회원으로 정립
                            status: user.status == 'L' ? 0 : 1
                        });
                    }
                    res.send({
                        result: result
                    });
                }
            });
        }
    },
    /**
     * Lite sign up with phone number
     * 
     * @since 180529
     * @author TACKSU
     * 
     * @param phone
     * @param ci
     * 
     * @return result : {
     *      id(string) : 
     *      pw(string) : Temporary password of given sign up id
     * }
     */
    litesignup: (req, res, next) => {
        // POST method만 허용
        if ('POST' !== req.method) {
            next({
                err: {}
            });
            return;
        }
        // 핸드폰 번호와 ci값을 기준으로 password 입력 없이
        // 가볍게 sign up 하는 기능
        // 임시 패스워드를 발급하여 가입을 시킴


        var phone = req.body.phone;
        if (!phone) {
            // TODO Invalid parameter exception
        } else {
            Managers.db().getUserDAO().put(new UserModel({
                phone: phone,
                pw: Util.sha256(Util.randomStr(8))
            }), (err, insertId) => {
                if (!!err) {
                    next(err);
                } else {
                    res.send({
                        result: insertId
                    });
                }
            });
        }
    },
    /**
     * Controller function for '/oauth2/auth' URI. <br />
     * Render HTML page to authenticate. <br />
     * 
     * @since 180528
     * @author TACKSU
     * 
     * @param
     * 
     * @return result : {
     *  refresh_token(string) : token for refresh
     * }
     */
    auth: (req, res, next) => {
        var client_id = req.query.client_id;
        var client_secret = req.query.client_secret;
        var response_type = req.query.response_type;

        if (!!client_id) {

        }

        if (!!client_secret) {

        }

        if (!!response_type) {

        }


        res.render('oauth/auth', {
            client_name: "클라이언트 이름",
            response_type: response_type
        });
    },

    /**
     * Controller function to refresh token with refresh_token. <br />
     * GET method
     * 
     * @since 180529
     * @author TACKSU
     * 
     * @param refresh_token
     * 
     * @return result : {
     * }
     */
    token: (req, res, next) => {
        var code = req.query.code;

        var tokenManager = Managers.token();

        var refreshToken = null;
        var accessToken = null;

        // 코드가 있는 경우에는 refresh_token과 access_token을 모두 발급하여 전달
        if (!!code) {
            try {
                code = JSON.parse(Buffer.from(code, 'base64').toString('utf-8'));
            } catch (e) {
                // Invalid json string.
                next(e);
                return;
            }

            refreshToken = tokenManager.issueRefreshToken(code.partyId, code.uId);
            accessToken = tokenManager.issueOAuthToken(code.partyId, code.uId);
            res.send({
                result: {
                    refresh_token: refreshToken,
                    access_token: accessToken
                }
            });
            return;

            // Refresh token 가지고 access token만 재발급 하는 경우
        } else {
            refreshToken = req.query.refresh_token;
            if (!refreshToken) {
                // TODO Invalid parameter error.
            }

            var refreshData = null;
            try {
                refreshData = tokenManager.verify(refreshToken).data
            } catch (e) {
                // TODO Refresh token expired errors
                next(e);
                return;
            } finally {

            }

            if (!!refreshData) {
                var uId = refreshData.uId;
                var oauthToken = tokenManager.issueOAuthToken(uId);
                if (!!oauthToken) {
                    res.send({
                        result: {
                            access_token: oauthToken
                        }
                    });
                }
            }
        }
    }
};

export default (req, res, next) => {
    defaultController[req.params.cmd](req, res, next);
};;