
var formatter= {
    "RCLPT0005":function viewformatter(record) {
        //opic

        var jsonobject = JSON.parse(record.data);
        console.log("==========OPIC JSON======================");
        console.log(jsonobject);
        console.log("=========================================");

        var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="box-2" />';
            htmldiv = htmldiv + '<label for="box-2"><label/>';
            htmldiv = htmldiv + '<span>'+ jsonobject.date +'</span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/opic.png" alt="">';
            htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>OPIC</p>';
            htmldiv = htmldiv + '<p>'+jsonobject.testid +'</p>';
            htmldiv = htmldiv + '<p>'+jsonobject.grade+'</p>';
            htmldiv = htmldiv + '<button><a href="#spec-change-dialog" rel="modal:open">변경</a></button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';

        
        $('#spec_forign_lang').append(htmldiv);
    },

    "RCCNF0001":function viewformatter(record) {
        //mktest

        var jsonobject = JSON.parse(record.data);
        console.log("==========MK TEST JSON======================");
        console.log(jsonobject);
        console.log("============================================");

        var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="box-2" />';
            htmldiv = htmldiv + '<label for="box-2"><label/>';
            htmldiv = htmldiv + '<span>'+jsonobject.date+'</span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/mktest.png" alt="">';
            htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>매경TEST</p>';
            htmldiv = htmldiv + '<p>'+jsonobject.userid + '</p>';
            htmldiv = htmldiv + '<p>'+jsonobject.grade +' / '+ jsonobject.point0+'</p>';
            htmldiv = htmldiv + '<button><a href="#spec-change-dialog" rel="modal:open">변경</a></button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';

        $('#spec_certification').append(htmldiv);
    },

    "RCOGC0008":function viewformatter(record) {
        //inha

        var jsonobject = JSON.parse(record.data);
        console.log("==========INHA JSON======================");
        console.log(jsonobject);
        console.log("=========================================");

        var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="box-2" />';
            htmldiv = htmldiv + '<label for="box-2"><label/>';
            htmldiv = htmldiv + '<span>' + jsonobject.date +'</span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/t_inha05_400x400.jpg" alt="">';
            htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>인하대학교</p>';
            htmldiv = htmldiv + '<p>'+ jsonobject +'</p>';
            htmldiv = htmldiv + '<p>'+jsonobject +'</p>';
            htmldiv = htmldiv + '<button><a href="#spec-change-dialog" rel="modal:open">변경</a></button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';

        $('#spec_edu_detail').append(htmldiv);
    },

    "RCOGC0009":function viewformatter(record) {
        //inha

        var jsonobject = JSON.parse(record);
        console.log("==========INHA JSON======================");
        console.log(jsonobject);
        console.log("=========================================");

        var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="box-2" />';
            htmldiv = htmldiv + '<label for="box-2"><label/>';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/t_inha05_400x400.jpg" alt="">';
            htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>인하대학교</p>';
            htmldiv = htmldiv + '<p>'+ jsonobject.list +'</p>';
            htmldiv = htmldiv + '<p>'+jsonobject +'</p>';
            htmldiv = htmldiv + '<button><a href="#spec-change-dialog" rel="modal:open">변경</a></button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';

        $('#spec_edu_detail').append(htmldiv);
    },

    "RCLPT0006":function viewformatter(record) {
        //OPIC ENGlish writing

        var jsonobject = JSON.parse(record.data);
        console.log(jsonobject);

        var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="box-2" />';
            htmldiv = htmldiv + '<label for="box-2"><label/>';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/opic.png" alt="">';
            htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>OPIC</p>';
            htmldiv = htmldiv + '<p>English Writing</p>';
            htmldiv = htmldiv + '<p>'+jsonobject +'</p>';
            htmldiv = htmldiv + '<button><a href="#spec-change-dialog" rel="modal:open">변경</a></button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';

        $('#spec_forign_lang').append(htmldiv);
    }
}


function getviewdata(record) {


}

function RCLPT0005() {
    
}