$(document).ready(function(){
   
    $('#create-link-button').click(function(){
        $('.abc-radio label').css("color","#676767");
        $("#cert-url-input").val("http://rezoome.io/d/20194011003A");
        $('.abc-radio .default-label').click();
        
        $(".modal-footer a").css("display","inline-block");
    });
    
    
    $('.cert-create-div .default-password-label').click(function(){
        $('.cert-create-div  .password-div').hide();
    });
    
    $('.cert-create-div  .aware-password-label').click(function(){
        $('.cert-create-div  .password-div').show();
    });
    
    $('.cert-create-div  .default-period-label').click(function(){
        $('.cert-create-div  .period-div').hide();
    });
    
    $('.cert-create-div  .expire-period-label').click(function(){
        $('.cert-create-div  .period-div').show();
    });
    
    $('.email-send-div .default-password-label').click(function(){
        $('.email-send-div  .password-div').hide();
    });
    
    $('.email-send-div  .aware-password-label').click(function(){
        $('.email-send-div  .password-div').show();
    });
    
    $('.email-send-div  .default-period-label').click(function(){
        $('.email-send-div  .period-div').hide();
    });
    
    $('.email-send-div  .expire-period-label').click(function(){
        $('.email-send-div  .period-div').show();
    });
    
    
    
    $( ".expire-period" ).datepicker();
    
    $( ".expire-period" ).datepicker( "option", "dateFormat", "yy-mm-dd");

    
    $('.modal-sub-header span:nth-child(1)').click(function(){
        $('.modal-sub-header span:nth-child(2)').css({"border":"none","font-weight":"normal"});
        $(this).css({"border-bottom":"solid 5px #4c80f1","font-weight":"bold"});
        $(".email-send-div").hide();
        $(".cert-create-div").show();  
    });
    
    
    
     $('.modal-sub-header span:nth-child(2)').click(function(){
        $('.modal-sub-header span:nth-child(1)').css({"border":"none","font-weight":"normal"});
        $(this).css({"border-bottom":"solid 5px #4c80f1","font-weight":"bold"});
        $(".email-send-div").show();
        $(".cert-create-div").hide();  
    });

    var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
                      '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

    $('#email-send-input').selectize({
        persist: false,
        maxItems: null,
        valueField: 'email',
        labelField: 'name',
        searchField: ['name', 'email'],
        options: [
        ],
        render: {
            item: function(item, escape) {
                setTimeout(2000, function(){
                    $(".email-remove-button").click(function(){
                    console.log("c");
                });
                  });

                
                return '<div>' +
                    (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
                    (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                    
                    (`<img src="/img/myresume/close-gray.svg"  class="email-remove-button" onclick="$(this).parent().hide()">` ) 
                
                '</div>';
                
    
            },
            option: function(item, escape) {
                                    
                
                var label = item.name || item.email;
                var caption = item.name ? item.email : null;
                return '<div>' +
                    '<span class="label">' + escape(label) + '</span>' +
                    (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
                '</div>';
            }
            
            
        },
        createFilter: function(input) {
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
        create: function(input) {
            if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
                return {email: input};
            }
            var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
            if (match) {
                return {
                    email : match[2],
                    name  : $.trim(match[1])
                };
            }
            alert('Invalid email address.');
            return false;
        }
    });
    
    
    $("#more-button").click(function(){
        console.log($("#more-button-div").css("display"));
        if($("#more-button-div").css("display")=="none"){
            $("#more-button-div").show();
        }else{
            $("#more-button-div").hide();
        }
        
    });

    function formatDummyText( text ) {
      if ( !text ) {
        return '&nbsp;';
      }
      return text.replace( /\n$/, '<br>&nbsp;' )
        .replace( /\n/g, '<br>' );
    }

    
    var first = true;
    $( function() {

      var $wrap = $('#wrap');
        var $textarea = $('textarea');
      var $dummy = $('.dummy');


      function positionTextarea() {
        var h = $wrap.height();
        var top = Math.max( 0, ( h - $dummy.height() ) * 0.5 );
          
          if(first){
              h -= 5;
              top -= 5;
              first=false;
          }
        $textarea.css({
          paddingTop: top,
          height: h - top
        });
      }

      $textarea.on( 'keyup change', function( event ) {
        var html = formatDummyText( $textarea.val() );
        $dummy.html( html );
            positionTextarea();
      }).trigger('change');

      // should debounce this
      $( window ).on( 'resize', positionTextarea );

    });

    
    
});