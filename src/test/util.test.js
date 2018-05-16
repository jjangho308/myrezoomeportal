import assert from 'assert';

import util from '../util/util';

/**
 * Test suit for Util class. <br />
 * 
 * @since 180516
 * @author TACKSU
 */
describe('Utility class test suit', () => {
    before('Initialization', () => {});

    /**
     * @since 180516
     * @author TACKSU
     */
    it('SHA256 hash sync function', done => {
        var text = 'helloWorld!';
        var result = 'dZclABruV7TL9QyDFz1+fvNpcK9Rs5O+4uZhcK9tUQE=';
        assert.equal(util.sha256(text), result);
    });

    /**
     * @since 180516
     * @author TACKSU
     */
    it('SHA256 hash async function', done => {
        var text = 'helloWorld!';
        var result = 'dZclABruV7TL9QyDFz1+fvNpcK9Rs5O+4uZhcK9tUQE=';
        util.sha256(text, (hashed) => {
            if (result == hashed) {
                done();
            }
        });
    }).timeout(5000);
});