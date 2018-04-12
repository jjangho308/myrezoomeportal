$(document).ready(function(){
    $('#intro_login').click(function(){
        $('#login_div').css('visibility','visible');
    });

    $('#bt_login').click(function(){
        //$('#login_div').css('visibility','visible');
        //email
        var user_email = $('#input_id').val(); 
        
        var user_password = $('#input_pw').val();

        var param = {
            email: user_email,
            password: user_password
        }

        $.post("/signin", param ,function (result) {
            console.log(result);
            window.location.href = "main";

        });
        
    });
})