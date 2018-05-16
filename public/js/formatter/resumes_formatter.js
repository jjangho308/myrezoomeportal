function resumeformatter(record) {
	switch(record.subid) {
		case "ㄴㄴㄴㄴ" :			
			var htmldiv = '<div class="resumes-body">';
			htmldiv = htmldiv + '<div class="resumes-left">';
			htmldiv = htmldiv + '<span>' + record.data.date + '</span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-center">';
			htmldiv = htmldiv + '<img src="/img/myresume/on.png" alt="">';
			htmldiv = htmldiv + '<span>기타</span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-right">';
			htmldiv = htmldiv + '<p>학교</p>';
			htmldiv = htmldiv + '<p>'+record.data.grade +'</p>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '</div>';
			$('#resumes-edu-body').append(htmldiv);
		break;

		case "RCLPT0005" :			
			var htmldiv = '<div class="resumes-body">';
			htmldiv = htmldiv + '<div class="resumes-left">';
			htmldiv = htmldiv + '<span>' + record.data.date + '</span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-center">';
			htmldiv = htmldiv + '<img src="/img/myresume/on.png" alt="">';
			htmldiv = htmldiv + '<span>영어</span>';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '<div class="resumes-right">';
			htmldiv = htmldiv + '<p>오픽</p>';
			htmldiv = htmldiv + '<p>'+record.data.grade +'</p>';
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