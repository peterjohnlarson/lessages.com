!function(){
    var app = angular.module('ls-music', []);

    app.filter('makeUppercase', function () {
        return function (item) {
            return item.toUpperCase();
        };
    });

    app.filter('trackLength', function () {
        return function (input) {
            var rounded = Math.round(input);
            var min = Math.floor(rounded/60).toString();
            var sec = Math.round(rounded % 60).toString();
            if (sec.length === 1) sec = '0' + sec;
            return min + ':' + sec;
        };
    });

    app.filter('makeUppercase', function () {
      return function (item) {
        return item.toUpperCase();
      };
    });
    app.controller(
        'MusicCtrl', [ '$http', function ($http) {
            var music = this;
            music.albums = {};
            $http.get('js/albums.json').success(function (data) {
                music.albums = data;
                music.tab = Object.keys(data)[1];
            });
        }]
    );

    app.directive('bgImg', function(){
        return function(scope, element, attrs){
            attrs.$observe('bgImg', function(value) {
                element.css({
                    'background-image': 'url(' + value + ')'
                });
            });
        };
    });

}();