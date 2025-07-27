"use strict"; // Using Strict Mode

$(document).ready(function() {
    // Initialize jQuery UI Accordion for images
    $("#accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
        animate: 300
    });
    
    // Create Accordion Bios
    if ($('.employee-slideshow').length > 0) {
        $('.employee-slideshow').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            arrows: true,
            fade: true,
            speed: 500,
            cssEase: 'ease-in-out',
            pauseOnHover: true,

            // Responsive settings for the slideshow
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
    }
});


// Section for Loading API Data from Google Maps
