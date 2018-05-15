$(document).ready(function(){

    $('#initial-dialog').modal('show');
    

    $(".section-1 button").click(function(){
    	$('.section-1').css("display", "none");
    	$('.section-2').css("display", "block");
    });

    $(".section-2 button").click(function(){
    	$('.section-2').css("display", "none");
    	$('.section-3').css("display", "block");


	    setTimeout(function() {
	         $('.ko-progress-circle').attr('data-progress', 20);
	         $('.percentage span').text("20%");
	    }, 100);
	    setTimeout(function() {
	         $('.ko-progress-circle').attr('data-progress', 50);
	         $('.percentage span').text("50%");
	    }, 1000);
	    setTimeout(function() {
	         $('.ko-progress-circle').attr('data-progress', 100);
	         $('.percentage span').text("100%");

		     setTimeout(function() {
		     	$('.percentage span').css("display", "none");
		     	$('.section-3 button').prop("disabled", false);
		     	
		     	$('.percentage img').css("display", "block");

		    }, 1000);
	       
	    }, 2000);
   

    });
    
    $(".section-3 button").click(function(){
    	window.location ="/main";
    });

});