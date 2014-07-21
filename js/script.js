var body;
var nav;

$(function() {
    body = $('body');
    nav = $('body > nav');

    windowHeight = $(window).height();

    $(window).resize(function() {
        windowHeight = $(window).height();
        waitForFinalEvent(function(){
            placeNav();
        }, 300, "resize");
    });
    $(window).scroll(function() {
        if($(window).scrollTop() >= windowHeight){
            nav.addClass('sticky');
        } else {
            nav.removeClass('sticky');
        }
    });

    $('body > section').waypoint(function(direction){
        if(direction == 'down'){
            $('body > nav a').each(function(){
                $(this).removeClass('active');
            });
            $('body > nav a[data-sect="' + $(this).attr('id') + '"]').addClass('active');
        } else if(direction == 'up'){
            $('body > nav a').each(function(){
                $(this).removeClass('active');
            });
            $('body > nav a[data-sect="' + $(this).prev().attr('id') + '"]').addClass('active');
        }
    });
});

function placeNav(){
    if($(window).scrollTop() >= windowHeight){
        nav.addClass('sticky');
    } else {
        nav.removeClass('sticky');
    }
}

var waitForFinalEvent = (function() {
    var timers = {};
    return function(callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();
