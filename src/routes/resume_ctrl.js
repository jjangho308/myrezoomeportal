import Env from '../core/environment';
import Managers from '../core/managers';

/**
 * Controller for /resumes URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
export default {
    get: (req, res, next) => {
        var userId = null;
        if (Env.prouction()) {
            userId = req.params.userId;
        } else {
            userId = 12345;
        }

        // AJAX request
        if (!!req.xhr) {
            var resumeDAO = Managers.db().getResumeDAO();
            resumeDAO.get({
                userId: userId
            }, (err, result) => {
                res.status(200).json(result);
            });
        }
        // HTML page
        else {
            Managers.db().getUserDAO().get({
                userId: userId
            }, (err, userModel) => {
                if (!!err) {
                    res.status(500).render('error');
                } else {
                    res.render('resumes', userModel, (err, html) => {
                        res.send(html);
                    });
                }
            });
        }
    },

    post: (req, res, next) => {

    }
}