const USER_STATUS_NONE = 0,
    USER_STATUS_LITE = 1,
    USER_STATUS_FULL = 2;

const AJAX_URL = '/oauth2';

/**
 * Issue token with authentication code by ajax. <br />
 */
function issueToken(opt) {
    var code = opt.code;
    $.ajax({
        url: AJAX_URL + '/token',
        type: 'POST',
        data: {
            code: code,
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret
        },

        /**
         * 성공 시 Opener window에 Refresh token 및 access token 전송
         */
        success: function (res) {
            window.opener.postMessage({
                refreshToken: res.refresh_token,
                accessToken: res.access_token
            }, '*');
            setTimeout(function () {
                window.close();
            }, 0);
        },

        /**
         * 실패시에는 Alert으로 에러 발생
         */
        failure: function (err) {
            alert(err);
        }
    });
}

/**
 * If user is existed.
 */
var userStatus = USER_STATUS_NONE;

$(document).ready(function () {
    //$("#oauth_signin").submit(event => {
    $("#btn_phone_check").click(function (event) {
        //alert("####");

        event.stopPropagation();
        event.preventDefault();

        switch (userStatus) {
            case USER_STATUS_NONE: {
                var phone = $('#input_phone').val();
                if (!phone) {
                    alert('핸드폰 번호를 입력해 주세요.');
                    return;
                }
                $.ajax({
                    url: AJAX_URL + '/phone',
                    type: 'GET',
                    data: {
                        phone: phone,
                    },
                    success: function (res) {
                        userStatus = res.status;

                        // Lite user로 확인될 경우 signin 진행
                        switch (userStatus) {
                            case USER_STATUS_LITE:
                                {
                                    $.ajax({
                                        url: AJAX_URL + '/signin',
                                        type: 'POST',
                                        data: {
                                            phone: phone,
                                            client_id: clientId,
                                            client_secret: clientSecret,
                                        },
                                        success: res => {                                            
                                            $("#")



                                            issueToken({
                                                code: res.code
                                            });
                                        },
                                        failue: err => {
                                            alert(err);
                                        }
                                    });
                                    break;
                                }
                            case USER_STATUS_FULL:
                                {

                                    break;
                                }
                        }
                    },
                    failure: function (err) {
                        alert(err);
                    }
                });
                break;
            }
        }
        console.log(phone);
    });
});