var Managers = require('../core/managers');

var Env = require('../core/environment');

var GetCertsRequest = require('../modules/client/certs/get_certs_request');
var IssueNewCertRequest = require('../modules/client/certs/issue_cert_request');
var UpdateCertRequest = require('../modules/client/certs/update_cert_request');
var DeleteCertRequest = require('../modules/client/certs/delete_cert_request');

var GetCertViewRequest = require('../modules/client/certs/get_cert_view_request');

var ErrorCode = require('../core/error/error_code');
var ResponseError = require('../core/error/response_error');
var HttpStatusCode = require('../core/error/http_status_code');

/**
 * Controller for /certs URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
module.exports = {

    /**
     * Function to get certificates by given condition. <br />
     * 
     * Ajax Request일때는 주어진 회원 ID가 가지고 있는 모든 증명서 목록을 반환함.
     * Normal Request일때는 증명서 조회 HTML 페이지를 반환한다.
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
                        next(new ResponseError({
                            code: ErrorCode.DATA_NO_EMAIL,
                            status: HttpStatusCode.BAD_REQUEST,
                        }));
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
     * 
     * @updated 180612 원본 데이터를 전달하도록 수정
     */
    getCertView: (req, res, next) => {
        var certId = req.params.certId;
        if (!certId) {
            return next(new ResponseError({
                code: ErrorCode.PARAM_NO_CERT_ID,
                status: HttpStatusCode.BAD_REQUEST,
            }));
        } else {
            req.body.certId = req.params.certId;

            Managers.client().request(new GetCertViewRequest(req.body), (err, certificate) => {
                if (!!err) {
                    next(err);
                } else {
                    res.render('certviewer', certificate);
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
        Managers.client().request(new IssueNewCertRequest(req.body), (err, result) => {
            if (!!err) {
                next(err);
            } else {
                res.json({
                    result: result
                });
            }
        })
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

            if (!arg.certId) {
                return next(new ResponseError({
                    code: ErrorCode.PARAM_NO_CERT_ID,
                    status: HttpStatusCode.BAD_REQUEST,
                }));
            }

            if (!arg.uId) {
                return next(new ResponseError({
                    code: ErrorCode.PARAM_NO_EMAIL,
                    status: HttpStatusCode.BAD_REQUEST,
                }));
            }

            var request = new UpdateCertRequest(arg);
            Managers.client().request(request, (err, result) => {
                if (!!err) {
                    next(err);
                } else if (result > 0) {
                    res.json(new ResponseError({
                        code: ErrorCode.INTERNAL_ERROR,
                        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                    }));
                } else {
                    res.json({
                        result: result
                    });
                }
            });
        } else {
            next(new ResponseError({
                code: ErrorCode.PARAM_AJAX_ONLY,
                status: HttpStatusCode.BAD_REQUEST,
            }));
        }
    },

    /**
     * Get entire subnames. <br />
     * 
     * @since ?
     * @author ?
     */
    getmapping: (req, res, next) => {
        // /certs AJAX request
        Managers.db().getCertDAO().getSubName((err, dbres) => {
            if (!!err) {
                return next(err);
            }
            return res.json(dbres);
        });
    },

    /**
     * Set default certificate. <br />
     * 
     * @since ?
     * @author ?
     */
    setDefault: (req, res, next) => {
        // /certs AJAX request
        if (!!req.xhr) {
            if (!req.body.uId) {
                return next(new ResponseError({
                    code: ErrorCode.PARAM_NO_UID,
                    status: HttpStatusCode.BAD_REQUEST,
                }));
            }

            if (!req.body.txid) {
                return next(new ResponseError({
                    code: ErrorCode.PARAM_NO_TXID,
                    status: HttpStatusCode.BAD_REQUEST,
                }));
            }

            if (!req.body.txid) {
                return next(new ResponseError({
                    code: ErrorCode.PARAM_NO_SUBID,
                    status: HttpStatusCode.BAD_REQUEST,
                }));
            }

            var data = {
                uid: req.body.uId,
                txid: req.body.txid,
                subid: req.body.subid
            };

            Managers.db().getRecordDAO().setDefaultYn(data, (err, result) => {
                if (!err) {
                    next(err);
                } else {
                    res.json(result);
                }
            });
        }
    },


    deleteCert: (req, res, next) => {
        if (!req.params.certId) {
            return next(new ResponseError({
                code: ErrorCode.PARAM_NO_CERT_ID,
                status: HttpStatusCode.BAD_REQUEST,
            }));
        }

        var data = {
            uId: req.body.uId,
            certId: req.params.certId
        };

        Managers.client().request(new DeleteCertRequest(data), (err, result) => {
            if (!!err) {
                next(err);
            } else {
                res.json({
                    result: result
                });
            }
        });
    }
}