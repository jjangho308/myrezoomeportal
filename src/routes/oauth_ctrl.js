/**
 * Controller for '/oauth2' URI. <br />
 * 
 * @since 180528
 * @author TACKSU
 */
export default {

    /**
     * Check phone number exists. <br />
     * 
     * @since 180529
     * @author TACKSU
     * 
     * @return result : {
     *      id(string) : 'rezoome id',
     *      state(number) : [0 : lite, 1 : full]
     * }
     */
    phone: (req, res, next) => {
        // 핸드폰 번호를 기준으로 사용자를 조회해서 있으면 id를 반환하고
        // 없으면 빈값을 전달하여 기준값으로 삼게 한다.

    },

    /**
     * Lite sign up with phone number
     * 
     * @since 180529
     * @author TACKSU
     * 
     * @param ci
     * @param phone
     * @param firstNameKR
     * @param familyNameKR
     * @param gender
     * @param birth
     * 
     * @return result : {
     *      id(string) : 
     *      pw(string) : Temporary password of given sign up id
     * }
     */
    litesignup: (req, res, next) => {
        // 핸드폰 번호와 ci값을 기준으로 password 입력 없이
        // 가볍게 sign up 하는 기능
        // 임시 패스워드를 발급하여 
    },

    /**
     * Controller function for '/oauth2/auth' URI. <br />
     * Render HTML page to authenticate. <br />
     * 
     * @since 180528
     * @author TACKSU
     * 
     * @param
     * 
     * @return result : {
     *  refresh_token(string) : token for refresh
     * }
     */
    auth: (req, res, next) => {
        var client_id = req.params.client_id;
        var client_secret = req.params.client_secret;
        var response_type = req.params.response_type;

        if (!!client_id) {

        }

        if (!!client_secret) {

        }

        if (!!response_type) {

        }


        res.render('oauth/auth', {
            client_name: "클라이언트 이름",
            response_type: response_type
        });
    },

    /**
     * Controller function to refresh token with refresh_token. <br />
     * 
     * @since 180529
     * @author TACKSU
     * 
     * @param refresh_token
     * 
     * @return result : {
     * }
     */
    token: (req, res, next) => {

    }
}