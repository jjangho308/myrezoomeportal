import Initializer from '../core/initializer';
import Util from '../util/util';
import OrgDAO from '../models/org/org_dao';
import OrgModel from '../models/org/org';

import Managers from '../core/managers';
import DBManager from '../modules/db/db';

/**
 * Test suit for organization model. <br />
 * 
 * @since 180401
 * @author TACKSU
 * 
 */
describe('Organization model test suite.', () => {
    var orgDAO = new orgDAO();
    before('Service initialization', () => {
        Initializer();
        orgDAO = Managers.db();
    })
});