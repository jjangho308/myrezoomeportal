import managers from '../core/managers';
import assert from 'assert';
import initialize from '../core/initializer';

describe.skip('Module Test', ()=>{
    before('Module test init', () => {
        Initializer();
    })
    
    it('Module singleton test', ()=>{
        var push1 = managers.push;
        var push2 = managers.push;

        assert.deepEqual(push1, push2);
    })
})