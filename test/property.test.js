import crypto from 'crypto';
import PropertyManager from '../modules/property';

describe('Property test suit', ()=>{
    var propertyManager;
    before('PropertyManager init', ()=>{
        propertyManager = new PropertyManager();
    })


    it('Property test', ()=>{
        console.log(PropertyManager.PUSH_HOST);
    })

    after('Property file close', ()=>{

    });
})