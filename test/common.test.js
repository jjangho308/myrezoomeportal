import assert from 'assert';

import initialize from '../core/initializer';
import managers from '../core/managers';
import PropertyManager from '../modules/property/property';

import sample from './sample.js';

describe.skip('Instant test suit', () => {

    before('Instant test init', () => {
        Initializer();
    })

    it('Initialize managers', () => {
        var property = managers.property();
        assert.equal(property.get(PropertyManager.PUSH_HOST, 'empty'),
            "b-cb8c6e8c-f893-4464-aa69-b3501991ef60-1.mq.ap-southeast-2.amazonaws.com");
    })

    it('Singleton test', () => {
        var property1 = managers.property();
        var property2 = sample.property;

        assert.deepStrictEqual(property1, property2);
    })
});