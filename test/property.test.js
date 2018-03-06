import crypto from 'crypto';
import assert from 'assert';

import PropertyManager from '../modules/property';

describe('Property test suit', () => {
    var propertyManager;
    before('PropertyManager init', () => {
        propertyManager = new PropertyManager();
        propertyManager.init();
    })

    it('Push Property Test', () => {
        console.log(PropertyManager.PUSH_HOST);
        assert.equal(propertyManager.get(PropertyManager.PUSH_HOST, "EMPTY"),
        'b-cb8c6e8c-f893-4464-aa69-b3501991ef60-1.mq.ap-southeast-2.amazonaws.com');
    })

    it('Set & get test', () => {
        var key = 'key.host';
        var value = 'key.value';
        propertyManager.set(key, value);
        assert.equal(value, propertyManager.get(key, null));
    })

    after('Property file close', () => {

    });
})