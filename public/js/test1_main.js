function getRecord() {
    $.ajax({url: "/records/", success: function(result){
        console.log(result);
    }});
}