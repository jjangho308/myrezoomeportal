import chai from 'chai';
import chaihttp from 'chai-http'

import Initializer from '../core/initializer';

import app from '../app';

import Managers from '../core/managers';

/**
 * Test suite for public API. <br />
 * 
 * @since 180528
 * @author TACKSU
 */
describe('OAuth and Public API test suite', () => {
    var accessToken = null;

    before('Access token initialize', () => {
        Initializer();
        chai.use(chaihttp);
        accessToken = Managers.token().issueOAuthToken(
            'RCCNF0003',
            'UID3'
        );
    });

    /**
     * @since 180604
     * @author TACKSU
     */
    it('Issue certificate and url test case', done => {
        chai.request(app)
            .post('/api/v1/issuecert')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + accessToken)
            .send({
                data: "hello, world!"
            })
            .end((err, res) => {
                if (!!res.body.url) {
                    done();
                }
            });
    });

    /**
     * Test case for OAuth authentication. <br />
     * 
     * @since 180528
     * 
     */
    it.skip('OAuth signin test case', done => {
        chai.request(app)
            .get('/oauth2/token')
            .set('Content-Type', 'application/json')
            .send()
            .end((err, res) => {
                done();
            });
    });

    it.skip('API command failure test case', done => {
        chai.request(app)
            .get('/api/v1/asdfasdf')
            .set('Content-Type', 'application/json')
            .send({
                // JSON Original record.
                data: {

                }
            })
            .end((err, res) => {
                done();
            });
    })

    /**
     * 기관 데이터로부터 원격 데이터를 전달받아 BlockChain에 기록 및 공유 URL 생성하여
     * Response
     */
    it.skip('Issue certificate by given data', done => {
        var apiToken = ''
        chai.request(app)
            .get('/api/v1/issuecert')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + apiToken)
            .send({
                // JSON Original record.
                data: {

                }
            })
            .end((err, res) => {
                done();
            });
    });
});