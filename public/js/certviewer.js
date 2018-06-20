var record;
var verifyisclicked = 0;
var certUrl;
var certId;

$(document).ready(function () {

    //common
    client_token = getCookie("JWT");
    client_authorization = 'Bearer ' + client_token;

    $('#create-link-button').click(function () {
        $('.abc-radio label').css("color", "#676767");
        $("#cert-url-input").val("https://rezoome.io/d/20194011003A");
        $('.abc-radio .default-password-label').click();
        $('.abc-radio .default-period-label').click();

        $(".modal-footer a").css("display", "inline-block");
        generateURL();
    });


    $('.cert-create-div .default-password-label').click(function () {
        $('.cert-create-div  .password-div').hide();
    });

    $('.cert-create-div  .aware-password-label').click(function () {
        $('.cert-create-div  .password-div').show();
    });

    $('.cert-create-div  .default-period-label').click(function () {
        $('.cert-create-div  .period-div').hide();
    });

    $('.cert-create-div  .expire-period-label').click(function () {
        $('.cert-create-div  .period-div').show();
    });

    $('.email-send-div .default-password-label').click(function () {
        $('.email-send-div  .password-div').hide();
    });

    $('.email-send-div  .aware-password-label').click(function () {
        $('.email-send-div  .password-div').show();
    });

    $('.email-send-div  .default-period-label').click(function () {
        $('.email-send-div  .period-div').hide();
    });

    $('.email-send-div  .expire-period-label').click(function () {
        $('.email-send-div  .period-div').show();
    });



    $(".expire-period").datepicker();

    $(".expire-period").datepicker("option", "dateFormat", "yy-mm-dd");


    $('.modal-sub-header span:nth-child(1)').click(function () {
        $('.modal-sub-header span:nth-child(2)').css({
            "border": "none",
            "font-weight": "normal"
        });
        $(this).css({
            "border-bottom": "solid 5px #4c80f1",
            "font-weight": "bold"
        });
        $(".email-send-div").hide();
        $(".cert-create-div").show();
    });



    $('.modal-sub-header span:nth-child(2)').click(function () {
        $('.modal-sub-header span:nth-child(1)').css({
            "border": "none",
            "font-weight": "normal"
        });
        $(this).css({
            "border-bottom": "solid 5px #4c80f1",
            "font-weight": "bold"
        });
        $(".email-send-div").show();
        $(".cert-create-div").hide();
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
                        htmldiv = htmldiv + '<div id="txinfoget-bt" class="footer-verify-right">' + '<a>트랜잭션 조회</a>' + '</div>';
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

                        $('#txinfoget-bt').click(function(event){

                            $("#nexledger-txid-info-dialog").css('display','block');
                            var reqtxid = $('.main-body-footer-6').text();

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
                                    console.error('Cert check error : ' + error);
                                    console.error(jqXhr.responseText);
                                },
                                success: function (res2) {
                                    console.log(res2);
                                    $("#tx_id").text(reqtxid);
                                    //$("#fromaddress").text(res2.result.fromaddress);

                                    var tempstr = '';
                                    for(var i=0;i < res2.result.fromaddress.length; i++) {
                                        tempstr = tempstr + '<p>' + res2.result.fromaddress[i] + '</p>';
                                    }
                                    $("#fromaddress").html(tempstr);

                                    tempstr = '';
                                    for(var i=0;i < res2.result.toaddress.length; i++) {
                                        tempstr = tempstr + '<p>' + res2.result.toaddress[i] + '</p>';
                                    }
                                    $("#toAddress").html(tempstr);

                                    $("#total_volume").text(res2.result.total_volume);
                                    $("#total_output").text(res2.result.output);
                                    $("#txsize").text(res2.result.txid);
                                    
                                    tempstr = '';
                                    for(var i=0;i < res2.result.input_script.length; i++) {
                                        tempstr = tempstr + '<p>' + res2.result.input_script[i] + '</p>';
                                    }
                                    $("#input_script").html(tempstr);
                                    
                                    tempstr = '';
                                    for(var i=0;i < res2.result.output_script.length; i++) {
                                        tempstr = tempstr + '<p>' + res2.result.output_script[i] + '</p>';
                                    }
                                    $("#output_script").html(tempstr);
                                }                                
                            });
                        });

                    }, 1000);

                }, 1000);

            }, 1000);
        } else {
            alert("이미 진행중입니다");
        }

    });

    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
        '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

    $('#email-send-input').selectize({
        persist: false,
        maxItems: null,
        valueField: 'email',
        labelField: 'name',
        searchField: ['name', 'email'],
        options: [],
        render: {
            item: function (item, escape) {
                setTimeout(2000, function () {
                    $(".email-remove-button").click(function () {
                        console.log("c");
                    });
                });


                return '<div>' +
                    (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
                    (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +

                    (`<img src="/img/myresume/close-gray.svg"  class="email-remove-button" onclick="$(this).parent().hide()">`)

                '</div>';


            },
            option: function (item, escape) {


                var label = item.name || item.email;
                var caption = item.name ? item.email : null;
                return '<div>' +
                    '<span class="label">' + escape(label) + '</span>' +
                    (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
                    '</div>';
            }


        },
        createFilter: function (input) {
            var match, regex;

            // email@address.com
            regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[0]);

            // name <email@address.com>
            regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
            match = input.match(regex);
            if (match) return !this.options.hasOwnProperty(match[2]);

            return false;
        },
        create: function (input) {
            if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                return {
                    email: input
                };
            }
            var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
            if (match) {
                return {
                    email: match[2],
                    name: $.trim(match[1])
                };
            }
            alert('Invalid email address.');
            return false;
        }
    });


    $("#more-button").click(function () {

        if ($("#more-button-div").css("display") == "none") {
            $("#more-button-div").show();
        } else {
            $("#more-button-div").hide();
        }

    });

    function formatDummyText(text) {
        if (!text) {
            return '&nbsp;';
        }
        return text.replace(/\n$/, '<br>&nbsp;')
            .replace(/\n/g, '<br>');
    }


    var first = true;
    $(function () {

        var $wrap = $('#wrap');
        var $textarea = $('textarea');
        var $dummy = $('.dummy');


        function positionTextarea() {
            var h = $wrap.height();
            var top = Math.max(0, (h - $dummy.height()) * 0.5);

            if (first) {
                h -= 5;
                top -= 5;
                first = false;
            }
            $textarea.css({
                paddingTop: top,
                height: h - top
            });
        }

        $textarea.on('keyup change', function (event) {
            var html = formatDummyText($textarea.val());
            $dummy.html(html);
            positionTextarea();
        }).trigger('change');

        // should debounce this
        $(window).on('resize', positionTextarea);

    });

    $('.confirm-btn').click(function () {
        summitform();
    });

    $("#btn_print").click(function (event) {
        // $(".header").hide();
        // $("#footer").hide();
        // $(".main-body-footer").hide();
        // $(".qrcode").show();             

        // const html = document.querySelector('html'); 
        // const printContents = document.querySelector('.main-body').innerHTML;
        // const printDiv = document.createElement("DIV");
        // printDiv.className = "print-div";

        // html.appendChild(printDiv);
        // printDiv.innerHTML = printContents;
        // document.body.style.display = 'none';
        // console.log(html)
        // window.print();
        // document.body.style.display = 'block';
        // printDiv.style.display = 'none';

        // $(".header").show();
        // $("#footer").show();   
        // $(".main-body-footer").show();            
        // $(".qrcode").hide();              


        

        $(".qr-container").show();
        var $childern = $(".outer-container >.inner-container");
        //var $childern = $(".main-body >.outer-container");


        $childern.each(function (idx, array) {
            html2canvas($(this), { scale:3 }).then(canvas => {
                    // var ctx = canvas.getContext('2d');
                    // ctx.webkitImageSmoothingEnabled = false;
                    // ctx.mozImageSmoothingEnabled = false;
                    // ctx.imageSmoothingEnabled = false;                    
                    var img = canvas.toDataURL("image/jpeg" , 2);
                    $("#printcontent").prepend("<img class=certImg id=certImg" + idx + " width=98% src=" + img + ">");

                    if (idx === $childern.size()-1) {
                        $.blockUI({ message: '<h1><img src="/img/common/ajax-loader.gif" /> 최신 레쥬메 AI 블록체인 인쇄모듈 준비중</h1>' });
                                                    
                        setTimeout( function(){                                                                
                            window.print();
                            $.unblockUI();
                            $('.certImg').remove();  
                            $(".qr-container").hide();
                        }, 3000);
                    }
                
            });            
         });

    });
});

