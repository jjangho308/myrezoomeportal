var chai = require('chai');
var chaiHttp = require('chai-http');

var assert = require('assert');

var app = require('../app');

var Util = require('../util/util');

var Managers = require('../core/managers');

/**
 * Test suite for /agent HTTP Request method. <br />
 * 
 * @since 180418
 * @author TACKSU
 */
describe('Agent channel request test suite.', () => {

    /**
     * Service Initialization. <br />
     * 
     * @since 180504
     * @author TACKSU
     */
    before('Service initialization.', done => {
        chai.use(chaiHttp);
        done();
    });

    /**
     * Test case of agent authentication. <br />
     * 
     * @since 180418
     * @author TACKSU
     */
    it.skip('Authentication request test code', done => {
        chai.request(app)
            .get('/agent')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send({
                cmd: 'Auth',
                args: {
                    // TOOD auth 용 key 넣을 것
                }
            })
            .end((err, res) => {
                done();
            });
    })

    /**
     * Test case for agent keep alive request. <br />
     * 
     * @since 180418
     * @author TACKSU
     */
    it.skip('Keep Alive request test case', done => {
        chai.request(app)
            .get('/agent')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send({
                cmd: 'KeepAlive',
                args: {
                    // FIXME 아무 의미가 없음
                }
            })
            .end((err, res) => {
                done();
            });
    });

    /**
     * Test case for key provision . <br />
     * RSA publics key provision of specific organization. <br />
     * 
     * @since 180418
     * @author TACKSU
     */
    it('Key Provision test case', done => {
        var keyPair = Managers.crypto().generateRSAKeyPair((err, keyPair) => {
            chai.request(app)
                .post('/agent')
                .set('Content-Type', 'application/json')
                .send({
                    cmd: 'KeyProvision',
                    args: {
                        orgId: 100,
                        pubkey: keyPair.public.toString('base64')
                    }
                })
                .end((err, res) => {
                    if (res.body.result) {
                        done();
                    }
                });
        });
    });

    after('Terminate server', () => {

    })
});