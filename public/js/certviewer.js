$(document).ready(function(){
   
    $('#create-link-button').click(function(){
        $('.abc-radio label').css("color","#676767");
        $("#cert-url-input").val("http://rezoome.io/d/20194011003A");
        $('.abc-radio .default-label').click();
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
            {email: 'brian@thirdroute.com', name: 'Brian Reavis'},
            {email: 'nikola@tesla.com', name: 'Nikola Tesla'},
            {email: 'someone@gmail.com'}
        ],
        render: {
            item: function(item, escape) {
                return '<div>' +
                    (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
                    (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
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
    
});