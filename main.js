"use strict"; // Using Strict Mode

// Slick Plugin https://kenwheeler.github.io/slick
// Used Course Material for Third Party API Integration
// https://jqueryui.com/accordion for Accordion Functionality

//const RAPIDAPI_KEY = '5c615a369emshebf286614108016p101146jsn0f5419658a2f'; Reached API Call Limit - I have to disable
const RAPIDAPI_KEY = null;

$(document).ready(function() {
    // Web Storage functionality for form submissions
    function createUser(e) {
        e.preventDefault(); // Prevent default form submission

        // Get form inputs
        let fnameInput = document.getElementById("f-name");
        let lnameInput = document.getElementById("l-name");
        let emailInput = document.getElementById("email");
        let resumeInput = document.getElementById("resume");

        // Validate inputs
        if (!fnameInput.value.trim() || !lnameInput.value.trim() || !emailInput.value.trim()) {
            alert("Please fill in all required fields.");
            return;
        }

        // Create user object
        const userData = {
            firstName: fnameInput.value.trim(),
            lastName: lnameInput.value.trim(),
            email: emailInput.value.trim(),
            resumeFile: resumeInput.files[0] ? resumeInput.files[0].name : null,
            submittedAt: new Date().toISOString()
        };

        try {
            // Store user data in localStorage
            localStorage.setItem("eaw_application", JSON.stringify(userData));
            
            // Also store in sessionStorage for current session
            sessionStorage.setItem("current_user", JSON.stringify(userData));
            
            // Success feedback
            alert(`Application submitted successfully!\nName: ${userData.firstName} ${userData.lastName}\nEmail: ${userData.email}`);
            
            // Clear form
            document.querySelector('#apply form').reset();
            
            console.log("User data stored:", userData);
            
        } catch (error) {
            console.error("Error storing user data:", error);
            alert("Error submitting application. Please try again.");
        }
    }

    // Bind the createUser function to form submission
    const applicationForm = document.querySelector('#apply form');
    if (applicationForm) {
        applicationForm.addEventListener('submit', createUser);
    }

    // Function to retrieve stored user data
    function getStoredUserData() {
        try {
            const storedData = localStorage.getItem("eaw_application");
            return storedData ? JSON.parse(storedData) : null;
        } catch (error) {
            console.error("Error retrieving user data:", error);
            return null;
        }
    }

    // Function to check if user has previously applied
    function checkPreviousApplication() {
        const userData = getStoredUserData();
        if (userData) {
            console.log("Previous application found:", userData);
            // Optionally pre-fill form or show message
            return true;
        }
        return false;
    }

    // Check for previous applications on page load
    checkPreviousApplication();

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



    // Initialize Google Map 
    window.initMap = function() {
        // Check if Google Maps API is loaded
        if (typeof google !== 'undefined' && google.maps) {
            const map = new google.maps.Map(document.getElementById("google-map"), {
                center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
                zoom: 4,
            });

            // Add a marker for Education At Work headquarters 
            const marker = new google.maps.Marker({
                position: { lat: 42.3601, lng: -71.0589 },
                map: map,
                title: 'Education At Work'
            });
        } else {
            console.log('Google Maps API not loaded');
            // Show a fallback message
            const mapDiv = document.getElementById("google-map");
            if (mapDiv) {
                mapDiv.innerHTML = '<div style="padding: 20px; text-align: center; background-color: #f0f0f0; border: 2px dashed #ccc;">Google Maps API not available. Please add a valid API key to display the map.</div>';
            }
        }
    };

    // Call initMap directly if Google Maps API isn't loaded
    if (typeof google === 'undefined') {
        initMap();
    }

    // JS Code for Google Maps API with throttling to prevent excessive calls
    let searchTimeout;  // Stores timeout reference for debouncing
    let lastQuery = ''; // Prevents duplicate searches for the same thing

    // Event listener for search input - triggers when user types in the search box
    document.getElementById("googlemap_input").addEventListener("input", function () {
        const query = this.value.trim();                           // Get what the user typed, cleaned up
        const statusDiv = document.getElementById("search-status"); // Element to show search status messages

        // Clear any existing timeout - resets the timer if user is still typing
        if (searchTimeout) {
            clearTimeout(searchTimeout);
            console.log("Cleared previous search timeout");
        }

        // Clear results if query is too short - need at least 3 characters for meaningful search
        if (query.length < 3) {
            document.getElementById("results").innerHTML = ""; // Clear any previous results
            statusDiv.textContent = query.length > 0 ? "Type at least 3 characters to search" : ""; // Helpful message
            console.log("Query too short, not searching");
            return; // Exit early
        }

        // Don't search if it's the same query as before - prevents duplicate API calls
        if (query === lastQuery) {
            console.log("Same query as before, skipping search");
            return;
        }

        // Show waiting message - lets user know something is happening
        statusDiv.textContent = "Searching in 0.8 seconds...";
        statusDiv.style.color = "#999"; // Gray color for waiting state
        console.log("Search delayed, waiting for user to stop typing");

        // Wait 800ms after user stops typing before making API call - this is the throttling part
        searchTimeout = setTimeout(() => {
            lastQuery = query; // Remember this query to prevent duplicates
            statusDiv.textContent = "Searching...";
            statusDiv.style.color = "#007bff"; // Blue color for active searching
            console.log('Making API call for:', query);
            
            // Check if we have an API key - don't want to make calls without one
            if (!RAPIDAPI_KEY) {
                console.log("No API key available - showing disabled message");
                statusDiv.textContent = "Places search is currently disabled"; // Let user know why it's not working
                statusDiv.style.color = "#dc3545"; // Red color for error
                document.getElementById("results").innerHTML = "<li style='padding: 10px; color: #666;'>Places search functionality is currently disabled to prevent API quota usage.</li>";
                return; // Exit if no API key
            }
            
            // Google Places API endpoint
            const url = 'https://google-map-places-new-v2.p.rapidapi.com/v1/places:autocomplete';

            // API request configuration - headers and request body
            const options = {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,                                    // API authentication
                    'x-rapidapi-host': 'google-map-places-new-v2.p.rapidapi.com',     // Required host header
                    'Content-Type': 'application/json',                               // JSON request body
                    'X-Goog-FieldMask': '*'                                          // Return all available fields
                },
                body: JSON.stringify({
                    input: query,                                        // What the user searched for
                    location: { latitude: 37.7749, longitude: -122.4194 }, // San Francisco as reference point - could change this
                    radius: 5000                                         // 5km search radius - reasonable area
                })
            };

            // Make the API request with error handling
            fetch(url, options)
                .then(response => {
                    console.log('API Response Status:', response.status);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`); // Throw error for bad status codes
                    }
                    return response.json(); // Parse the JSON response
                })
                .then(data => {
                    console.log('API Response:', data); // Log the full response for debugging
                    const resultsList = document.getElementById("results");
                    resultsList.innerHTML = ""; // Clear previous results

                    const predictions = data.predictions || []; // Get predictions array, empty array if none

                    if (predictions.length > 0) {
                        // Update status with how many results we found
                        statusDiv.textContent = `Found ${predictions.length} result${predictions.length > 1 ? 's' : ''}`;
                        statusDiv.style.color = "#28a745"; // Green for success

                        // Create clickable list items for each result
                        predictions.forEach(place => {
                            const li = document.createElement("li");
                            li.textContent = place.description; // Place name and address
                            
                            // Style the list item to look good and be interactive
                            li.style.cursor = "pointer";                    // Show it's clickable
                            li.style.padding = "10px";                      // Add some padding for touch targets
                            li.style.borderBottom = "1px solid #eee";       // Visual separation between items
                            li.style.transition = "background-color 0.2s";  // Smooth hover effect
                            
                            // Add hover effect for better user experience
                            li.addEventListener('mouseenter', function() {
                                this.style.backgroundColor = '#f5f5f5'; // Light gray on hover
                            });
                            li.addEventListener('mouseleave', function() {
                                this.style.backgroundColor = 'white';   // Back to white when not hovering
                            });
                            
                            // Add click to select functionality - lets user pick a result
                            li.addEventListener('click', function() {
                                document.getElementById("googlemap_input").value = this.textContent; // Fill search box with selected result
                                document.getElementById("results").innerHTML = "";                    // Clear results list
                                statusDiv.textContent = "Selected: " + this.textContent;             // Show what was selected
                                statusDiv.style.color = "#28a745";                                   // Green for success
                                console.log('User selected:', this.textContent);                     // Log the selection
                            });
                            
                            resultsList.appendChild(li); // Add the list item to the results
                        });
                    } else {
                        // No results found - show appropriate message
                        resultsList.innerHTML = "<li style='padding: 10px; color: #666;'>No results found</li>";
                        statusDiv.textContent = "No results found";
                        statusDiv.style.color = "#dc3545"; // Red for no results
                        console.log("No results found for query:", query);
                    }
                })
                .catch(error => {
                    // Handle API errors with user-friendly messages
                    console.error("API Error Details:", error);
                    const resultsList = document.getElementById("results");
                    
                    // Show user-friendly error messages based on the specific error
                    if (error.message.includes('401')) {
                        // 401 Unauthorized - bad API key
                        resultsList.innerHTML = "<li style='padding: 10px; color: red;'>❌ Invalid API Key</li>";
                        statusDiv.textContent = "API Key Error";
                        console.error("API key is invalid or expired");
                    } else if (error.message.includes('403')) {
                        // 403 Forbidden - quota exceeded or API disabled
                        resultsList.innerHTML = "<li style='padding: 10px; color: red;'>❌ API Limit Exceeded</li>";
                        statusDiv.textContent = "API Limit Exceeded";
                        console.error("Hit the API quota limit - need to upgrade or wait");
                    } else if (error.message.includes('429')) {
                        // 429 Too Many Requests - rate limiting
                        resultsList.innerHTML = "<li style='padding: 10px; color: red;'>❌ Too Many Requests - Please wait</li>";
                        statusDiv.textContent = "Rate Limited - Please wait";
                        console.error("Making requests too fast - need to slow down");
                    } else {
                        // Generic error for anything else
                        resultsList.innerHTML = "<li style='padding: 10px; color: red;'>❌ Search Error</li>";
                        statusDiv.textContent = "Search Error";
                        console.error("Something went wrong with the search:", error.message);
                    }
                    statusDiv.style.color = "#dc3545"; // Red for all error states
                });
        }, 800); // Wait 800ms after user stops typing, prevents excessive API calls - I went over the limit while testing... oops
        
        console.log("Search timeout set for 800ms - waiting for user to stop typing");
    });
    
    console.log("Google Places search functionality initialized with throttling to prevent API overuse");

}); // End of document ready function - everything above runs when the page loads


