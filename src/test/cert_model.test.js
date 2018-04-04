import Initializer from '../core/initializer';
import Managers from '../core/managers';
import Util from '../util/util';

import CertModel from '../models/cert/cert';
import CertDAO from '../dao/cert_dao';

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
            uId: 30,
            certId: Util.uuid(),
            encryptedData: Util.uuid(),
        })

        //var certDao = new CertDAO();
        var certDao = Managers.db().getCertDAO();
        certDao.put(certModel, (err, insertId) => {
            certDao.get({
                sId: insertId
            }, (err, certModelList) => {
                for (var i in certModelList) {
                    if (certModel.certId == certModelList[i].certId) {
                        done();
                    }
                }
            })
        })
    });

    it('Search certificate model data by userId', done => {
        var certDAO = Managers.db().getCertDAO();
        certDAO.get({
            uId: 30,
        }, (err, searchedCertModels) => {
            if (!!err) {
                console.log(err.toString());
            } else if (searchedCertModels.length > 0)
                done();
        });
    });

    it('Search certificate data by certId', done => {
        var certDAO = Managers.db().getCertDAO();
        certDAO.get({
            certId: '51a65916-f2c2-45fc-af60-ad82ca341d4a'
        }, (err, searchedCertModels) => {
            if (!!err) {
                console.log(err.toString());
            } else if (searchedCertModels.length > 0)
                done();
        });
    });

    it('Update Certificate model', done => {
        var certDAO = new CertDAO();
        certDAO = Managers.db().getCertDAO();
        var originData = Util.uuid();
        var updatedData = Util.uuid();

        var certModel = new CertModel({
            uId: 30,
            certId: Util.uuid(),
            encryptedData: originData,
        })

        certDAO.put(certModel, (err, insertId) => {
            certDAO.get({
                sId: insertId
            }, (err, foundModels) => {
                var searchedModel = foundModels[0];
                if (!!err) {
                    console.log(err.toString());
                } else {
                    searchedModel.encryptedData = updatedData;
                    certDAO.set({
                        sId: insertId
                    }, searchedModel, (err, affectedRows) => {
                        if (!!err) {
                            console.log(err.toString());
                        } else if (affectedRows > 0) {
                            certDAO.get({
                                sId: insertId
                            }, (err, foundModel) => {
                                if (!!err) {
                                    console.log(err.toString());
                                } else if (foundModel[0].encryptedData == updatedData) {
                                    done();
                                }
                            })
                        }
                    })
                }
            })
        })
    });

    after('Close database connection', () => {})
});