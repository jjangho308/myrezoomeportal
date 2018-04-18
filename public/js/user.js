$(document).ready(function () {
    $('#signin').click(function () {
        window.location.href = "/signin";
    });

    $("#signup").click(function () {
        window.location.href = "/signup";
    });

    $('#btn_signin').click(function () {
        if ($('#signin_id').val() == '') {
            alert("id empty");
            return;
        } else if ($('#signin_pw').val() == '') {
            alert("pw empty");
            return;
        }

        var user_email = $('#signin_id').val();
        var user_password = SHA256($('#signin_pw').val());

        var param = {
            email: user_email,
            pw: user_password
        }

        $.post("/signin", param, function (result) {
            console.log(result);
            window.location.href = "main";
        });
    });

    $('#btn_signup').click(function () {        
        if ($('#signup_id').val() == '') {
            alert("id empty");
            return;
        } else if ($('#signup_pw').val() == '') {
            alert("pw empty");
            return;
        }

        var user_email = $('#signup_id').val();
        var user_password = SHA256($('#signup_pw').val());
        var user_password_confirm = SHA256($('#signup_pw_confirm').val());
        var familyname = $('#signup_familyname').val();
        var firstname = $('#signup_firstname').val();
        var gender = $(':radio[name="gender"]:checked').val();
        var birth = $('#signup_birth').val();
        var phone = $('#signup_phone').val();
        var carrier_name = $("#signup_carrierName").val();

        if (user_password != user_password_confirm) {
            alert("비밀번호가 다르다");
            return;
        }

        var param = {
            email: user_email,
            pw: user_password,
            familyNameKO: familyname,
            firstNameKO: firstname,
            fullNameKO: familyname + firstname,
            birth: birth,
            phone: phone,
            gender: gender,
            carrierName: carrier_name
        }

        $.post("/signup", param, function (result) {
            console.log(result);
            window.location.href = "signin";
        });
    });
});