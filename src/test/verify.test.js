import chai from 'chai';
import chaihttp from 'chai-http';

import Initializer from '../core/initializer';

/**
 * Test suit for Verification feature. <br />
 * 
 * @since 180509
 * @author TACKSU
 */
describe('Verification page test suit', () => {

    /**
     * Prepare test scenaio. <br />
     */
    before('Initialization', () => {
        Initializer(Initializer.FROM_UNITTEST);
        chai.use(chaihttp);
    });

    /**
     * Test case for verification html page without password. <br />
     * 
     * @since 180509
     * @author TACKSU
     */
    it('Verification', done => {
        var shortUrl = '';
        chai.request(app)
            .get('/v/' + shortUrl)
            .set('Accept', 'text/html')
            .send()
            .end((err, res) => {
                console.log(err.toString());

                if (!!res) {
                    done();
                }
            });
    });

    /**
     * Test case for verification html page with password. <br />
     * 
     * @since 180509
     * @author TACKSU
     */
    it('Verification with password', done => {
        var shortUrl = '';
        chai.request(app)
            .get('/v/' + shortUrl)
            .set('Accept', 'text/html')
            .send()
            .end((err, res) => {
                console.log(err.toString());

                if (!!res) {
                    done();
                }
            });
    });
});