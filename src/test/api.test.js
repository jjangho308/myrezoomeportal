import chai from 'chai';
import chaihttp from 'chai-http'

import initialize from '../core/initializer';
import Managers from '../core/managers';

/**
 * Test suite for public API. <br />
 * 
 * @since 180528
 * @author TACKSU
 */
describe('OAuth and Public API test suite', () => {
    before('Service initialize', () => {

    });

    /**
     * Test case for OAuth authentication. <br />
     * 
     * @since 180528
     * 
     */
    it('OAuth signin test case', done => {
        chai.request(app)
            .get('/oauth2/token')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send()
            .end((err, res) => {
                done();
            });
    });

    /**
     * 기관 데이터로부터 원격 데이터를 전달받아 BlockChain에 기록 및 공유 URL 생성하여
     * Response
     */
    it('Issue certificate by given data', done => {
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
    })
});