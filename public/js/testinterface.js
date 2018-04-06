function test_getrecords() {
    //이력 조회
    
    $.ajax({url: "/records/", success: function(result){
        console.log(result);
    }});
}

function test_getcerts() {
    //증명서 조회
    $.ajax({url: "/certs/", success: function(result){
        console.log(result);
    }});
}

function test_postcerts() {
    //증명서 생성
    $.post( "/certs/", function( result ) {
        console.log(result);
    });

}

function test_getresumes() {
    //이력서 조회 AJAX
    $.ajax({url: "/resumes/", success: function(result){
        console.log(result);
    }});
}

function test_postresumes() {
    //새 이력서 생성 Ajax
    var insertdata = {
        txid : "a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0",
        record : "abcdefgef"
    }

    $.post( "/resumes", insertdata,function( result ) {
        console.log(result);
    });
}

function test_postsharedresumes() {
    //이력서 공유 생성 Ajax
    $.post( "/shared_resumes", function( result ) {
        console.log(result);
    });
}

function test_postsharedcerts() {
    //증명서 공유 생성 Ajax
    $.post( "/shared_certs", function( result ) {
        console.log(result);
    });
}