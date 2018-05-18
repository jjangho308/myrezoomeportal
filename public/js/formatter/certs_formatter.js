var certformatter= {    
    "RCLPT0005":function viewformatter(record_data) {              
        // opic
        var htmldiv = '<div>';
            htmldiv = htmldiv + "<p>이름 : " +record_data.name + '</p>';
            htmldiv = htmldiv + "<p>testid : " +record_data.testid + '</p>';
            htmldiv = htmldiv + "<p>고유번호 : " +record_data.phone + '</p>';
            htmldiv = htmldiv + "<p>시험일 : " +record_data.date + '</p>';
            htmldiv = htmldiv + "<p>Grade : " +record_data.grade + '</p>';
            
        htmldiv = htmldiv + '</div>';
        $('#cert-body-div').append(htmldiv);
    },

    "RCCNF0001":function viewformatter(record_data) {
        //mktest
        var htmldiv = '<div>';
            htmldiv = htmldiv + "<p>이름 : " +record_data.name + '</p>';
            htmldiv = htmldiv + "<p>Grade : " +record_data.grade + '</p>';
            htmldiv = htmldiv + "<p>총점 : " +record_data.point0 + '</p>';
            htmldiv = htmldiv + "<p>과목1 : " +record_data.point1 + '</p>';
            htmldiv = htmldiv + "<p>과목2 : " +record_data.point2 + '</p>';
            htmldiv = htmldiv + "<p>과목3 : " +record_data.point3 + '</p>';
            
        htmldiv = htmldiv + '</div>';
        $('#cert-body-div').append(htmldiv);
    },

    "RCOGC0010":function viewformatter(record_data) {
        //계명대 졸업증명서
        console.log(record_data);
        var htmldiv = '<div>';
            htmldiv = htmldiv + "<p>이름 : " +record_data.userInfo[0].name + '</p>';
            htmldiv = htmldiv + "<p>생년월일 : " +record_data.userInfo[0].birth + '</p>';
            htmldiv = htmldiv + "<p>대학 : " +record_data.univInfo.univ_name + '</p>';
            htmldiv = htmldiv + "<p>소속 : " +record_data.userInfo[0].univ_affiliation + '</p>';
            htmldiv = htmldiv + "<p>입학일자 : " +record_data.userInfo[0].admission_date + '</p>';
            htmldiv = htmldiv + "<p>졸업일자 : " +record_data.userInfo[0].change_date + '</p>';
            
        htmldiv = htmldiv + '</div>';
        $('#cert-body-div').append(htmldiv);
    },

    "RCOGC0011":function viewformatter(record_data) {
        //계명대 성적증명서
        console.log(record_data);
        for(var i in record_data.scoreList) {
            console.log(record_data.scoreList[i]);
            var htmldiv = '<div>';        
            htmldiv = htmldiv + "<p>" + record_data.scoreList[i].year + "." 
            + record_data.scoreList[i].semester + "   " + record_data.scoreList[i].lecture_name + "       " 
            + record_data.scoreList[i].score_result + "/" + record_data.scoreList[i].grade_result + '</p>';
            htmldiv = htmldiv + '</div>';
            $('#cert-body-div').append(htmldiv);
        }        
    },
}