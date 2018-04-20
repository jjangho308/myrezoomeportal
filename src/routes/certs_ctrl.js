import Managers from '../core/managers';

import Env from '../core/environment';

import GetCertsRequest from '../modules/client/certs/get_certs_request';
import IssueNewCertRequest from '../modules/client/certs/issue_cert_request';
import UpdateCertRequest from '../modules/client/certs/update_cert_request';

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
        }

        // /certs HTML page
        else {
            Managers.db().getUserDAO().get({
                uId: req.body.uId
            }, (err, userModel) => {
                if (!!err) {
                    next(err);
                } else {
                    res.render('certs', userModel);
                }
            });
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
                res.json({
                    result: result
                });
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
}