import assert from 'assert';

import managers from '../core/managers';
describe('Instant test suit', () => {

    before('Instant test init', () => {
        process.env.NODE_ENV = 'development';
    })

    it('Initialize managers', () => {
        managers.property().init();
        managers.db().init();
    })
});