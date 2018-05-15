$(document).ready(function(){

    $(".login-button").click(function(){
        $("input").css("border", "solid 1px #f59188");

        $(".error-message").css("display", "block");

    })

    var situation = 1;

    $(".confirm-btn").click(function(){

    	if(situation == 1){
	        $("input").css("border", "solid 1px #f59188");

	        $(".error-message").css("display", "block");

    		situation = 0;
    	}else{

    		$(".before-div").css("display", "none");
    		$(".after-div").css("display", "block");

    		situation = 1;	
    	}

    })

})

