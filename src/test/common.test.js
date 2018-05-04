import assert from 'assert';

import managers from '../core/managers';

/**
 * Instance test suit. <br />
 * 
 * @author TACKSU
 */
describe('Instant test suit', () => {

    before('Instant test init', () => {
        process.env.NODE_ENV = 'development';
    })

    it.skip('Initialize managers', () => {
        managers.property().init();
        managers.db().init();
    });

    it('Error log test case.', done=>{
        var asdf = undefined;
        console.log(asdf.asdf);
    })
});