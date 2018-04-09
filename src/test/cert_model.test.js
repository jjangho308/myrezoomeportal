import Initializer from '../core/initializer';
import Managers from '../core/managers';
import Util from '../util/util';

import CertModel from '../models/cert/cert';
import SharedCertModel from '../models/cert/shared_cert';
import CertDAO from '../dao/cert_dao';

/**
 * Test suit for Certificate model. <br />
 * 
 * @since 180328
 * @author TACKSU
 */
describe('Certficiate Model DAO test suite.', () => {

    var certDAO = new CertDAO();

    before('Service initialization', () => {
        Initializer();
        certDAO = Managers.db().getCertDAO();
    })

    it('Certificate issue  & get test case', done => {
        var certModel = new CertModel({
            certId: Util.uuid(),
            uId: 1,
            blcMapId: Util.uuid(),
            shared: false,
            deleted: false
        })

        certDAO.issueCert(certModel, (err, insertId) => {
            certDAO.getCert({
                certId: certModel.certId
            }, (err, certModels) => {
                if (!!err) {
                    console.log(err.toString());
                } else {
                    if (certModel.certId == certModels[0].certId) {
                        done();
                    }
                }
            })
        })
    })

    it('Update certitificate model test', done => {
        var orig = Util.uuid();
        var updated = Util.uuid();
        var certModel = new CertModel({
            certId: Util.uuid(),
            uId: 1,
            blcMapId: orig,
            shared: false,
            deleted: false
        })

        certDAO.issueCert(certModel, (err, insertId) => {
            certModel.blcMapId = updated;

            certDAO.setCert({
                certId: certModel.certId
            }, certModel, (err, affectedRows) => {
                if (!!err) {
                    console.log(err.toString());
                } else if (affectedRows > 0) {
                    done();
                }
            })
        })
    })

    it('SharedCertModel Put & Get test case', done => {
        var sharedModel = new SharedCertModel({
            uId: 1,
            certId: Util.uuid(),
            encryptedData: Util.uuid(),
        })

        certDAO.shareCert(sharedModel, (err, insertId) => {
            certDAO.getShared({
                sId: insertId
            }, (err, SharedCertModelList) => {
                for (var i in SharedCertModelList) {
                    if (sharedModel.certId == SharedCertModelList[i].certId) {
                        done();
                    }
                }
            })
        })

    });

    it('Search shared model data by userId', done => {
        certDAO.getShared({
            uId: 1,
        }, (err, sharedModels) => {
            if (!!err) {
                console.log(err.toString());
            } else if (sharedModels.length > 0)
                done();
        });
    });

    it.skip('Search shared model data by certId', done => {
        var certDAO = Managers.db().getCertDAO();
        certDAO.getCert({
            certId: '51a65916-f2c2-45fc-af60-ad82ca341d4a'
        }, (err, searchedSharedCertModels) => {
            if (!!err) {
                console.log(err.toString());
            } else if (searchedSharedCertModels.length > 0)
                done();
        });
    });

    it('Update shared model', done => {
        var originData = Util.uuid();
        var updatedData = Util.uuid();

        var sharedModel = new SharedCertModel({
            uId: 1,
            certId: Util.uuid(),
            encryptedData: originData,
        })

        certDAO.shareCert(sharedModel, (err, insertId) => {
            certDAO.getShared({
                sId: insertId
            }, (err, foundModels) => {
                var searchedModel = foundModels[0];
                if (!!err) {
                    console.log(err.toString());
                } else {
                    searchedModel.encryptedData = updatedData;
                    certDAO.setShared({
                        sId: insertId
                    }, searchedModel, (err, affectedRows) => {
                        if (!!err) {
                            console.log(err.toString());
                        } else if (affectedRows > 0) {
                            certDAO.getShared({
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