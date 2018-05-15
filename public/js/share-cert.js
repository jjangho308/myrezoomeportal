
$(document).ready(function(){

    var situation = 1;

    $(".confirm-btn").click(function(){

    	if(situation == 1){
	        $("input").css("border", "solid 1px #f59188");

	        $(".error-message").css("display", "block");

    		situation = 0;
    	}else{
    		$(".main-container").css("display", "none");
    		$(".loading-container").css("display", "block");

		    var current_active = 0;
		    
		    $(`#circle-${current_active}`).css("background-color","#4a90e2");
		    
		    setInterval(function(){
		        $(`#circle-${current_active}`).css("background-color","#dadada");
		        current_active += 1;
		        
		        if(current_active > 5){
		            current_active = 0;
		        }
		        $(`#circle-${current_active}`).css("background-color","#4a90e2");
		                           
		                          
		     }, 1000);

    		situation = 1;	
    	}

    })



})

