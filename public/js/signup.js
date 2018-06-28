$(document).ready(function () {

    var emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var passwordPattern = new RegExp(/[\w]{8,12}/);
    var phonePattern = new RegExp(/^\d{3}-\d{3,4}-\d{4}$/);
    var confirmPhonePattern = new RegExp(/^\d{6}$/);

    //최상단 체크박스 클릭
    $("#box-all").click(function () {
        //클릭되었으면
        if ($("#box-all").prop("checked")) {
            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 true로 정의
            $("input[name=agreement]").prop("checked", true);
            //클릭이 안되있으면
        } else {
            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 false로 정의
            $("input[name=agreement]").prop("checked", false);
        }
    });

    // $(".signup-button").click(function(){
    //     $("input").css("border", "solid 1px #f59188");
    //     $(".selectize-input").css("border", "solid 1px #f59188");
    //     $(".error-message").css("display", "block");
    //     $(".agreement-div").css("margin-top", "-18px");
    // })

    document.getElementById("confirm-phone-input").addEventListener("input", function (event) {
        if (emailPattern.test($(this).val())) {
            $("input").eq(0).removeClass("input_error");
            //$(".info-message-1").show();
            $(".error-message").eq(0).hide();
            $('button.phone-send')[0].disabled = this.value === "";
        } else {
            $("input").eq(0).addClass("input_error");
            $(".error-message").eq(0).html("EMail 주소가 올바르지 않습니다.");
            $(".error-message").eq(0).show();
        }
    });

    $("#signup_carrierName").on("change", function(){
        if (phonePattern.test($("#signup_phone").val()) && $("#signup_carrierName").val() != "") {            
            $(".phone-send").eq(1).attr("disabled", false);
        } else {
            $(".phone-send").eq(1).attr("disabled", true);
        }
    });

    document.getElementById("signup_phone").addEventListener("input", function (event) {        
        console.log($("#signup_carrierName").val());
        if (phonePattern.test($("#signup_phone").val()) && $("#signup_carrierName").val() != "") {            
            $(".phone-send").eq(1).attr("disabled", false);
        } else {
            $(".phone-send").eq(1).attr("disabled", true);
        }
    });

    document.getElementById("confirm_verify_phone").addEventListener("input", function (event) {        
        if (confirmPhonePattern.test($(this).val())) {            
            $(".phone-confirm").attr("disabled", false);
        } else {
            $(".phone-confirm").attr("disabled", true);
        }
    });   

    document.getElementById("signup_pw").addEventListener("input", function (event) {
        if (this.value.length > 0) {
            if (passwordPattern.test(this.value)) {
                $("input").eq(1).removeClass("input_error");
                $(".error-message").eq(1).hide();
            } else {
                $("input").eq(1).addClass("input_error");
                $(".error-message").eq(1).html("비밀번호는 8자 이상, 12자 이하로 입력해 주십시오.");
                $(".error-message").eq(1).show();
            }
        } else {
            $("input").eq(1).removeClass("input_error");
            $(".error-message").eq(1).hide();
        }
    });

    document.getElementById("signup_pw").addEventListener("blur", function (event) {
        document.getElementById("signup_pw_confirm").value = "";
    });

    document.getElementById("signup_pw_confirm").addEventListener("input", function (event) {
        if (this.value.length > 0) {
            var inputedPassword = document.getElementById("signup_pw").value;
            if (inputedPassword === this.value) {
                $("input").eq(2).removeClass("input_error");
                $(".error-message").eq(2).hide();
            } else {
                $("input").eq(2).addClass("input_error");
                $(".error-message").eq(2).html("비밀번호가 일치하지 않습니다.");
                $(".error-message").eq(2).show();
            }
        } else {
            $("input").eq(2).removeClass("input_error");
            $(".error-message").eq(2).hide();
        }
    });

    /*
    $(".phone-send").click(function (event) {
        var value = $("#confirm-phone-input").val();
        if (!emailPattern.test(value)) {
            $("input").eq(0).addClass("input_error");
            $(".error-message").eq(0).html("EMail 주소가 올바르지 않습니다.");
            $(".error-message").eq(0).show();
            return;
        } else {
            $("input").eq(0).removeClass("input_error");
            $(".error-message").eq(0).hide();
            $(".info-message-1").css("display", "block");

            $(".phone-send").prop("disabled", "true");
            $(".phone-confirm").prop("disabled", false);
        }
    });
    */

    $(".phone-confirm").click(function () {
        $(".info-message-2").css("display", "block");
        $(".agreement-div").css("margin-top", "-18px");
    });

    $('#btn_signup').click(function () {

        $("input").css("border", "solid 1px #ced3d6");
        $(".error-message").css("display", "none");

        if ($('#signup_id').val() == '') {
            $("input").eq(0).addClass("input_error");
            $(".error-message").eq(0).css("display", "block");
            $(".error-message").eq(0).html("ID입력해라");
            return;
        } else if ($('#signup_pw').val() == '') {
            $("input").eq(1).addClass("input_error");
            $(".error-message").eq(1).css("display", "block");
            $(".error-message").eq(1).html("PW입력해라");
            return;
        } else if ($("#signup_carrierName").val() == '') {
            $(".selectize-input").addClass("input_error");
            $(".error-message").eq(3).css("display", "block");
            $(".error-message").eq(3).html("통신사선택하라");
            return;
        }

        var user_email = $('#confirm-phone-input').val();
        var user_password = SHA256($('#signup_pw').val());
        var user_password_confirm = SHA256($('#signup_pw_confirm').val());
        var familyname = $('#signup_familyname').val();
        var firstname = $('#signup_firstname').val();
        var gender = $(':radio[name="gender"]:checked').val();
        var birth = $('#signup_birth').val();
        var phone = $('#signup_phone').val();
        var carrier_name = $("#signup_carrierName").val();

        if (user_password != user_password_confirm) {
            $("input").eq(2).css("border", "solid 1px #f59188");
            $(".error-message").eq(2).css("display", "block");
            $(".error-message").eq(2).html("PW가 다르다");
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
            success: function (response) {
                location.href = "/signup/success?name="+param.fullNameKO;
            },
            error: function (request, status, error) {
                if (request.responseJSON.code == "ER_DUP_ENTRY") {
                    $("input").eq(0).addClass("input_error");
                    $(".error-message").eq(0).css("display", "block");
                    $(".error-message").eq(0).html("이미가입된ID가있다");
                }
            }
        });
    });

    $(".phone-send").eq(0).click(function(){
        var email = $("#confirm-phone-input").val();
        
        $.ajax({
            type: "POST",
            url: "/signup/confirm",
            data: JSON.stringify({email: email}),
            dataType: "JSON",
            success: function (response) {                
                if(!!response.err && response.err.code == "301") {
                    $(".error-message").eq(0).html("이미 등록된 Email 주소입니다.").show();
                } else {
                    
                }
            },
            error: function (request, status, error) {
                if (request.responseJSON.code == "ER_DUP_ENTRY") {
                    $("input").eq(0).addClass("input_error");
                    $(".error-message").eq(0).css("display", "block");
                    $(".error-message").eq(0).html("이미가입된ID가있다");
                }
            },
            contentType: 'application/json'
        });        
    });

    $(".phone-send").eq(1).click(function(){        
        var telecom = $(".item").html();
        var phone = $("#signup_phone").val();        
        console.log(telecom + phone);
    });

})