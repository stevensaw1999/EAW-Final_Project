"use strict"; // Using Strict Mode

//const RAPIDAPI_KEY = '5c615a369emshebf286614108016p101146jsn0f5419658a2f'; Reached API Call Limit - I have to disable
const RAPIDAPI_KEY = null;

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
let searchTimeout;
let lastQuery = '';

document.getElementById("googlemap_input").addEventListener("input", function () {
  const query = this.value.trim();
  const statusDiv = document.getElementById("search-status");

  // Clear any existing timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Clear results if query is too short
  if (query.length < 3) {
    document.getElementById("results").innerHTML = "";
    statusDiv.textContent = query.length > 0 ? "Type at least 3 characters to search" : "";
    return;
  }

  // Don't search if it's the same query as before
  if (query === lastQuery) {
    return;
  }

  // Show waiting message
  statusDiv.textContent = "Searching in 0.8 seconds...";
  statusDiv.style.color = "#999";

  // Wait 800ms after user stops typing before making API call
  searchTimeout = setTimeout(() => {
    lastQuery = query;
    statusDiv.textContent = "Searching...";
    statusDiv.style.color = "#007bff";
    console.log('Making API call for:', query);
    
    const url = 'https://google-map-places-new-v2.p.rapidapi.com/v1/places:autocomplete';

    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'google-map-places-new-v2.p.rapidapi.com',
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': '*'
      },
      body: JSON.stringify({
        input: query,
        location: { latitude: 37.7749, longitude: -122.4194 },
        radius: 5000
      })
    };

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);
        const resultsList = document.getElementById("results");
        resultsList.innerHTML = "";

        const predictions = data.predictions || [];

        if (predictions.length > 0) {
          statusDiv.textContent = `Found ${predictions.length} result${predictions.length > 1 ? 's' : ''}`;
          statusDiv.style.color = "#28a745";

          predictions.forEach(place => {
            const li = document.createElement("li");
            li.textContent = place.description;
            li.style.cursor = "pointer";
            li.style.padding = "10px";
            li.style.borderBottom = "1px solid #eee";
            li.style.transition = "background-color 0.2s";
            
            // Add hover effect
            li.addEventListener('mouseenter', function() {
              this.style.backgroundColor = '#f5f5f5';
            });
            li.addEventListener('mouseleave', function() {
              this.style.backgroundColor = 'white';
            });
            
            // Add click to select functionality
            li.addEventListener('click', function() {
              document.getElementById("googlemap_input").value = this.textContent;
              document.getElementById("results").innerHTML = "";
              statusDiv.textContent = "Selected: " + this.textContent;
              statusDiv.style.color = "#28a745";
              console.log('Selected:', this.textContent);
            });
            
            resultsList.appendChild(li);
          });
        } else {
          resultsList.innerHTML = "<li style='padding: 10px; color: #666;'>No results found</li>";
          statusDiv.textContent = "No results found";
          statusDiv.style.color = "#dc3545";
        }
      })
      .catch(error => {
        console.error("API Error Details:", error);
        const resultsList = document.getElementById("results");
        
        // Show user-friendly error messages
        if (error.message.includes('401')) {
          resultsList.innerHTML = "<li style='padding: 10px; color: red;'>❌ Invalid API Key</li>";
          statusDiv.textContent = "API Key Error";
        } else if (error.message.includes('403')) {
          resultsList.innerHTML = "<li style='padding: 10px; color: red;'>❌ API Limit Exceeded</li>";
          statusDiv.textContent = "API Limit Exceeded";
        } else if (error.message.includes('429')) {
          resultsList.innerHTML = "<li style='padding: 10px; color: red;'>❌ Too Many Requests - Please wait</li>";
          statusDiv.textContent = "Rate Limited - Please wait";
        } else {
          resultsList.innerHTML = "<li style='padding: 10px; color: red;'>❌ Search Error</li>";
          statusDiv.textContent = "Search Error";
        }
        statusDiv.style.color = "#dc3545";
      });
  }, 800); // Wait 800ms after user stops typing, prevents excessive API calls - I went over the limit while testing... oops
});

}); // End of document ready function



