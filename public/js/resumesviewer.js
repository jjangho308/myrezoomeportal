var resumeModel;

$(document).ready(function(){
	rendering();

	$("#edit-button").click(function() {
		window.location ="/resumeseditor";
	});
	
});

function setResumeModel(_resumeModel) {
	resumeModel = _resumeModel;
}

function rendering() {
	console.log(resumeModel);	

	$("#resume-user").children().eq(0).html("이름 들어가고");
	$("#resume-user").children().eq(1).html("전화번호 들어가고");
	$("#resume-user").children().eq(2).html("이메일 들어가고");	
	$("#resume-user").children().eq(3).html("생년월일 들어가고");

	$("#resume-intro").html("자기소개 블라블라블라~");

	var records = JSON.parse(resumeModel).records;
	for(var i in records) {
		try {
			var record = getData(records[i].txid);			
			formatter(record);
		} catch (exception) {
			console.log(exception);
		}
	}	
}

function formatter(record) {
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
			htmldiv = htmldiv + '<p>매경TEST</p>';
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


