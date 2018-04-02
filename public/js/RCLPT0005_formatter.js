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
    var viewdata;

    viewdata.date = record.date;
    viwedata.logo = 'https://s3.ap-northeast-2.amazonaws.com/rezoome/org_logo/toeic.jpg';
    viewdata.first = 'OPIC';
    viewdata.second = '영어'; /*회차 정보 추가해야함 */
    viewdata.third = record.grade;


    $('#'+targetdivid).innerHTML = '<p class="record_first">' + viewdata.first + '</p>';
    $('#'+targetdivid).innerHTML += '<p class="record_second">' + viewdata.second + '</p>';
    $('#'+targetdivid).innerHTML += '<p class="record_third">' + viewdata.third + '</p>';
}