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

        var userId = req.params.uId;

        // /certs AJAX request
        if (!!req.xhr) {
            Managers.client().request(new GetCertsRequest(req.body), (err, result) => {
                if (!!err) {
                    res.status(500).render('error', err);
                } else {
                    res.json(result);
                }
            });
        }

        // /certs HTML page
        else {
            Managers.db().getUserDAO().get({
                uId: userId
            }, (err, userModel) => {
                if (!!err) {
                    res.status(500).render('error');
                } else {
                    res.render('certs', userModel, (err, html) => {
                        res.send(html);
                    });
                }
            });
        }
    },

    /**
     * Function to create new certificate entity by given arguments. <br />
     * 
     * @since 180322
     * @author TACKSU
     */
    post: (req, res, next) => {

        // TODO Insert a new Certificate entity into database.

        if (!!req.xhr) {
            Managers.client().request(new IssueNewCertRequest(req.body), (err, result) => {
                if (!!err) {
                    res.json(JSON.stringify(err));
                } else {
                    res.json(result);
                }
            })
        }
    },

    /**
     * Function to update given certificates. <br />
     * 
     * @since 180322
     * @author TACKSU
     */
    patch: (req, res, next) => {

        var arg = req.body;
        arg.certId = req.params.certId;
        arg.uId = req.params.uId;

        var request = new UpdateCertRequest(arg);
        Managers.client().request(request, (err, result) => {
            if (!!err) {
                res.status(500).json(JSON.stringify(err));
            } else {
                res.json(result);
            }
        })
    }
}