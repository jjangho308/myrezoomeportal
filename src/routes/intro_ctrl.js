/**
 * Controller for / URI. <br />
 * 
 * @since 180101
 * @author TACKSU
 */
module.exports = {
    get: (req, res, next) => {
        res.status(200).render('index');
    },
}