function summitform() {
    var cert_id = window.location.href.split('/')[4];
    var cert_url = $('#cert-url-input').val().split('/')[4];
    var cert_password = hexToBase64(SHA256($('#shared_password').val()));
    var cert_exp = 20501231;
    var cert_emails = [];
    var cert_msg;
    var cert_public = 'N';

    if ($('#shared_password').val() == '' || $('#shared_password').val() == null) {
        var cert_public = 'Y';
    }

    // convert to image
    // html2canvas($(".inner-container"), {
    //     onrendered: function(canvas) {
    //         var img = canvas.toDataURL();                    
    //         $($(".inner-container")).html("<img src=" + img + ">");                                  
    //     }
    // });

    $.ajax({
        type: 'POST',
        url: '/shared_certs',
        headers: {
            'Authorization': client_authorization
        },
        data: JSON.stringify({
            shared_cert: {
                certid: cert_id,
                url: cert_url,
                password: cert_password,
                exp: cert_exp,
                emails: cert_emails,
                msg: cert_msg,
                public: cert_public
            }
        }),
        error: function (jqXhr, status, error) {
            console.error('Share cert Error : ' + error);
            console.error(jqXhr.responseText);
        },
        success: function (result) {
            console.log(result);
            $('#cert-add-dialog a').click();
        },
        contentType: 'application/json'
    });

}

function setCertViewer(tx_id) {
    record = getData(tx_id);
    console.log(record);
    $("#cert_title").html(record.subid);
    certformatter[record.subid](record.data);
}

function setDefaultUrl(url) {    
    certUrl = window.location.protocol + "//" + window.location.host + '/v/' + url;    
    console.log(certUrl);    
}

function setCertId(certid) {    
    certId = certid;
}

function generateURL() {

    $.ajax({
        type: 'POST',
        url: '/client',
        headers: {
            'Authorization': client_authorization
        },
        data: JSON.stringify({
            cmd: 'GenerateShortURL',
            args: {
                prefix: 'c'
            }
        }),
        error: function (jqXhr, status, error) {
            console.error('Generate url : ' + error);
            console.error(jqXhr.responseText);
        },
        success: function (result) {
            $("#cert-url-input").val(window.location.protocol + "//" + window.location.host + '/v/' + result.result);
        },
        contentType: 'application/json'
    });
}