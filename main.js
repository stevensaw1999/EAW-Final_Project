"use strict"; // Using Strict Mode

$(document).ready(function() {
    // Initialize Employee Slideshow
    console.log('Initializing slideshow...');
    
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
            prevArrow: '<button type="button" class="slick-prev">‹</button>',
            nextArrow: '<button type="button" class="slick-next">›</button>',
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
        console.log('Slideshow initialized successfully!');
    } else {
        console.log('Slideshow element not found!');
    }
});

