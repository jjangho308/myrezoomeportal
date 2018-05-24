
var certdata;

$(document).ready(function(){

    var situation = 1;

    $("#cert-confirm-btn").click(function(){
    	verify($('#cert-confirm-pw').val());
    })

	//viewer hide
	$('#popup-dialog a').click();
	$("#cert-viewer").css("display", "none");

});

function verify(passcode) {

	if(hexToBase64(SHA256(passcode)) != certdata.passcode) {
		$("input").css("border", "solid 1px #f59188");
		$(".error-message").css("display", "block");
	} else {

		var passcodehash = SHA256(passcode);

		try {
			if(certdata.encrypted) {
				var encodedIv = certdata.iv;
				var encryptedData = certdata.data;

				var decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Hex.parse(
					passcodehash), {
					iv: CryptoJS.enc.Base64.parse(encodedIv)
				});
				console.log(decrypted.toString(CryptoJS.enc.Utf8));

				//process verify
				var json_decrypted = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));        
				certformatter[json_decrypted.subid](json_decrypted.data);
				

				$(".main-container").css("display", "none");
				$(".loading-container").css("display", "block");

				var current_active = 0;
				
				$(`#circle-${current_active}`).css("background-color","#4a90e2");
				
				setInterval(function(){
					$(`#circle-${current_active}`).css("background-color","#dadada");
					current_active += 1;
					
					if(current_active > 5){
						current_active = 0;
						$("#cert-verify").css("display", "none");
						$("#cert-viewer").css("display", "block");
					}
					$(`#circle-${current_active}`).css("background-color","#4a90e2");									
									
				}, 1000);
			}
		}
		catch(exception) {
			$("input").css("border", "solid 1px #f59188");
			$(".error-message").css("display", "block");
		}

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