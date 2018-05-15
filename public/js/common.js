$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});

$(document).ready(function(){   

    $('select').selectize();


    $('.cancel-btn').click(function () {
        $(".close-modal").click();
    });

    $('#alarm-div img').click(function () {
        $("#alarm-div").hide();
    });


    $(".modal").addClass("animated fadeIn");

    $(document).on("click", 'a[rel="modal:open"]', function(e) {
		$('.modal a.close-modal').click(function(e) {
			console.log("sdf");
			$(e.target).attr("rel","");
	        $(e.target).parent().animateCss("fadeOut", function() {
	        	$(e.target).parent().parent().remove();
	        	$('body').removeClass('modal-open');
	        	$('body').css("overflow","auto");
		    });
		})
    });

        
    $(document).on("click", '.add-div', function(e) {

	   setTimeout(function() {
			$('.modal a.close-modal').click(function(e) {
				console.log("sdf");
				$(e.target).attr("rel","");
		        $(e.target).parent().animateCss("fadeOut", function() {
		        	$(e.target).parent().parent().remove();
		        	$('body').removeClass('modal-open');
		        	$('body').css("overflow","auto");
			    });
			})

	    }, 500);
    });


  $("#alarm-div").addClass("animated fadeInDown");

});