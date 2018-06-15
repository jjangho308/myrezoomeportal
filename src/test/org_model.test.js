var Initializer = require('../core/initializer');
var Util = require('../util/util');
var OrgDAO = require('../models/org/org_dao');
var OrgModel = require('../models/org/org');

var Managers = require('../core/managers');
var DBManager = require('../modules/db/db');

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
        orgDAO = Managers.db().getOrgDAO();
    });

    it('Organization get test case', done => {
        orgDAO.get({
            sId: 35
        }, (err, orgModels) => {
            if (!!err) {
                console.log(err.toString());
            } else {
                done();
            }
        })
    })
});