var resumeModel;
var userModel;

$(document).ready(function(){
	rendering();

	$("#edit-button").click(function() {
		location.href = "/resumes/editor/"+resumeModel.rsmId;
	});	

	$("#btn_print").click(function() {		

		$(".header").hide();
		$("#footer").hide();

		window.print();
		
		$(".header").show();
		$("#footer").show();
	});
});

function setResumeModel(_resumeModel) {
	resumeModel = JSON.parse(_resumeModel);	
}

function setUserModel(_userModel) {
	userModel = JSON.parse(_userModel);
}

function rendering() {
	$("#resume_title").html(resumeModel.title);

	$("#resume-user").children().eq(0).html(userModel.fullNameKO);
	$("#resume-user").children().eq(1).html("<strong>Email</strong> : " + userModel.phone);
	$("#resume-user").children().eq(2).html("<strong>Mobile</strong> : " + userModel.email);	
	$("#resume-user").children().eq(3).html("<strong>Birth</strong> : " + userModel.birth);

	//$("#resume-intro").html("자기소개 블라블라블라~");

	var records = resumeModel.records;
	for(var i in records) {
		try {			
			var record = getData(records[i].trxId);			
			resumeformatter(record);
		} catch (exception) {
			console.log(exception);
		}
	}	
}


