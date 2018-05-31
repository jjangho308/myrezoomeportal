function resumeformatter(record) {	
	switch(record.subid) {		
		case "RCOGC0008" :	
			record = record.data;				
			var htmldiv = '<div class="resumes-body">';
			htmldiv = htmldiv + '<div class="resumes-left">';
			htmldiv = htmldiv + '<span>' + record.registList[0].admission_date + '~' + record.registList[0].change_date +'</span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-center">';
			htmldiv = htmldiv + '<img src="/img/myresume/on.png" alt="">';
			htmldiv = htmldiv + '<span></span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-right">';
			htmldiv = htmldiv + '<p>인하대학교 졸업증명서</p>';
            htmldiv = htmldiv + '<p>'+ record.registList[0].univ_group + '/' + (record.registList[0].status == null ? '재학중' : record.registList[0].status) + '</p>';
            htmldiv = htmldiv + '<p></p>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '</div>';
			$('#resumes-edu-body').append(htmldiv);
		break;

		case "RCOGC0009" :
			record = record.data;
			var total = 0;
			for(var i in record.scoreList) {
				total += parseInt(record.scoreList[i].score_result);
			}	
					
			var htmldiv = '<div class="resumes-body">';
			htmldiv = htmldiv + '<div class="resumes-left">';
			htmldiv = htmldiv + '<span></span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-center">';
			htmldiv = htmldiv + '<img src="/img/myresume/on.png" alt="">';
			htmldiv = htmldiv + '<span></span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-right">';
			htmldiv = htmldiv + '<p>인하대학교 성적증명서</p>';
            htmldiv = htmldiv + '<p>'+ total/record.scoreList.length +'</p>';
            htmldiv = htmldiv + '<p></p>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '</div>';
			$('#resumes-edu-body').append(htmldiv);
		break;

		case "RCOGC0010" :	
			record = record.data;			
			var htmldiv = '<div class="resumes-body">';
			htmldiv = htmldiv + '<div class="resumes-left">';
			htmldiv = htmldiv + '<span>' + record.registList[0].admission_date + '~' + record.registList[0].change_date +'</span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-center">';
			htmldiv = htmldiv + '<img src="/img/myresume/on.png" alt="">';
			htmldiv = htmldiv + '<span></span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-right">';
			htmldiv = htmldiv + '<p>계명대학교 졸업증명서</p>';
            htmldiv = htmldiv + '<p>'+ record.registList[0].course + '/' + record.registList[0].status + '</p>';
            htmldiv = htmldiv + '<p></p>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '</div>';
			$('#resumes-edu-body').append(htmldiv);
		break;

		case "RCOGC0011" :
			record = record.data;
			var total = 0;
			for(var i in record.scoreStatisticList) {
				total += parseInt(record.scoreStatisticList[i].average_score);
			}	
					
			var htmldiv = '<div class="resumes-body">';
			htmldiv = htmldiv + '<div class="resumes-left">';
			htmldiv = htmldiv + '<span></span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-center">';
			htmldiv = htmldiv + '<img src="/img/myresume/on.png" alt="">';
			htmldiv = htmldiv + '<span></span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-right">';
			htmldiv = htmldiv + '<p>매경대학교 성적증명서</p>';
			htmldiv = htmldiv + '<p>'+ total/record.scoreStatisticList.length + '</p>';
            htmldiv = htmldiv + '<p></p>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '</div>';
			$('#resumes-edu-body').append(htmldiv);
		break;

		case "RCLPT0005" :			
			var htmldiv = '<div class="resumes-body">';
			htmldiv = htmldiv + '<div class="resumes-left">';
			htmldiv = htmldiv + '<span>' + record.data.ctestday + '</span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-center">';
			htmldiv = htmldiv + '<img src="/img/myresume/on.png" alt="">';
			htmldiv = htmldiv + '<span>영어</span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-right">';
			htmldiv = htmldiv + '<p>오픽</p>';
			htmldiv = htmldiv + '<p>'+record.data.rating +'</p>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '</div>';
			$('#resumes-lang-body').append(htmldiv);
		break;

		case "RCCNF0001" :			
			var htmldiv = '<div class="resumes-body">';
			htmldiv = htmldiv + '<div class="resumes-left">';
			htmldiv = htmldiv + '<span>' + record.data.date + '</span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-center">';
			htmldiv = htmldiv + '<img src="/img/myresume/on.png" alt="">';
			htmldiv = htmldiv + '<span>기타</span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-right">';
			htmldiv = htmldiv + '<p>매경TEST</p>';
			htmldiv = htmldiv + '<p>'+record.data.grade +'</p>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '</div>';
			$('#resumes-cert-body').append(htmldiv);
		break;
	}
}