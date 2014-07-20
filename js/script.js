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
