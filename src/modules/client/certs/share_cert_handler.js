import AbstractClientRequestHandler from '../abstract_client_request_handler';

import ClientRequest from '../client_request';

import CertModel from '../../../models/cert/cert';
import SharedCertModel from '../../../models/cert/shared_cert';
import SharedCertUrlModel from '../../../models/cert/shared_cert_url';

import Managers from '../../../core/managers';

/**
 * Handler of ShareCertRequestEntity. <br />
 * 
 * @since 180412
 * @author TACKSU
 */
class ShareCertRequestHandler extends AbstractClientRequestHandler {

    /**
     * Default constructor. <br />
     * @param {*} opt 
     */
    constructor(opt) {
        super(opt);
    }

    /**
     * Encrypt given original record data and store them to database. <br />
     * 
     * @since 180412
     * @author TACKSU
     * 
     * @param {*} requestEntity 
     * @param {*} cb 
     */
    request(requestEntity, cb) {
        console.log(requestEntity);

        var certDAO = Managers.db().getCertDAO();

        certDAO.getShared({
            certId: requestEntity.shared_cert.certid
        }, (err, result) => {
            if (!!err) {
                cb(ClientRequest.RESULT_FAILURE, err);
            } else {
                // 아직 한번도 공유되지 않은 증명서
                if (result == 0) {

                    //SHRD_YN Column Set='Y'
                    certDAO.setCert({
                        certId: requestEntity.shared_cert.certid
                    }, new CertModel({
                        shared: true
                    }), (err, affectedRows) => {
                        if (!!err) {
                            cb(ClientRequest.RESULT_FAILURE, err);
                        } else if (affectedRows == 0) {
                            cb(ClientRequest.RESULT_FAILURE, {
                                code: 0,
                                msg: 'No certificate'
                            });
                        } else if (affectedRows > 0) {
                            certDAO.putShared(new SharedCertModel({
                                url: requestEntity.shared_cert.url,
                                certId: requestEntity.shared_cert.certid,
                                public: requestEntity.shared_cert.public,
                                password: requestEntity.shared_cert.password,
                                expired: requestEntity.shared_cert.exp
                            }), (err, result) => {
                                if (!!err) {
                                    cb(ClientRequest.RESULT_FAILURE, err);
                                } else {
                                    cb(ClientRequest.RESULT_SUCCESS, result);
                                    // var sharedCertUrl = new SharedCertUrlModel({
                                    //     url: requestEntity.shared_cert.url,
                                    //     certId: requestEntity.shared_cert.certid,
                                    //     public: requestEntity.shared_cert.public,
                                    //     password: requestEntity.shared_cert.password,
                                    //     expired: requestEntity.shared_cert.exp
                                    // });

                                    // certDAO.putSharedUrl(sharedCertUrl, (err, result) => {
                                    //     if (!!err) {
                                    //         cb(ClientRequest.RESULT_FAILURE, err);
                                    //     } else {
                                    //         cb(ClientRequest.RESULT_SUCCESS, result);
                                    //     }
                                    // });
                                }
                            });
                        }
                    })
                }
                // 1번 이상 공유된 증명서
                else {
                    certDAO.putShared(new SharedCertModel({
                        url: requestEntity.shared_cert.url,
                        certId: requestEntity.shared_cert.certid,
                        public: requestEntity.shared_cert.public,
                        password: requestEntity.shared_cert.password,
                        expired: requestEntity.shared_cert.exp
                    }), (err, result) => {
                        if (!!err) {
                            cb(ClientRequest.RESULT_FAILURE, err);
                        } else {
                            cb(ClientRequest.RESULT_SUCCESS, result);
                        }
                    });
                }
            }
        });
    }
}

export default ShareCertRequestHandler;