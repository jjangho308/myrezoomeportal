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

    var HOST_DOMAIN = dev ? 'https://dev.rezoome';

    window.RZM || window.RZM = 

    return {
        /**
         * Create Sign in button function. <br />
         * 
         * @since 180602
         * @author TACKSU
         * 
         * @param {Object} opt
         * @param {HTMLElement} opt.container
         * @param {Function} done : Success callback function
         * @param {Function} fail : Failure callback function
         * 
         * @return
         */
        createSignInButton: (opt) => {
            var doneCallback = opt.done || ((res) => {

            });

            var failCallback = opt.fail || ((err) => {

            });
            if (!!opt.container) {
                throw new Error('Container is empty');
                return;
            }
            var signInBtn = document.createElement('button');
            signInBtn.value = 'Rezoome Sign In';
            signInBtn.addEventListener(event => {
                window.open(HOST_NAME)
            }, false);
            opt.container.appendChild(signInBtn);

        }
    }
})(window);