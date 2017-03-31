(function ($) {
    // USE STRICT
    "use strict";

        $(document).ready(function () {

            var selector_map = $('#google_map');
            var img_pin = selector_map.attr('data-pin');
            var data_map_x = selector_map.attr('data-map-x');
            var data_map_y = selector_map.attr('data-map-y');
            var scrollwhell = selector_map.attr('data-scrollwhell');
            var draggable = selector_map.attr('data-draggable');

            if (img_pin == null) {
                img_pin = 'img/icons/location.png';
            }
            if (data_map_x == null || data_map_y == null) {
                data_map_x = 37.3863866;
                data_map_y = -122.0576091;
            }
            if (scrollwhell == null) {
                scrollwhell = 0;
            }

            if (draggable == null) {
                draggable = 0;
            }

            var style = [{
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
            }, {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
            }, {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            }, {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{"lightness": 20}, {"color": "#ececec"}]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [{"visibility": "on"}, {"color": "#f0f0ef"}]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{"visibility": "on"}, {"color": "#f0f0ef"}]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [{"visibility": "on"}, {"color": "#d4d4d4"}]
            }, {
                "featureType": "landscape.natural",
                "elementType": "all",
                "stylers": [{"visibility": "on"}, {"color": "#ececec"}]
            }, {"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "on"}]}, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{"lightness": 21}, {"visibility": "off"}]
            }, {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [{"visibility": "on"}, {"color": "#d4d4d4"}]
            }, {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#303030"}]
            }, {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [{"saturation": "-100"}]
            }, {
                "featureType": "poi.attraction",
                "elementType": "all",
                "stylers": [{"visibility": "on"}]
            }, {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [{"visibility": "on"}]
            }, {
                "featureType": "poi.government",
                "elementType": "all",
                "stylers": [{"visibility": "on"}]
            }, {
                "featureType": "poi.medical",
                "elementType": "all",
                "stylers": [{"visibility": "on"}]
            }, {"featureType": "poi.park", "elementType": "all", "stylers": [{"visibility": "on"}]}, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{"color": "#dedede"}, {"lightness": 21}]
            }, {
                "featureType": "poi.place_of_worship",
                "elementType": "all",
                "stylers": [{"visibility": "on"}]
            }, {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [{"visibility": "on"}]
            }, {
                "featureType": "poi.school",
                "elementType": "geometry.stroke",
                "stylers": [{"lightness": "-61"}, {"gamma": "0.00"}, {"visibility": "off"}]
            }, {
                "featureType": "poi.sports_complex",
                "elementType": "all",
                "stylers": [{"visibility": "on"}]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
            }, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#dadada"}, {"lightness": 17}]}];

            var e = new google.maps.LatLng(data_map_x, data_map_y),
                o = {
                    zoom: 15, center: new google.maps.LatLng(data_map_x, data_map_y),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: 0,
                    scrollwheel: scrollwhell,
                    disableDefaultUI: 1,
                    draggable: draggable,
                    navigationControl: 0,
                    styles: style
                },
                n = new google.maps.Map(document.getElementById("google_map"), o);

            google.maps.event.addDomListener(window, "resize", function () {
                var e = n.getCenter();
                google.maps.event.trigger(n, "resize");
                n.setCenter(e)
            });

            var g = '<div class="map-tooltip"><h4>Insurance</h4><p>Now that you visited our website, how about <br/> checking out our office too?</p></div>',
                a = new google.maps.InfoWindow({content: g}),
                t = new google.maps.MarkerImage(img_pin, new google.maps.Size(100, 100),
                    new google.maps.Point(0, 0), new google.maps.Point(20, 55)),
                i = new google.maps.LatLng(data_map_x, data_map_y),
                p = new google.maps.Marker({position: i, map: n, icon: t, zIndex: 3});

            google.maps.event.addListener(p, "click", function () {
                a.open(n, p)
            });

            $(".button-map").on('click', function () {
                $(selector_map).slideToggle(300, function () {
                    google.maps.event.trigger(n, "resize");
                    n.setCenter(e)
                });
                $(this).toggleClass("close-map show-map")
            });

        });

})(jQuery);
//# sourceMappingURL=gmap.js.map
