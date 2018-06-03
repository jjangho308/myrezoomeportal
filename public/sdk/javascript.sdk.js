/**
 * Javascript SDK for Rezoome OAuth API. <br />
 * 
 * @since 180602
 * @author TACKSU
 */
((window) => {
    const ENV_LOC = 0,
        ENV_DEV = 1,
        ENV_PRO = 2;

    var ENVIRONMENT = ENV_LOC;

    const HOST_LOCAL = 'http://localhost:3000',
        HOST_DEV = 'https://dev.rezoome.io',
        HOST_PRO = 'https://rezoome.io';

    var HOST_DOMAIN = HOST_LOCAL;
    // var HOST_DOMAIN = dev ? 'https://dev.rezoome' : 'https://rezoome.io';

    var rezoomeSDK = {
        /**
         * Create Sign in button function. <br />
         * 
         * 버튼을 누르면 핸드폰 번호 login pop을 띄우고
         * 해당 팝업에서 전달된 Data를 donCallback으로 넘겨준다.
         * 
         * @since 180602
         * @author TACKSU
         * 
         * @param {Object} opt
         * @param {String} opt.clientId Client ID.
         * @param {String} opt.clientSecret Secret code of client 3rd-party.
         * @param {String} opt.redirectUri Redirection URI.
         * @param {HTMLElement} opt.container Container element.
         * @param {Function} opt.done Success callback.
         * @param {Function} opt.fail Failure callback.
         * 
         * @return
         */
        createSignInButton: function (opt) {
            var clientId = opt.clientId;
            var clientSecret = opt.clientSecret;
            var redirectUri = opt.redirectUri;
            var doneCallback = opt.done || function (res) {
                console.log("No callback : " + res);
            };

            var failCallback = opt.fail || function (err) {
                console.log("No error callback : " + err);
            };

            if (!opt.container) {
                throw new Error('Container is empty');
                return;
            }
            var signInBtn = document.createElement('button');
            signInBtn.innerHTML = 'Rezoome Sign In';
            signInBtn.addEventListener('click', function (event) {
                window.addEventListener('message', function (postMsg) {
                    doneCallback({
                        refreshToken: postMsg.data.refreshToken,
                        accessToken: postMsg.data.accessToken
                    });
                }, false);

                // Open auth page
                window.open(HOST_DOMAIN + '/oauth2/auth'
                    + '?client_id=' + clientId
                    + '&client_secret=' + clientSecret
                    + 'redirect_uri=' + redirectUri,
                    'auth_pop',
                    'top=200, left=200, width=400, height=500');
            }, false);
            document.getElementById(opt.container).appendChild(signInBtn);
        },

        /**
         * Directly open sign in page on pop-up window. <br />
         * 
         * @since 180603
         * @author TACKSU
         */
        signIn: function (opt) {
            var clientId = opt.clientId;
            var clientSecret = opt.clientSecret;
            var redirectUri = opt.redirectUri;
            var doneCallback = opt.done || function (res) {

            };

            var failCallback = opt.fail || function (err) {

            };

            window.addEventListener("message", function (postMsg) {
                if (!!postMsg.data.result && postMsg.data.result === true) {
                    doneCallback({
                        refreshToken: postMsg.data.refreshToken,
                        accessToken: postMsg.data.accessToken
                    });
                } else {
                    failCallback(postMsg.data);
                }

            }, false);

            // Open auth page
            window.open(HOST_DOMAIN + '/oauth2/auth'
                + '?client_id=' + clientId
                + '&client_secret=' + clientSecret
                + 'redirect_uri=' + redirectUri,
                'auth_pop',
                'top=200, left=200, width=400, height=500');
        }
    }

    window.RZM = window.RZM || rezoomeSDK;
    window.Rezoome = window.Rezoome || rezoomeSDK;
})(window);