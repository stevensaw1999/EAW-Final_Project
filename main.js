"use strict"; // Using Strict Mode

$(document).ready(function() {
    // Initialize jQuery UI Accordion for professional staff bios
    $("#accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
        animate: 300
    });

    // Initialize Slick Carousel Functionality for partners section
    $('.partner-carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 769, 
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});

// Section for Loading Slick Carousel

