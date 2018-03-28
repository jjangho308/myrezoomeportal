import Initializer from '../core/initializer';
import Managers from '../core/managers';
import Util from '../util/util';

import CertModel from '../models/cert/cert';
import CertDAO from '../models/cert/cert_dao';

/**
 * Test suit for Certificate model. <br />
 * 
 * @since 180328
 * @author TACKSU
 */
describe('Certficiate Model DAO test suite.', () => {
    before('Service initialization', () => {
        Initializer();
    })

    it('CertModel Put & Get test case', done => {
        var certModel = new CertModel({
            uid: 30,
            certId: Util.uuid(),
            encryptedData: Util.uuid(),
        })

        var certDao = new CertDAO();
        certDao = Managers.db().getCertDAO();
        certDao.put(certModel, (err, insertId) => {
            certDao.get({
                sid: insertId
            }, (err, certModelList) => {
                for (var i in certModelList) {
                    if (certModel.certId == certModelList[i].certId) {
                        done();
                    }
                }
                Managers.db().end((err) => {
                    console.log(err.toString());
                });
            })
        })
    })


    it.skip('Search CertModel data by user id', done => {
        var CertDAO = Managers.db().getCertDAO();
        certDAO.get({
            uid: 30
        }, (err, searchedCertModels) => {
            for (var i in searchedCertModels) {

            }
            done();
        });
    })

    after('Close database connection', () => {})
});