import Managers from '../core/managers';

import Env from '../core/environment';

import GetCertsRequest from '../modules/client/certs/get_certs_request';
import IssueNewCertRequest from '../modules/client/certs/issue_cert_request';
import UpdateCertRequest from '../modules/client/certs/update_cert_request';
import DeleteCertRequest from '../modules/client/certs/delete_cert_request';

/**
 * Controller for /certs URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
export default {

    /**
     * Function to get certificates by given condition. <br />
     * 
     * @since 180322
     * @author TACKSU
     */
    get: (req, res, next) => {
        // /certs AJAX request
        if (!!req.xhr) {
            Managers.client().request(new GetCertsRequest(req.body),
                (err, result) => {
                    if (!!err) {
                        next(err)
                    } else {
                        res.json({
                            result: result
                        });
                    }
                });
        } else { // /certs HTML page
            var userId = req.body.uId;
            if (!!userId) {
                var userDAO = Managers.db().getUserDAO();
                userDAO.get({
                    uId: userId
                }, (err, userModelList) => {
                    if (!!err) {
                        next(err);
                    } else if (userModelList.length == 0) {
                        next(new Error("No user found"));
                    } else {
                        res.render('certs', userModelList[0]);
                    }
                });
            } else {
                res.render('certs');
            }
        }
    },

    /**
     * Certificate viewer URI controller function. <br />
     * 
     * @since 180419
     * @author TACKSU
     */
    getCertView: (req, res, next) => {
        req.body.certId = req.params.certId;

        Managers.client().request(new GetCertsRequest(req.body), (err, result) => {
            if (!!err) {
                next(err);
            } else {
                /*
                res.json({
                    result: result
                });
                */
                console.log(result);
                res.render('certviewer', result[0]);
            }
        });
    },

    /**
     * Function to create new certificate entity by given arguments. <br />
     * 
     * @since 180322
     * @author TACKSU
     */
    post: (req, res, next) => {
        if (!!req.xhr) {
            Managers.client().request(new IssueNewCertRequest(req.body), (err, result) => {
                if (!!err) {
                    next(err);
                } else {
                    res.json({
                        result: result
                    });
                }
            })
        } else {
            next(new Error('No Page'));
        }
    },

    /**
     * Function to update given certificates. <br />
     * 
     * @since 180322
     * @author TACKSU
     */
    patch: (req, res, next) => {

        if (!!req.xhr) {
            var arg = req.body;
            arg.certId = req.params.certId;
            arg.uId = req.body.uId;

            var request = new UpdateCertRequest(arg);
            Managers.client().request(request, (err, result) => {
                if (!!err) {
                    next(err);
                } else {
                    res.json(result);
                }
            });
        } else {
            next(new Error('No Page'));
        }
    },

    getmapping: (req, res, next) => {
        // /certs AJAX request
        if (!!req.xhr) {
            Managers.db().getCertDAO().getSubName(function (dbres) {
                //console.log(dbres);
                res.json(dbres);
            });
        }
    },

    setDefault: (req, res, next) => {
        // /certs AJAX request
        if (!!req.xhr) {
            var data = {
                uid: req.body.uId,
                txid: req.body.txid,
                subid: req.body.subid
            };

            Managers.db().getRecordDAO().setDefaultYn(data, function (dbres) {
                res.json(dbres);
            });
        }
    },


    deleteCert: (req, res, next) => {
        //
        if (!!req.xhr) {
            var data = {
                uId: req.body.uId,
                certId: req.params.certId
            }

            Managers.client().request(new DeleteCertRequest(data), (err, result) => {
                if (!!err) {
                    next(err);
                } else {
                    res.json(result);
                }
            });
        };
    }
}