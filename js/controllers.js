// Configure Rivets
rivets.configure({
    templateDelimiters: ['{{', '}}']
});

// Bind Views
$(function(){
    rivets.bind($('#music'), {
        config: { selected: albums[0].album_id },
        albums: albums
    });
});

// Custom Binders
rivets.binders['bg-img'] = function(el, value) {
    $(el).css({
        'background-image': 'url(' + value + ')'
    });
};

// Custom Formatters
rivets.formatters.trackLength = function(input){
    var rounded = Math.round(input);
    var min = Math.floor(rounded/60).toString();
    var sec = Math.round(rounded % 60).toString();
    if (sec.length === 1) sec = '0' + sec;
    return min + ':' + sec;
};

rivets.formatters.date = function(value){
    return moment.unix(parseInt(value)).format('YYYY');
};
