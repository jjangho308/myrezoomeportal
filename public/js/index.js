$(document).ready(function () {

    $('#resume-start-btn').click(function () {
        location.href = "/signin";
    });

    $('#resume-start-btn-bottom').click(function () {
        location.href = "/signin";
    });

    $("#index").click(function(){
        location.href = "/";
    });

    $("#index-v-button").click(function(){
        var offset = $(".body-div").offset();
        $('html, body').animate({scrollTop : offset.top}, 400);
        
    }); 

});