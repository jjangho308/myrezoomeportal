! function (_doc) {
    $(_doc).ready(function () {

        $('select').selectize();


        $('.cancel-btn').click(function () {
            $(".close-modal").click();
        });

        $('#alarm-div img').click(function () {
            $("#alarm-div").hide();
        });
    });
}(window.document);