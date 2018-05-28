import app from '../app';

import Initializer from '../core/initializer';
import Managers from '../core/managers';
import ClientRequestManager from '../modules/client/client_request';

import chai from 'chai';
import chaihttp from 'chai-http';

/**
 * Test suit for /client command request. <br />
 * 
 * @since 180509
 * @author TACKSU
 */
describe('Client request test suite', () => {
    var token = null;

    before('Service init', () => {
        Initializer();
        token = Managers.token().issueToken({
            uId: 'UID2'
        })
        chai.use(chaihttp);
    })

    /**
     * 'GenerateShortURL' command test case. <br />
     * 
     * @since 180509
     * @author TACKSU
     */
    it.skip('Generate ShortURL', done => {

        chai.request(app)
            .post('/client')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Cookie', 'jwt=' + token)
            .send({
                cmd: 'GenerateShortURL',
                args: {
                    prefix: 'c'
                }
            })
            .end((err, res) => {
                if (!!res.body.result) {
                    console.log('ShortURL : ' + res.body.result);
                    done();
                }
            });
    });

    after('Clean up', () => {

    });
})