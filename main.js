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

        // Allows the Slides to Auto-Play depending on playspeed - I chose for it to display 3 companies per slide
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,

        // Removes unnecessary Next/Previous Buttons and Removes Numbered Buttons
        dots: false,
        arrows: false,
        responsive: [

            // Fix Breakpoints for Responsive Mobile to Web Browser Design
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



