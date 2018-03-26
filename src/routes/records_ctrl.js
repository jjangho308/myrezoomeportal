import db from '../modules/db/db';

/**
 * Controller for /records URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
export default {
    get: (req, res, next) => {
        var userid = req.params.userid;

        var accept = req.get('accept');
        if ('test/html' == accept) {
            var userDao = db.getUserDao();
            userDao.get(userId, (err, result) => {
                if (!!err) {

                } else {
                    // Render to records.
                    res.render('records', result, (err, html) => {
                        res.send(html);
                    })
                }
            })
        } else if ('application/json' == accept) {
            // TODO 이력 DB를 읽어와서 json으로 render
            var result = null;
            res.status(200).json(result);
        }
    },

    post: (req, res, next) => {

    }
}