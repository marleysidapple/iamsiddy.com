$(window).load(function () {
    
    
    //PRELOADER
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    
     // PAGE TABS	
    $('#tab-container').easytabs({
				updateHash		: false,
				animate			: true,
				transitionIn	:'fadeIn',
				transitionOut	:'fadeOut',
				animationSpeed	: 150,
				tabActiveClass	:'active',
				transitionInEasing: 'linear',
				transitionOutEasing: 'linear'

    });
    
    
    
    // MAGNIFIC POPUP FOR PORTFOLIO PAGE
    $('.image-link').magnificPopup({
        type: 'image'
    });
});



$(document).ready(function () {
   


   	 // ISOTOPE PORTFOLIO
    if ($('.portfolio_items').length) {
        $('.portfolio_filter ul li').click(function () {
            $(".portfolio_filter ul li").removeClass("select-cat");
            $(this).addClass("select-cat");
            var selector = $(this).attr('data-filter');
            $(".portfolio_items").isotope({
                filter: selector
                , animationOptions: {
                    duration: 750
                    , easing: 'linear'
                    , queue: false
                , }
            });
            return false;
        });
    }
		
    
    // SWITCHER OPEN
    $('.color-switcher .open').click(function () {
        $('.color-switcher').toggleClass("open-switcher");
    });
   
    
    //PAGE SMOOTH SCROLL
    $(function () {
        $('a.page-scroll').bind('click', function (event) {
            if ($(window).width() < 750) {
                $('.top-menu li').slideUp();
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top - 91
                }, 1000);
                event.preventDefault();
            };
        });
    });
    
    
    // GOOGLE MAP	
    $('#wrapper').bind('easytabs:after', function () {
        var myOptions = {
            zoom: 14
            , center: new google.maps.LatLng(40.801485408197856, -73.96745953467104), //change the coordinates
            mapTypeId: google.maps.MapTypeId.ROADMAP
            , scrollwheel: false
            , mapTypeControl: false
        };
        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        var marker = new google.maps.Marker({
            map: map
            , position: new google.maps.LatLng(40.801485408197856, -73.96745953467104) //change the coordinates
        });
        var infowindow = new google.maps.InfoWindow({
            content: "<b>CHRIS JOHNSON</b><br/>2550 Santa Monica Boulevard<br/> Los Angeles" //add your address
        });
        google.maps.event.addListener(marker, "click", function () {
            infowindow.open(map, marker);
        });
        infowindow.open(map, marker);
    });
   
    
    // TOP MENU ACTIVE
    $('ul.top-menu li a').click(function () {
        $('ul.top-menu li a').removeClass("selected");
        $(this).addClass("selected");
    });
   
    
    // SIDEBAR SCROLL
    $(function () {
        $('.widget-out').perfectScrollbar({
            wheelSpeed: 50
        });
    });
   
    
    //SLIDE MENU
    (function ($) {
        $(".right-menu").on('click', function () {
            $("body").hasClass("slidemenu-opened") ? k() : T()
        });
    })(jQuery);

    function T() {
        $("body").addClass("slidemenu-opened")
    }

    function k() {
        $("body").removeClass("slidemenu-opened")
    }
    
    
    // RESPONSIVE MENU
    $('.responsive-menu').click(function () {
        $('.top-menu li').slideToggle();
    });
    
    
});


/* Contact Form JS*/
(function ($) {
    'use strict';
    $(".contact-form").on('submit', function (e) {
        e.preventDefault();
        var uri = $(this).attr('action');
        $("#con_submit").val('Wait...');
        var con_name = $("#con_name").val();
        var con_email = $("#con_email").val();
        var con_message = $("#con_message").val();
        var required = 0;
        $(".requie", this).each(function () {
            if ($(this).val() == '') {
                $(this).addClass('reqError');
                required += 1;
            }
            else {
                if ($(this).hasClass('reqError')) {
                    $(this).removeClass('reqError');
                    if (required > 0) {
                        required -= 1;
                    }
                }
            }
        });
        if (required === 0) {
            $.ajax({
                type: "POST"
                , url: 'mail.php'
                , data: {
                    con_name: con_name
                    , con_email: con_email
                    , con_message: con_message
                }
                , success: function (data) {
                    $(".contact-form input, .contact-form textarea").val('');
                    $("#con_submit").val('Done!');
                    $("#con_submit").addClass("ok");
                }
            });
        }
        else {
            $("#con_submit").val('Failed!');
        }
    });
    $(".requie").on('keyup', function () {
        $(this).removeClass('reqError');
    });
})(jQuery);