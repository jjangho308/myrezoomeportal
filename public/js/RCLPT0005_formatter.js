/* opic english formatter */
/* RCLPT0005 opic english - table 참조 */

/*
viweable data format
date - 재학기간 or 자격 취득일
logo 
first - 기간명
second - 전공 or 자격명, 횟수
third - 성적

오픽 포맷
{
    "testid": "6A3135824610",
    "phone": "010-0000-0000",
    "lang": "",
    "name": "PARKHUNWOOK",
    "grade": "IM2",
    "date": "20180313"
   }
   */
function getviewdata(record,targetdivid) {
    console.log("RCLPT0005 OPIC");
    
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
        htmldiv = htmldiv + '<p>'+record.testid+'</p>';
        htmldiv = htmldiv + '<p>'+record.grade+'</p>';
        htmldiv = htmldiv + '<button><a href="#spec-change-dialog" rel="modal:open">변경</a></button>';
        htmldiv = htmldiv + '</div>';
    htmldiv = htmldiv + '</div>';

    $('#'+targetdivid).append(htmldiv);
    //$('#'+targetdivid).innerHTML = '<p class="record_first">' + viewdata.first + '</p>';
    //$('#'+targetdivid).innerHTML += '<p class="record_second">' + viewdata.second + '</p>';
    //$('#'+targetdivid).innerHTML += '<p class="record_third">' + viewdata.third + '</p>';
}