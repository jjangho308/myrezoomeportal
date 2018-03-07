import initialize from '../core/initializer'
import managers from '../core/managers'
import PropertyManager from '../modules/property';

describe('Instant test suit', () => {

    it('Initialize managers', () => {
        initialize();
        var property = managers.property();
        assert.equal(property.getProperty(PropertyManager.PUSH_HOST, 'empty'),
            "b-cb8c6e8c-f893-4464-aa69-b3501991ef60-1.mq.ap-southeast-2.amazonaws.com");
    })
});