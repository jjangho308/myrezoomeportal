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
            certDao.getByUserID(userId, (err, result) => {
                res.status(200).json(result);
            });
        }
        // HTML page
        else {
            Managers.db().getUserDAO().get({
                userid: userid
            }, (err, userModel) => {
                if (!!err) {
                    res.status(500).render('error');
                } else {
                    res.render('certs', userModel);
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