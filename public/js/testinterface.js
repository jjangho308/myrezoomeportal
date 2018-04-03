function certgettest() {
    
    $.ajax({url: "/certs/", success: function(result){
        console.log(result);
    }});
}