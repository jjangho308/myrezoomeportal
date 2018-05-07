$(document).ready(function(){

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





});