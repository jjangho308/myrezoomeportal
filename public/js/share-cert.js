var certdata;
var verifyisclicked = 0;
var certUrl;
var certId;

$(document).ready(function () {

    var situation = 1;

    $("#cert-confirm-btn").click(function () {
        verify($('#cert-confirm-pw').val());
    })

    //viewer hide
    $('#popup-dialog a').click();
    $("#cert-viewer").css("display", "none");

    try {
        if (certdata.encrypted == false) {
            json_decrypted = certdata.data;


            $(".main-container").css("display", "none");
            $(".loading-container").css("display", "block");

            var current_active = 0;

            $('#circle-' + current_active).css("background-color", "#4a90e2");

            var mytimer = setInterval(function () {
                $('#circle-' + current_active).css("background-color", "#dadada");
                current_active += 1;

                if (current_active == 2) {
                    $("#cert-verify").css("display", "none");
                    $("#cert-viewer").css("display", "block");
                    certformatter[json_decrypted.subid](json_decrypted.data);
                    clearInterval(mytimer);
                }
                $('#circle-' + current_active).css("background-color", "#4a90e2");

            }, 1000);
        }
    } catch (exception) {
        console.error(exception);
    }

    $("#btn_print").click(function (event) {
            // generate QR before print 
            generateQRCode();

            $(".header").hide();
            $(".main-body-footer").hide();
            $(".main-body-footer-decription").hide();
            $(".qr-container").show();

            var html = document.querySelector('html');
            var $childern = $(".outer-container");
            var printContents = "";

            $childern.each(function (idx, array) {
                printContents += $(this).html();
            });

            // const printContents = document.querySelector('.outer-container').innerHTML;

            var printDiv = document.createElement("DIV");
            printDiv.className = "print-div";

            html.appendChild(printDiv);
            printDiv.innerHTML = printContents;
            document.body.style.display = 'none';
            window.print();
            document.body.style.display = 'block';
            printDiv.remove();

            $(".header").show();
            $(".main-body-footer").show();
            $(".main-body-footer-decription").show();
            $(".qr-container").hide();

        
    });

    $(".main-body-footer-right").click(function (event) {
        if (verifyisclicked == 0) {
            $(".main-body-footer-right").css({
                'width': '100px',
                'height': '40px',
                'border-radius': '4px',
                'background-color': '#e2e8f0'
            });
            verifyisclicked = 1;
            var htmldiv = '<div class="footer-verify-1">';
            htmldiv = htmldiv + '<div class="footer-verify-left">' + "STEP1" + '</div>';
            htmldiv = htmldiv + '<div class="footer-verify-center">' + "Nexledger에 기록된 Transaction ID를 조회하는중입니다." + '</div>';
            htmldiv = htmldiv + '<div class="footer-verify-right"><div class="verify-loader"><div class="verify-loader-item"></div><div class="verify-loader-item"></div><div class="verify-loader-item"></div></div>' + '</div>';
            htmldiv = htmldiv + '</div>';
            $('.main-body-footer').append(htmldiv);

            $('html').animate({
                scrollTop: ($('.main-body-footer').offset().top)
            }, 600);

            var reqtxid = $('.main-body-footer-6').text();
            nexledgerInfoView(reqtxid);

            setTimeout(function () {

                $('.footer-verify-1 > .footer-verify-right').html('<img src="/img/certviewer/shape.svg" class="Shape">');

                var htmldiv = '<div class="footer-verify-2">';
                htmldiv = htmldiv + '<div class="footer-verify-left">' + "STEP2" + '</div>';
                htmldiv = htmldiv + '<div class="footer-verify-center">' + "Hash 데이터를 비교하고 있습니다." + '</div>';
                htmldiv = htmldiv + '<div class="footer-verify-right"><div class="verify-loader"><div class="verify-loader-item"></div><div class="verify-loader-item"></div><div class="verify-loader-item"></div></div>' + '</div>';
                htmldiv = htmldiv + '</div>';
                $('.main-body-footer').append(htmldiv);

                $('html').animate({
                    scrollTop: ($('.main-body-footer').offset().top)
                }, 600);

                setTimeout(function () {
                    $('.footer-verify-2 > .footer-verify-right').html('<img src="/img/certviewer/shape.svg" class="Shape">');
                    var htmldiv = '<div class="footer-verify-3">';
                    htmldiv = htmldiv + '<div class="footer-verify-left">' + "STEP3" + '</div>';
                    htmldiv = htmldiv + '<div class="footer-verify-center">' + "결과를 정리하고 있습니다." + '</div>';
                    htmldiv = htmldiv + '<div class="footer-verify-right"><div class="verify-loader"><div class="verify-loader-item"></div><div class="verify-loader-item"></div><div class="verify-loader-item"></div></div>' + '</div>';
                    htmldiv = htmldiv + '</div>';
                    $('.main-body-footer').append(htmldiv);

                    $('html').animate({
                        scrollTop: ($('.main-body-footer').offset().top)
                    }, 600);

                    setTimeout(function () {
                        $('.footer-verify-3 > .footer-verify-right').html('<img src="/img/certviewer/shape.svg" class="Shape">');
                        var htmldiv = '<div class="footer-verify-4">';
                        htmldiv = htmldiv + '<div class="footer-verify-left">' + "RESULT" + '</div>';
                        htmldiv = htmldiv + '<div class="footer-verify-center">' + "정상적인 데이터로 확인되었습니다." + '</div>';
                        htmldiv = htmldiv + '<div id="txinfoget-bt" class="footer-verify-right">' + '<a href="#nexledger-txid-info-dialog" rel="modal:open">트랜잭션 조회</a>' + '</div>';
                        htmldiv = htmldiv + '</div>';
                        $('.main-body-footer').append(htmldiv);

                        $('html').animate({
                            scrollTop: ($('.main-body-footer').offset().top)
                        }, 600);

                        //$(".main-body-footer-right").css({'background-color': '#7ed321', 'font-size': '14px','font-weight': 'bold', 'font-style': 'normal', 'font-stretch': 'normal', 'line-height': 'normal', 'letter-spacing': 'normal', 'text-align': 'right', 'color': '#ffffff'});
                        $(".main-body-footer-right").css({
                            'background-color': '#7ed321'
                        });
                        $(".main-body-footer-right-button1").text("검증완료");
                        $('.footer-verify-4 > .footer-verify-center').css({
                            'color': '#7ed321'
                        });

                        $('#txinfoget-bt').click(function (event) {
                            if (nexledgerErr == 1) {
                                alert("Nexledger Admin Connection ERR");
                            } else {
                                //$("#nexledger-txid-info-dialog").css('display','block');

                                //var dislogoffettop = $("#txinfoget-bt").offset().top - $("#nexledger-txid-info-dialog").height();
                                //var dislogoffetleft = $("#txinfoget-bt").offset().left - $("#nexledger-txid-info-dialog").width();
                                //$("#nexledger-txid-info-dialog").css({'left':dislogoffetleft+'px','top':dislogoffettop+'px'});
                            }
                        });

                    }, 1000);

                }, 1000);

            }, 1000);
        } else {
            alert("이미 진행중입니다");
        }

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
        if (certdata.encrypted) {
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

        $(".main-container").css("display", "none");
        $(".loading-container").css("display", "block");

        var current_active = 0;

        $('#circle-' + current_active).css("background-color", "#4a90e2");

        var mytimer = setInterval(function () {
            $('#circle-' + current_active).css("background-color", "#dadada");
            current_active += 1;

            if (current_active > 2) {
                clearInterval(mytimer);
                current_active = 0;
                certformatter[json_decrypted.subid](json_decrypted.data);
                $("#cert-verify").css("display", "none");
                $("#cert-viewer").css("display", "block");
            }
            $('#circle-' + current_active).css("background-color", "#4a90e2");

        }, 1000);
    } catch (exception) {
        $("input").css("border", "solid 1px #f59188");
        $(".error-message").css("display", "block");
    }

    // }
}

function nexledgerInfoView(reqtxid) {
    $.ajax({
        type: 'POST',
        url: '/nexledger/get_txinfo',
        // headers: {
        //     'Authorization': client_authorization
        // },
        contentType: 'application/json',
        data: JSON.stringify({
            //uId: 'SearchRecord',
            //sId: '',
            txid: reqtxid
        }),
        error: function (jqXhr, status, error) {
            $("#nexledger-txid-info-dialog").css('display', 'none');
            console.error('Nexledger Connection Error : ' + error);
            console.error(jqXhr.responseText);
            nexledgerErr = 1;
            //alert("Nexledger Admin Connection ERR");
        },
        success: function (res2) {
            console.log(res2);
            $("#tx_id").text(reqtxid);
            //$("#fromaddress").text(res2.result.fromaddress);

            var tempstr = '';
            for (var i = 0; i < res2.result.fromaddress.length; i++) {
                tempstr = tempstr + res2.result.fromaddress[i] + '<br>';
            }
            $("#fromaddress").html(tempstr);

            tempstr = '';
            for (var i = 0; i < res2.result.toaddress.length; i++) {
                tempstr = tempstr + res2.result.toaddress[i] + '<br>';
            }
            $("#toAddress").html(tempstr);

            $("#total_volume").text(res2.result.total_volume);
            $("#total_output").text(res2.result.output);
            $("#txsize").text(res2.result.txsize + " byte");

            tempstr = '';
            for (var i = 0; i < res2.result.input_script.length; i++) {
                tempstr = tempstr + res2.result.input_script[i] + '<br>';
            }
            $("#input_script").html(tempstr);
            $("#input_script").css("height", "175px");

            tempstr = '';
            for (var i = 0; i < res2.result.output_script.length; i++) {
                tempstr = tempstr + res2.result.output_script[i] + '<br>';
            }
            $("#output_script").html(tempstr);
            $("#output_script").css("height", "200px");

            $(".nexledger-txid-info-dialog-close").click(function (event) {
                $("#nexledger-txid-info-dialog .close-modal").click();
            });

        }
    });
}

function setData(data) {
    var verifyData = JSON.parse(data);
    certdata = verifyData;

    certId = verifyData.certId;
    certUrl = verifyData.url;

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