import chai from 'chai'
import chaihttp from 'chai-http';
import Initialize from '../core/initializer';
import Managers from '../core/managers';

import app from '../app';

/**
 * Test suite for OAuth2 service. <br />
 * 
 * @since 180528
 * @author TACKSU
 */
describe('OAuth test suite', () => {

    before('Service initialization', () => {
        Initialize();
        chai.use(chaihttp);
    });

    /**
     * 
     */
    it.skip('OAuth auth page render', done => {

    });


    /**
     * 핸드폰 번호를 기반으로 회원 상태를 체크하는 API test case. <br />
     * 
     * @since 180530
     * @author TACKSU
     */
    it.skip('Phone number check Full member test case', done => {
        chai.request(app)
            .get('/oauth2/phone')
            .set('Content-Type', 'application/json')
            .send({
                phone: '01064749282'
            })
            .end((err, res) => {
                if (!!res.result && result.status == 1)
                    done();
            });
    });

    /**
     * 핸드폰 번호를 기반으로 Lite 회원 상태를 체크하는 API test case. <br />
     * 
     * @since 180530
     * @author TACKSU
     */
    it.skip('Phone number check lite member test case', done => {
        chai.request(app)
            .get('/oauth2/phone')
            .set('Content-Type', 'application/json')
            .send({
                phone: '01067602946'
            })
            .end((err, res) => {
                if (!!res.result && result.status == 0)
                    done();
            });
    });

    /**
     * 핸드폰 번호를 기반으로 Lite 회원 상태를 체크하는 API test case. <br />
     * 
     * @since 180530
     * @author TACKSU
     */
    it.skip('Phone number check no member', done => {
        chai.request(app)
            .get('/oauth2/phone')
            .set('Content-Type', 'application/json')
            .send({
                phone: '01045674567'
            })
            .end((err, res) => {
                if (!!res.result && result.length == 0)
                    done();
            });
    });

    /**
     * Lite signup with phone number<br />
     * 
     * @since 180530
     * @author TACKSU
     */
    it.skip('Lite sign up test case', done => {
        chai.request(app)
            .get('/oauth2/litesignup')
            .set('Content-Type', 'application/json')
            .send({
                phone: '01045454545',
                // ci: 'aslkdflkasjdlkfjk',
                // firstNameKR: '정우',
                // familyNameKR: '박',
                // gender: 'M'
            })
            .end((err, res) => {
                if (!!res.result) {
                    console.log(res.result.uId);
                    done();
                }
            });
    });

    /**
     * OAuth authentication test case. <br />
     * 
     * @since 180530
     * @author TACKSU
     */
    it.skip('Auth test case', done => {
        chai.request(app)
            .get('/oauth2/auth')
            .set('Content-Type', 'application/json')
            .send({
                client_id: 'asdf',
                client_secret: 'secret',
                response_type: 'code'
            })
            .end((err, res) => {
                if (!!res.result) {
                    console.log(res.result.uId);
                    done();
                }
            });
    });

    it.skip('Token refresh test case', done => {
        var code = {
            partyId: 'PT65465456',
            uId: 'UID2'
        };

        code = Buffer.from(JSON.stringify(code), 'utf8').toString('base64');

        chai.request(app)
            .get('/oauth2/token')
            .set('Content-Type', 'application/json')
            .query({
                code: code
            })
            .end((err, res) => {
                if (!!res.body.result) {
                    console.log('Refresh token : ' + res.body.result.refresh_token);
                    console.log('Access token : ' + res.body.result.access_token);
                    done();
                }
            });
    });

    it('Refresh access token test case', done => {
        var refreshToken = Managers.token().issueRefreshToken('PT65465456', 'UID2');

        chai.request(app)
            .get('/oauth2/token')
            .set('Content-Type', 'application/json')
            .query({
                refresh_token: refreshToken
            })
            .end((err, res) => {
                if (!!res.body.result) {
                    console.log('Access token : ' + res.body.result.access_token);
                    done();
                }
            });
    });
});