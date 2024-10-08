$(document).ready(function(){

	$('.skillbar').skillBars({
		from: 0,
		speed: 4000, 
		interval: 100,
		decimals: 0,
	});

});

(function ( $ ) {

  $.fn.skillBars = function( options ) {

      var settings = $.extend({
    from: 0,  			// number start
    to: false,			// number end
    speed: 1000,  		// how long it should take to count between the target numbers
    interval: 100,	  // how often the element should be updated
    decimals: 0,		  // the number of decimal places to show
    onUpdate: null,	  // callback method for every time the element is updated,
    onComplete: null,	  // callback method for when the element finishes updating
    /*onComplete: function(from) {
              console.debug(this);
          }*/
      }, options );

      return this.each(function(){

    var obj = $(this),
      to = (settings.to != false) ? settings.to : parseInt(obj.attr('data-percent'));
      if(to > 100){
        to = 100;
      };
    var from = settings.from,
      loops = Math.ceil(settings.speed / settings.interval),
            increment = (to - from) / loops,
      loopCount = 0,
      interval = setInterval(updateValue, settings.interval);

    obj.find('.skillbar-bar').animate({
      width: parseInt(obj.attr('data-percent'))+'%'
    }, settings.speed);

    function updateValue(){
      from += increment;
              loopCount++;
              $(obj).find('.skill-bar-percent').text(from.toFixed(settings.decimals)+'%');

              if (typeof(settings.onUpdate) == 'function') {
                  settings.onUpdate.call(obj, from);
              }

              if (loopCount >= loops) {
                  clearInterval(interval);
                  from = to;

                  if (typeof(settings.onComplete) == 'function') {
                      settings.onComplete.call(obj, from);
                  }
              }
    }

      });

  };

}( jQuery ));