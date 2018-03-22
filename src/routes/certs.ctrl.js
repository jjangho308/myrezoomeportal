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
     * Accept : text/html : Rendered as static html page.
     * Accept : application/json -> Rendered as JSON string.
     * 
     * @since 180322
     * @author TACKSU
     */
    get: (req, res, next) => {
        var accept = req.get('Accept');
        if (!!req.xhr) {

        } else {
            var userData = null;

            res.render('certs', userData, (err, html) => {
                res.status(200).send(html);
            })
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