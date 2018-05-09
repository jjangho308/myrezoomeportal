var resumeModel;
var userModel;
var deletedTxIds = [];
var deletedPrvtIds = [];
var addedPrvtRecord;

$(document).ready(function(){

    rendering();

    $(".study-period").datepicker();
    $(".study-period").datepicker("option", "dateFormat", "yy-mm-dd");

    $(".save-button").click(function() {
        window.location ="/resumesviewer";
    });

	if(window.location.search.indexOf("new")>0){
		$("#alarm-div span").text('이력서 생성이 완료되었습니다.');
        $('#alarm-div').css("display","block");  
	}

	$("#rename-dialog .confirm-btn").click(function() {
		$("#rename-dialog .error-message").css("display","block");


		$("#rename-dialog  .modal-body").css("padding-bottom", "11px");

		$("#rename-dialog  input").css("border", " solid 1px #f59188");

	});

    $('#education-add-dialog .add-span').click(function () {
        console.log("#education-add-dialog .add-span clicked");
        $("#major-div").append(` 
            <div class="error-range">
                <div class="select-100">
                    <select name="select-1">
                            <option value="1">전공</option>
                            <option value="2">부전공</option>
                            <option value="3">복수전공</option>
                    </select>
                </div>
                <div class="select-100">
                    <select name="select-2">
                            <option value="volvo">학사</option>
                            <option value="saab">석사</option>
                    </select>
                </div>

                <input type="text" class="major add-major" placeholder="전공을 입력해주세요. Ex) 컴퓨터 공학">
                <img src="/img/myresume/close-white.svg"/>
                <div class="error-message">전공을 입력해주세요.</div>
            </div>`);
        $("select").selectize();
	});
	

	$("#btn_save").click(function(){

		var param = {            
            title: title,
            intro: intro,
			deletedTxIds: deletedTxIds,
			prvtIds: prvtIds
		}
		
		$.ajax({
            type: 'POST',
            url: '/record',
            headers: {
                'Authorization': client_authorization
            },
            data: JSON.stringify({                
                data: param
            }),
            beforeSend: function() {
                
            },
            success: function (res) {
                $("#cert-add-dialog .close-modal").click();
                $("#alarm-div span").text("사용자 이력 수기 입력했다.");
                $('#alarm-div').css("display", "block");
                
                //clean view
                 $('.private-spec-body').remove();
                 getPrivateRecords();
            },
            contentType: 'application/json',
        });
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
			console.log(record);		
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
			var htmldiv = '<div id="' + record.txid + '" class="resumes-body">';
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
			htmldiv = htmldiv + '<img src="/img/common/close.svg" onclick=deleteCert("'+ record.txid +'"); />';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '</div>';
			$('#resumes-lang-body').append(htmldiv);
		break;

		case "RCCNF0001" :			
			var htmldiv = '<div id="' + record.txid + '" class="resumes-body">';
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
			htmldiv = htmldiv + '<img src="/img/common/close.svg" onclick=deleteCert("'+ record.txid +'"); />';
			htmldiv = htmldiv + '</div>';
			htmldiv = htmldiv + '</div>';
			$('#resumes-cert-body').append(htmldiv);
		break;
	}
}

function deleteCert(txid) {
	deletedTxIds.push(txid);
	$("#"+txid).remove();
}