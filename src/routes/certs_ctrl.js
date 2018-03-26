import Managers from '../core/managers';

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
     * 
     * @since 180322
     * @author TACKSU
     */
    get: (req, res, next) => {

        var userid = req.params.userid;
        // AJAX request
        if (!!req.xhr) {
            var certDao = Managers.db().getCertDAO();
        }
        // HTML page
        else {
            Managers.db().getUserDAO().get({
                userid: userid
            }, (err, userModel) => {
                res.render('certs', userModel, (err, html) => {
                    res.status(200).send(html);
                })
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
    },

    /**
     * Function to update given certificates. <br />
     * 
     * @since 180322
     */
    patch: (req, res, next) => {
        // TODO Update given certificate 
    }
}