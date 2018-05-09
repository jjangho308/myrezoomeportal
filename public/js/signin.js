$(document).ready(function () {

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
			$(".error-message").html("ID를 입력해라.");
            return;
        } else if ($('#signin_pw').val() == '') {
            $("input").css("border", "solid 1px #f59188");
			$(".error-message").css("display", "block");
			$(".error-message").html("PW를 입력해라.");
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
            beforeSend: function() {
				$(".error-message").css("display", "none");
            },
            success: function(response) {
                //genRsaKey();
                window.location.href = "main";
            },
            error:function(request, status, error){
                if(request.responseJSON == "USER_IS_NOT_FOUND") {
                    $("input").css("border", "solid 1px #f59188");
					$(".error-message").css("display", "block");
					$(".error-message").html("ID를 잘못입력했다.");
                } else if(request.responseJSON == "MISMATCH_PASSWORD") {
                    $("input").css("border", "solid 1px #f59188");
					$(".error-message").css("display", "block");
					$(".error-message").html("PW를 잘못입력했다.");
				}
				
				$("input").css("border", "solid 1px #f59188");
				$(".error-message").css("display", "block");
				$(".error-message").html("뭔가가 잘못됬다");
            }
        });
    });

    $("#signin_div").keydown(function(key) {
        if (key.keyCode == 13) {            
            $('#btn_signin').trigger('click');
        }
    });

});

