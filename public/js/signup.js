$(document).ready(function(){
    //최상단 체크박스 클릭
    $("#box-all").click(function(){
        //클릭되었으면
        if($("#box-all").prop("checked")){
            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 true로 정의
            $("input[name=agreement]").prop("checked",true);
            //클릭이 안되있으면
        }else{
            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 false로 정의
            $("input[name=agreement]").prop("checked",false);
        }
    })

    $(".signup-button").click(function(){
        $("input").css("border", "solid 1px #f59188");
        $(".selectize-input").css("border", "solid 1px #f59188");

        $(".error-message").css("display", "block");

        $(".agreement-div").css("margin-top", "-18px");
    })

    $(".phone-send").click(function(){
        $(".error-message").css("display", "none");
        $(".info-message-1").css("display", "block");

        $(".phone-send").prop("disabled", "true");
        $(".phone-confirm").prop("disabled", false);

    });
    
    $(".phone-confirm").click(function(){

        $(".info-message-2").css("display", "block");
        $(".agreement-div").css("margin-top", "-18px");
    });

})

