import Managers from '../core/managers'

/**
 * Controller for /signin URI. <br />
 * 
 * @since 180321
 * @author TACKSU
 */
export default {

    get: (req, res, next) => {
        res.render('main', {});
    },

    post: (req, res, next) => {
        var token;

        token = Managers.token().issueToken({
            uId: 'UID2'
        });

        
        console.log("UID2 : " + token);
        res.token = token;        
    },

}