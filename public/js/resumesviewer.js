var resumeModel;
var userModel;

$(document).ready(function(){
	rendering();

	$("#edit-button").click(function() {
		window.location ="/resumes/editor/"+resumeModel.rsmId;
	});	
});

function setResumeModel(_resumeModel) {
	resumeModel = JSON.parse(_resumeModel);	
}

function setUserModel(_userModel) {
	userModel = JSON.parse(_userModel);	
}

function rendering() {
	console.log(resumeModel);
	console.log(userModel);

	$("#resume_title").html(resumeModel.title);

	$("#resume-user").children().eq(0).html(userModel.fullNameKO);
	$("#resume-user").children().eq(1).html("<strong>Email</strong> : " + userModel.phone);
	$("#resume-user").children().eq(2).html("<strong>Mobile</strong> : " + userModel.email);	
	$("#resume-user").children().eq(3).html("<strong>Birth</strong> : " + userModel.birth);

	//$("#resume-intro").html("자기소개 블라블라블라~");

	var records = resumeModel.records;
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


