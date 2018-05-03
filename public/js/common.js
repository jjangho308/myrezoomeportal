$(document).ready(function(){   

    $('select').selectize();


    $('.cancel-btn').click(function () {
        $(".close-modal").click();
    });

    $('#alarm-div img').click(function () {
        $("#alarm-div").hide();
    });
});