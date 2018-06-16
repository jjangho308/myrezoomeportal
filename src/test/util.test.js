var assert = require('assert');

var util = require('../util/util');

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
    it.skip('SHA256 hash sync function', done => {
        var text = 'helloWorld!';
        var result = '759725001AEE57B4CBF50C83173D7E7EF36970AF51B393BEE2E66170AF6D5101';
        assert.equal(util.sha256(text), result);
    });

    /**
     * @since 180516
     * @author TACKSU
     */
    it.skip('SHA256 hash async function', done => {
        var text = 'helloWorld!';
        var result = '759725001AEE57B4CBF50C83173D7E7EF36970AF51B393BEE2E66170AF6D5101';
        util.sha256(text, (hashed) => {
            if (result == hashed) {
                done();
            }
        });
    }).timeout(5000);

    it('Generate random string test case', ()=>{

        var length = 6,
            prefix = 'hi', 
            suffix = 'end';
        assert.equal(util.randomStr(length).length, length);
        
        length = 12;
        var randomStr = util.randomStr({
            length : length,
            prefix : prefix,
            suffix : suffix
        });
        assert.equal(randomStr.length, length + 5);
        assert(randomStr.startsWith(prefix));
        assert(randomStr.endsWith(suffix));
    })
});