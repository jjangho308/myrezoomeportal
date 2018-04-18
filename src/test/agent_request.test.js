import chai from 'chai';
import chaiHttp from 'chai-http';

import assert from 'assert';

import app from '../app';

import Util from '../util/util';

/**
 * Test suite for /agent HTTP Request method. <br />
 * 
 * @since 180418
 * @author TACKSU
 */
describe('Agent channel request test suite.', () => {

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
        chai.request(app)
            .post('/agent')
            .set('Content-Type', 'application/json')
            .send({
                cmd: 'KeyProvision',
                args: {
                    orgId: '100',
                    pubkey: new Buffer('Hello World', 'utf-8').toString('base64')
                }
            })
            .end((err, res) => {
                done();
            });
    });

    after('Terminate server', () => {

    })
});