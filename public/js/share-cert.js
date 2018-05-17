
var certdata;

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



});

function verify(passcode) {
	var passcodehash = SHA256(passcode);

    if(verifyData.encrypted) {
        var encodedIv = verifyData.iv;
        var encryptedData = verifyData.data;

        var decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Hex.parse(
            passcodehash), {
            iv: CryptoJS.enc.Base64.parse(encodedIv)
        });
        console.log(decrypted.toString(CryptoJS.enc.Utf8));
	}
}

function setData(data) {
	var verifyData = JSON.parse(data);
	
	certdata = verifyData;

	/*
    var passcode = '43214321';
    var passcodehash = SHA256(passcode);

    if(verifyData.encrypted) {
        var encodedIv = verifyData.iv;
        var encryptedData = verifyData.data;

        var decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Hex.parse(
            passcodehash), {
            iv: CryptoJS.enc.Base64.parse(encodedIv)
        });
        console.log(decrypted.toString(CryptoJS.enc.Utf8));
	}
	*/   
}