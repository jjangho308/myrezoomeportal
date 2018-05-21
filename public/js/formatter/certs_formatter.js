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

        $("#cert-body-div").css({"margin":"0px 25px", "font-size":"12px", "display":"flex", "width": "100%"});

        record_data.scoreList.sort((a, b) => {
            return a["year"] - b["year"] || a["semester"] - b["semester"];
        });

        //30 row
        
        var year = '';
        var semester = '';

        var htmldiv = '<div class="sungjuk_sector_1" style="flex: 33%"></div>';
        $('#cert-body-div').append(htmldiv);
        htmldiv = '<div class="sungjuk_sector_2" style="flex: 33%"></div>';
        $('#cert-body-div').append(htmldiv);
        htmldiv = '<div class="sungjuk_sector_3" style="flex: 33%"></div>';
        $('#cert-body-div').append(htmldiv);

        htmldiv = '';
        var sector = '1';

        var totalscore = 0;
        var beforeagree = 0;
        var beforeavg = 0;
        for(var i in record_data.scoreList) {
            if(year != record_data.scoreList[i].year || semester != record_data.scoreList[i].semester) {
                for(var j in record_data.scoreStatisticList) {
                    if(year == record_data.scoreStatisticList[j].year && semester == record_data.scoreStatisticList[j].semester){
                        beforeagree = record_data.scoreStatisticList[j].scored_acquired;
                        beforeavg = record_data.scoreStatisticList[j].average_score;
                        htmldiv = "<p style='font-weight:bold; margin: 10px 0px'>취득학점 : " 
                        + beforeagree + "      평점평균 : " 
                        + beforeavg.substr(0, 3) + '</p>'; 
                        $('.sungjuk_sector_' + sector).append(htmldiv);
                    }
                }

                htmldiv = "<p style='font-weight:bold; text-align: center; text-decoration: underline; margin: 10px 0px'>" 
                + record_data.scoreList[i].year + "학년도 " 
                + record_data.scoreList[i].semester + "학기"+ '</p>';   
                year = record_data.scoreList[i].year;
                semester = record_data.scoreList[i].semester;
                $('.sungjuk_sector_' + sector).append(htmldiv);
            }            
            htmldiv = "<p>" + record_data.scoreList[i].lecture_name + "" 
            + record_data.scoreList[i].score_result + "/" + record_data.scoreList[i].grade_result + '</p>';    
            $('.sungjuk_sector_' + sector).append(htmldiv);  
            if(i > 15 && i % 15 == 1) {
                sector ++;
            }          

            totalscore += parseInt(record_data.scoreList[i].score_result);
        } 
        
        var totalagree = 0;        
        for(var i in record_data.scoreStatisticList) {
            totalagree += parseInt(record_data.scoreStatisticList[i].scored_acquired);            
        }
        // 총 취득학점
        htmldiv = "<p style='font-weight:bold; margin: 10px 0px'> 총취득학점  " 
        + totalagree + "<br>총점 누계  " 
        + totalscore + ""+ '</p>';   
        $('.sungjuk_sector_' + sector).append(htmldiv);
    },
}