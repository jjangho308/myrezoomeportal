import Managers from '../../core/managers';
import UserDao from '../../dao/user_dao';

import UserModel from '../../models/user/user';

import Util from '../../util/util';

/**
 * Controller for '/oauth2' URI. <br />`
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
            Managers.db().getUserDAO().getByPhone(phone, (err, users) => {
                if (!!err) {
                    next(err);
                } else if (users.length == 0) {
                    res.send({});
                } else if (users.length > 0) {
                    res.send({
                        status: users[0].status == 'L' ? 1 : 2
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
                pw: Util.sha256(Util.randomStr(8)),
                status: 'L'
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
     * Lite sign in with phone number and ci. <br />
     * 
     * @since 180530
     * @author TACKSU
     */
    signin: (req, res, next) => {
        var clientId = req.body.client_id,
            clientSecret = req.body.client_secret,
            phone = req.body.phone,
            ci = req.body.ci;

        if (!phone) {
            // TODO Invalid parameter. 
            // } else if (!ci) {
            //     // TODO Invalid parameter.
        } else {
            Managers.db().getUserDAO().get({
                phone: phone
            }, (err, userModels) => {
                if (!!err) {
                    next(err);
                } else {
                    res.send({
                        code: Buffer.from(Managers.token().issueToken({
                            clientId: clientId,
                            uId: userModels[0].uId
                        })).toString('base64')
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
        var clientId = req.query.client_id,
            clientSecret = req.query.client_secret,
            responseType = req.query.response_type,
            state = req.query.state,
            redirectUri = req.query.redirect_uri;

        if (!clientId) {
            // TODO Invalid parameter
        }

        if (!clientSecret) {
            // TODO Invalid parameter
        }

        if (!responseType) {
            // TODO Invalid parameter
        }

        if (!redirectUri) {
            // TODO Invalid parameter
        }

        res.render('oauth/auth', {
            // TODO Change to real client name
            client_id: clientId,
            client_secret: clientSecret,
            client_name: "매경 TEST",
            response_type: responseType,
            state: state,
            redirect_uri: redirectUri
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
        var grantType = req.body.grant_type,
            authCode = req.body.code,
            clientId = req.body.client_id,
            clientSecret = req.body.client_secret,
            redirectUri = req.body.redirect_uri;

        var tokenManager = Managers.token();

        var refreshToken = null;
        var accessToken = null;

        // 코드가 있는 경우에는 refresh_token과 access_token을 모두 발급하여 전달
        if (!!authCode) {
            try {
                authCode = tokenManager.verify(Buffer.from(authCode, 'base64').toString('utf-8'));
            } catch (e) {
                // Invalid json string.
                next(e);
                return;
            }

            refreshToken = tokenManager.issueRefreshToken(authCode.clientId, authCode.data.uId);
            accessToken = tokenManager.issueOAuthToken(authCode.clientId, authCode.data.uId);

            res.send({
                refresh_token: refreshToken,
                access_token: accessToken,
                expires_in: 4320
            });
            return;

            // Refresh token 가지고 access token만 재발급 하는 경우
        } else {
            refreshToken = req.body.refresh_token;
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
                        access_token: oauthToken
                    });
                }
            }
        }
    }
};

export default (req, res, next) => {
    if (defaultController[req.params.cmd] && defaultController[req.params.cmd] instanceof Function) {
        defaultController[req.params.cmd](req, res, next);
    } else {
        next({
            err: {
                code: 200,
                msg: 'No command found'
            }
        })
    }
};;