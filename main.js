"use strict"; // Using Strict Mode

$(document).ready(function() {
    // Initialize jQuery UI Accordion for professional staff bios
    $("#accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
        animate: 300
    });

    // Smooth scrolling for navigation links
    $('nav a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70 // Account for sticky header
            }, 600);
        }
    });

    // Form validation and submission handling
    $('form').on('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = $(this).find('[required]');
        let isValid = true;
        
        requiredFields.each(function() {
            if (!$(this).val().trim()) {
                isValid = false;
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });
        
        if (isValid) {
            // Simulate form submission
            alert('Thank you for your application! We will contact you soon.');
            $(this)[0].reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Remove error styling when user starts typing
    $('input, textarea').on('input', function() {
        $(this).removeClass('error');
    });

    // Add hover effects to job button
    $('.job-btn').hover(
        function() {
            $(this).css('background-color', 'var(--hover-color)');
        },
        function() {
            $(this).css('background-color', 'var(--primary-color)');
        }
    );

    console.log('Education At Work Webpage JS Loaded Successfully');
});


// Section for Loading API Data from Google Maps
