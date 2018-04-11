
var formatter= {
    "RCLPT0005":function viewformatter(record) {
        //opic

        var jsonobject = JSON.parse(record.data);
        console.log(jsonobject);

        var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="box-2" />';
            htmldiv = htmldiv + '<label for="box-2"><label/>';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="img/myresume/user-photo@2x.png" alt="">';
            htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>OPIC</p>';
            htmldiv = htmldiv + '<p>'+jsonobject+'</p>';
            htmldiv = htmldiv + '<p>'+record.grade+'</p>';
            htmldiv = htmldiv + '<button><a href="#spec-change-dialog" rel="modal:open">변경</a></button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';

        
        $('#spec_forign_lang').append(htmldiv);
    },

    "RCCNF0001":function viewformatter(record) {
        //mktest

        var jsonobject = JSON.parse(record.data);
        console.log(jsonobject);

        var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="box-2" />';
            htmldiv = htmldiv + '<label for="box-2"><label/>';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="img/myresume/user-photo@2x.png" alt="">';
            htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>매경TEST</p>';
            htmldiv = htmldiv + '<p>'+jsonobject[0] + '</p>';
            htmldiv = htmldiv + '<p>'+jsonobject[0].point0+'</p>';
            htmldiv = htmldiv + '<button><a href="#spec-change-dialog" rel="modal:open">변경</a></button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';

        $('#spec_certification').append(htmldiv);
    },

    "RCOGC0008":function viewformatter(record) {
        //inha

        var jsonobject = JSON.parse(record.data);
        console.log(jsonobject);

        var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="box-2" />';
            htmldiv = htmldiv + '<label for="box-2"><label/>';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="img/myresume/user-photo@2x.png" alt="">';
            htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>인하대학교</p>';
            htmldiv = htmldiv + '<p>'+ jsonobject[0] +'</p>';
            htmldiv = htmldiv + '<p>'+jsonobject[0] +'</p>';
            htmldiv = htmldiv + '<button><a href="#spec-change-dialog" rel="modal:open">변경</a></button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';

        $('#spec_edu_detail').append(htmldiv);
    },

    "RCOGC0009":function viewformatter(record) {
        //inha

        var jsonobject = JSON.parse(record.data);
        console.log(jsonobject);

        var htmldiv = '<div class="spec-body">';
            htmldiv = htmldiv + '<div class="spec-left">';
            htmldiv = htmldiv + '<input type="checkbox" id="box-2" />';
            htmldiv = htmldiv + '<label for="box-2"><label/>';
            htmldiv = htmldiv + '<span></span>';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-center">';
            htmldiv = htmldiv + '<img src="img/myresume/user-photo@2x.png" alt="">';
            htmldiv = htmldiv + '<img src="img/myresume/on.png" alt="">';
            htmldiv = htmldiv + '</div>';
            htmldiv = htmldiv + '<div class="spec-right">';
            htmldiv = htmldiv + '<p>인하대학교</p>';
            htmldiv = htmldiv + '<p>'+ jsonobject[0] +'</p>';
            htmldiv = htmldiv + '<p>'+jsonobject[0] +'</p>';
            htmldiv = htmldiv + '<button><a href="#spec-change-dialog" rel="modal:open">변경</a></button>';
            htmldiv = htmldiv + '</div>';
        htmldiv = htmldiv + '</div>';

        $('#spec_edu_detail').append(htmldiv);
    },
}


function getviewdata(record) {


}

function RCLPT0005() {
    
}