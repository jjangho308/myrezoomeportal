var managers = require('../core/managers');
var assert = require('assert');
var initialize = require('../core/initializer');

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