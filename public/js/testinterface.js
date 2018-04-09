function test_getrecords() {
    //이력 조회

    
    $.ajax({
        type: 'POST',
        url: '/client',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVJZCI6IlVJRDIifSwiZXhwIjoxNTIzMjkxNjg5LCJpYXQiOjE1MjMyNDg0ODl9.FyLDUbsElEM6fFZ2CGI9unkwyYXwOZNDf1XU-YiYM80'
        },
        data: JSON.stringify({
            cmd: 'SearchRecord',
            
            args: {
                pkey: 'asdfasdf',
                update: false
            }
            
        }),
        success: function (res) {
            setSocket(res.mid);
            clientsocket_listener();
        },
        contentType: 'application/json',
    });
}

function test_getcerts() {
    //증명서 조회
    $.ajax({
        url: "/certs/",
        success: function (result) {
            console.log(result);
        }
    });
}

function test_postcerts() {
    //증명서 생성
    $.post("/certs/", function (result) {
        console.log(result);
    });

}

function test_getresumes() {
    //이력서 조회 AJAX
    $.ajax({
        url: "/resumes/",
        success: function (result) {
            console.log(result);
        }
    });
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
    $.post("/shared_resumes", function (result) {
        console.log(result);
    });
}

function test_postsharedcerts() {
    //증명서 공유 생성 Ajax
    $.post( "/shared_certs", function( result ) {
        console.log(result);
    });
}