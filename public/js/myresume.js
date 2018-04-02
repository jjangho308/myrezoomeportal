$(function(){
//  $("#myresume-modal").load("myresume-modal.html"); 
//    $("#myresume-div").load("myresume.html"); 
//    $("#mycert-div").load("mycert.html"); 
    
});

$(document).ready(function(){
    $(".spec-detail-div input:checkbox").click(function(){
        
        console.log($(this).is(':checked'));
        if ($(this).is(':checked'))
        {
            $(this).closest('.spec-body').css({ "border": "solid 1px #4c80f1", "border-radius": "4px", "background-color": "rgba(76, 128, 241, 0.05)"}); 
          
        }
        else
        { $(this).closest('.spec-body').css({"border": "none", "border-bottom": "solid 1px #dfe5ef", "background-color": "white"});
        }
        
        
        var numberOfChecked = $('.spec-detail-div input:checkbox:checked').length;
        
        if(numberOfChecked == 0){
            $("#select-footer").hide();  
            $("#main-footer").css("margin-bottom","0px"); 
        }else{
            
            
            
            $( "#select-footer span:nth-child(2)" ).text(numberOfChecked+"건의");
            
        $("#select-footer").show();   
        
        $("#main-footer").css("margin-bottom","71px"); 
        }
          
        
        

        
    });
    
    $("#divSchedule").dialog({
        show: "slide", modal: true, autoOpen: false

    });
    $("#btn").click(function () {
        $("#divSchedule").dialog("open"); 
        return false;
    });
    
 $( ".study-period" ).datepicker();
    
    $( ".study-period" ).datepicker( "option", "dateFormat", "yy-mm-dd");
    
    
    $('select').selectize();
    
    
    $('#header-mycert').click(function(){
        $('#header-myresume').css("border","none");
        $('#header-resume-store').css("border","none");
        $(this).css("border-bottom","solid 5px #4c80f1");
         $("#myresume-div").hide();
        $("#mycert-div").show();
        $("#resume-store-div").hide();

    });
    
    $('#header-resume-store').click(function(){
        $('#header-myresume').css("border","none");
        $('#header-mycert').css("border","none");
        $(this).css("border-bottom","solid 5px #4c80f1");
         $("#myresume-div").hide();
        $("#mycert-div").hide();
        $("#resume-store-div").show();
    });
    
    $('#header-myresume').click(function(){
        $('#header-mycert').css("border","none");
        $('#header-resume-store').css("border","none");
        $(this).css("border-bottom","solid 5px #4c80f1");
        
         $("#myresume-div").show();
        $("#mycert-div").hide();
        $("#resume-store-div").hide();
    });
    
    
});


