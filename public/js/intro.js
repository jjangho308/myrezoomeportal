$(document).ready(function(){
    $('#intro_login').click(function(){
        window.location.href = "/signin";
    });

    $("#signup").click(function(){
        window.location.href = "/signup";
    });

    $('#btn_login').click(function(){

        if($('#input_id').val() == '') {
            alert("id empty");
            return;
        } else if($('#input_pw').val() == '') {
            alert("pw empty");
            return;
        }

        var user_email = $('#input_id').val();        
        var user_password = SHA256($('#input_pw').val());

        var param = {
            email: user_email,
            password: user_password
        }

        $.post("/signin", param ,function (result) {
            console.log(result);
            window.location.href = "main";
        });

        $.post("/signup", param ,function (result) {
            console.log(result);
            window.location.href = "signin";
        });
        
    });
});