/*script pintura inicio*/
var anchoVentana = $(window).width();
var altoVentana = $(window).height();

$('#sketch').wScratchPad({
    width           : anchoVentana,                  // set width - best to match image width
    height          : altoVentana,                  // set height - best to match image height
    image           : null,  // set image path
    image2          : null,                 // set overlay image path - if set color is not used
    color           : '#fff',            // set scratch color - if image2 is not set uses color
    overlay         : 'none',               // set the type of overlay effect 'none', 'lighter' - only used with color
    size            : 50,                   // set size of scratcher
    realtimePercent : false,                // Update scratch percent only on the mouseup/touchend (for better performances on mobile device)
    scratchDown     : null,                 // scratchDown callback
    scratchUp       : null,                 // scratchUp callback
    scratchMove     : null,                 // scratcMove callback
    cursor          : 'img/cursor.png'                  // Set path to custom cursor
});


$(window).keypress(function(event) {
    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 122)) return true;
    $('#sketch').wScratchPad('reset');
    event.preventDefault();
    return false;
});

$(document).ready(function() {

	/*script simulacion pintura inicio*/
    $('.trazo_mov').one('webkitAnimationStart oanimationstart msAnimationStart animationstart', function(e) {
        $(".trazo").addClass("apareccer");
    });
	$('.trazo_mov').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
		$(".pintar").addClass("desaparecer");
	});

});