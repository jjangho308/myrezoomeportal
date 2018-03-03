import managers from '../core/managers'
import assert from 'assert'

describe('Module Test', ()=>{
    it('Module singleton test', ()=>{
        var push1 = managers.push;
        var push2 = managers.push;

        assert.deepEqual(push1, push2);
    })
})