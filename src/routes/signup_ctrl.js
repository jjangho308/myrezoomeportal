import Managers from '../core/managers'
import SignUpRequest from '../modules/client/user/signup_request'

/**
 * Controller for /signup URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
export default {

    get: (req, res, next) => {
        res.render('signup', {});
    },

    post: (req, res, next) => {
        if (!!req.xhr) {
            Managers.client().request(new SignUpRequest(req.body), (err, result) => {
                if (!!err) {
                    res.status(500).json(err);
                } else {
                    res.json(result);
                }
            });
        } else {
            next(new Error("Not found."));
        }
    }

}