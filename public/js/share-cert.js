
var certdata;

$(document).ready(function(){

    var situation = 1;

    $("#cert-confirm-btn").click(function(){
    	verify($('#cert-confirm-pw').val());
    })

	//viewer hide
	$('#popup-dialog a').click();
	$("#cert-viewer").css("display", "none");

	try {
		if(certdata.encrypted == false) {
			json_decrypted = certdata.data;
			certformatter[json_decrypted.subid](json_decrypted.data);			

			$(".main-container").css("display", "none");
			$(".loading-container").css("display", "block");

			var current_active = 0;
			
			$(`#circle-${current_active}`).css("background-color","#4a90e2");
			
			setInterval(function(){
				$(`#circle-${current_active}`).css("background-color","#dadada");
				current_active += 1;
				
				if(current_active > 2){
					current_active = 0;
					$("#cert-verify").css("display", "none");
					$("#cert-viewer").css("display", "block");
				}
				$(`#circle-${current_active}`).css("background-color","#4a90e2");									
								
			}, 1000);
		}
	}	catch(exception) {
		console.log(exception);
	}

	$("#btn_print").click(function(event) {
        event.stopPropagation();

		$(".header").hide();
        $("#footer").hide();
        $(".main-body-footer").hide();
               
        setInterval(function(){
            const html = document.querySelector('html');
            const printContents = document.querySelector('.main-body').innerHTML;
            const printDiv = document.createElement("DIV");
            printDiv.className = "print-div";
            
            html.appendChild(printDiv);
            printDiv.innerHTML = printContents;
            document.body.style.display = 'none';
            window.print();
            document.body.style.display = 'block';
            printDiv.style.display = 'none';

            $(".header").show();
            $("#footer").show();   
            $(".main-body-footer").show();           
        }, 100);        
    });
});

function verify(passcode) {

	// if(hexToBase64(SHA256(passcode)) != certdata.passcode) {
	// 	$("input").css("border", "solid 1px #f59188");
	// 	$(".error-message").css("display", "block");
	// } else {

		var passcodehash = SHA256(passcode);
		var json_decrypted = "";

		try {
			if(certdata.encrypted) {
				var encodedIv = certdata.iv;
				var encryptedData = certdata.data;

				var decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Hex.parse(
					passcodehash), {
					iv: CryptoJS.enc.Base64.parse(encodedIv)
				});
				
				//1ocess verify
				json_decrypted = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));    				
			} else {
				json_decrypted = certdata.data;
			}
						   
			certformatter[json_decrypted.subid](json_decrypted.data);			

			$(".main-container").css("display", "none");
			$(".loading-container").css("display", "block");

			var current_active = 0;
			
			$(`#circle-${current_active}`).css("background-color","#4a90e2");
			
			setInterval(function(){
				$(`#circle-${current_active}`).css("background-color","#dadada");
				current_active += 1;
				
				if(current_active > 2){
					current_active = 0;
					$("#cert-verify").css("display", "none");
					$("#cert-viewer").css("display", "block");
				}
				$(`#circle-${current_active}`).css("background-color","#4a90e2");									
								
			}, 1000);
		}
		catch(exception) {
			$("input").css("border", "solid 1px #f59188");
			$(".error-message").css("display", "block");
		}

	// }
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