$(document).ready(function () {

    var KEY_CODE_RETURN = 13;
    // var situation = 1;

    // $(".confirm-btn").click(function () {

    // 	if (situation == 1) {
    // 		$("input").css("border", "solid 1px #f59188");
    // 		$(".error-message").css("display", "block");
    // 		situation = 0;
    // 	} else {
    // 		$(".before-div").css("display", "none");
    // 		$(".after-div").css("display", "block");
    // 		situation = 1;
    // 	}
    // });


    $('#btn_signin').click(function () {
        if ($('#signin_id').val() == '') {
            $("input").css("border", "solid 1px #f59188");
            $(".error-message").css("display", "block");
            $(".error-message").html("Email ID를 입력하세요.");
            return;
        } else if ($('#signin_pw').val() == '') {
            $("input").css("border", "solid 1px #f59188");
            $(".error-message").css("display", "block");
            $(".error-message").html("패스워드를 입력하세요.");
            return;
        }

        var param = {
            email: $('#signin_id').val(),
            pw: SHA256($('#signin_pw').val())
        };

        $.ajax({
            type: "POST",
            url: "/signin",
            data: param,
            dataType: "JSON",
            beforeSend: function () {
                $(".error-message").hide();
            },
            success: function (response) {
                debugger;
                window.location.href = window.redirectionUrl || "main";
            },
            error: function (jqXhr, status, error) {
                console.error(jqXhr.responseText);

                var error = jqXhr.responseJSON.err;
                error.msg = error.msg || '알 수 없는 오류 발생';
                $("input").css("border", "solid 1px #f59188");
                $(".error-message").html(error.msg);
                $(".error-message").show();

                // switch (error.code) {
                //     case 1:
                //         {
                //             $("input").css("border", "solid 1px #f59188");
                //             $(".error-message").css("display", "block");
                //             $(".error-message").html(error.msg);
                //             break;
                //         }
                //     case 301:
                //         {
                //             $("input").css("border", "solid 1px #f59188");
                //             $(".error-message").css("display", "block");
                //             $(".error-message").html(error.msg);
                //         }
                //     case 303:
                //         {
                //             $("input").css("border", "solid 1px #f59188");
                //             $(".error-message").css("display", "block");
                //             $(".error-message").html(error.msg);
                //             break;
                //         }
                //     default:
                //         {
                //             $("input").css("border", "solid 1px #f59188");
                //             $(".error-message").css("display", "block");
                //             $(".error-message").html(error.code + ' : ' + error.msg);
                //             break;
                //         }
                // }
                // if (response.responseJSON == "USER_IS_NOT_FOUND") {
                //     $("input").css("border", "solid 1px #f59188");
                //     $(".error-message").css("display", "block");
                //     $(".error-message").html("ID를 잘못입력했다.");
                // } else if (response.responseJSON == "MISMATCH_PASSWORD") {
                //     $("input").css("border", "solid 1px #f59188");
                //     $(".error-message").css("display", "block");
                //     $(".error-message").html("PW를 잘못입력했다.");
                // }

                //     $("input").css("border", "solid 1px #f59188");
                // $(".error-message").css("display", "block");
                // $(".error-message").html("뭔가가 잘못됬다");
            }
        });
    });

    $("#signin_div").keydown(function (key) {
        if (key.keyCode === KEY_CODE_RETURN) {
            $('#btn_signin').trigger('click');
        }
    });
});