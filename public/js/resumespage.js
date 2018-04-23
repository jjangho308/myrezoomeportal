$(document).ready(function(){

    //get client token
    client_token = getCookie("JWT");
    client_authorization = 'Bearer ' + client_token;

    $('#header-myresume').css({ "border": "none", "font-weight": "normal" });
    $('#header-mycert').css({ "border": "none", "font-weight": "normal" });
    $('#header-resume-store').css({ "border-bottom": "solid 5px #4c80f1", "font-weight": "bold" });

    $('#header-mycert').click(function () {
        window.location = "certs";
    });

    $('#header-resume-store').click(function () {
        window.location = "resumes";
    });

    $('#header-myresume').click(function () {
        window.location = "main";
    });
});