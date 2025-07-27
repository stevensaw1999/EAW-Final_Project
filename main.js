"use strict"; // Using Strict Mode

$(document).ready(function() {
    // Initialize Employee Slideshow
    $('.employee-slideshow').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true,
        fade: true,
        speed: 500,
        cssEase: 'ease-in-out',
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true
                }
            }
        ]
    });
});

