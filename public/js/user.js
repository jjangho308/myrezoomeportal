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

        $.ajax({
            type: "POST",  
            url: "/signin",   
            data: param,
            dataType: "JSON",
            success: function(response) {
                console.log(response);
                window.location.href = "main";
            },
            error:function(request, status, error){
                if(request.responseJSON == "USER_IS_NOT_FOUND") {
                    alert("등록된 이메일이 없다.");
                } else if(request.responseJSON == "MISMATCH_PASSWORD") {
                    alert("비밀번호가 일치하지 않는다.");
                }
            }
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
            alert("비밀번호가 다르다.");
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

        $.ajax({
            type: "POST",  
            url: "/signup",   
            data: param,
            dataType: "JSON",
            success: function(response) {
                console.log(response);
                window.location.href = "signin";
            },
            error:function(request, status, error){
                if(request.responseJSON.code == "ER_DUP_ENTRY"){
                    alert("이미 가입된 이메일 정보가 있다.");  
                }
            }
        });
    });
});