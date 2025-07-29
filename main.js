"use strict"; // Using Strict Mode

const RAPIDAPI_KEY = '5c615a369emshebf286614108016p101146jsn0f5419658a2f';

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

    // JS Code for Google Maps API
document.getElementById("googlemap_input").addEventListener("input", function () {
  const query = this.value;

  if (query.length < 3) return; // wait until user types a few letters

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
      console.log('API Response:', data); // For debugging
      const resultsList = document.getElementById("results");
      resultsList.innerHTML = ""; // clear previous results

      const predictions = data.predictions || [];

      predictions.forEach(place => {
        const li = document.createElement("li");
        li.textContent = place.description;
        li.style.cursor = "pointer";
        li.style.padding = "5px";
        li.style.borderBottom = "1px solid #eee";
        resultsList.appendChild(li);
      });

      if (predictions.length === 0) {
        resultsList.innerHTML = "<li>No results found</li>";
      }
    })
    .catch(error => {
      console.error("API Error Details:", error);
      const resultsList = document.getElementById("results");
      resultsList.innerHTML = "<li>Error: Unable to search places. Please check console for details.</li>";
    });
    });
});



