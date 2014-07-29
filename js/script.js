var body;
var nav;

$(function() {
    var isNavClick = false;

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
        if(direction == 'down' && !isNavClick){
            $('body > nav a').each(function(){
                $(this).removeClass('active');
            });
            $('body > nav a[data-sect="' + $(this).attr('id') + '"]').addClass('active');
        } else if(direction == 'up' && !isNavClick){
            $('body > nav a').each(function(){
                $(this).removeClass('active');
            });
            $('body > nav a[data-sect="' + $(this).prev().attr('id') + '"]').addClass('active');
        }
    }, {offset: function(){
        return nav.height();
    }});

    $('body > a.continue, body > nav a').click(function(event){
        event.preventDefault();

        if(!$(this).hasClass('continue')){
            isNavClick = true;
            $('body > nav a').removeClass('active');
            $(this).addClass('active');
        }
        $('html, body').animate({
            scrollTop: $('#' + $(this).attr('data-sect')).offset().top
        }, 1000, function(){ isNavClick = false; });
    });

    $('#music nav a').click(function(event){
        event.preventDefault();
        $('#music nav a, #music section').removeClass('active');
        $(this).addClass('active');
        $('#music section' + $(this).attr('href')).addClass('active');
        console.log($(this));
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
