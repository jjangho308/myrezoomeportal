import app from '../app';

import chai from 'chai';
import chaihttp from 'chai-http';

import Util from '../util/util';
import Managers from '../core/managers';

/**
 * Test suite for ajax command request. <br />
 * 
 * @since 180423
 * @author TACKSU
 */
describe('Common test suite for ajax command request', () => {

    var jwtToken = null;
    before('Service initialize', () => {
        chai.use(chaihttp);
        jwtToken = Managers.token().issueToken({
            uId: 'UID2'
        });
    });

    /**
     * Test case of 'GenerateShortUrl' command. <br />
     * 
     * @since 180423
     * @author TACKSU
     */
    it('GenerateShortUrl command test case', done => {

        chai.request(app)
            .post('/client')
            .set('Content-Type', 'text/html')
            .set('Authorization', 'Bearer ' + jwtToken)
            .send({
                cmd: 'GenerateShortUrl'
            })
            .end((err, res) => {
                if (!!res.body.result) {
                    console.log(res.body);
                    done();
                }
            });
    })
})