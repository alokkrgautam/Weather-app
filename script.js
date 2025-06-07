async function getWeather() {
    let location = document.getElementById("locationInput").value;
    if (!location) {
        alert("Please enter a location!");
        return;
    }

    let apiKey = "d1f33ac867db4520aa9172900250706";
    let searchUrl = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${location}`;

    try {
        let searchResponse = await fetch(searchUrl);
        let locations = await searchResponse.json();

        // Filter locations specifically for India first
        let indiaLocations = locations.filter(loc => loc.country === "India");

        if (indiaLocations.length === 0) {
            // If no Indian location found, show all results for selection
            generateDropdown(locations);
        } else if (indiaLocations.length === 1) {
            // Directly fetch weather for the single Indian city found
            fetchWeather(indiaLocations[0].name);
        } else {
            // Multiple Indian locations found, let user select
            generateDropdown(indiaLocations);
        }
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = "Error searching for location.";
    }
}

function generateDropdown(locations) {
    let dropdown = `<p>Multiple locations found, please select:</p>`;
    dropdown += `<select id="citySelect" onchange="fetchWeather(this.value)">`;
    locations.forEach(city => {
        dropdown += `<option value="${city.name}">${city.name}, ${city.country}</option>`;
    });
    dropdown += `</select>`;

    document.getElementById("weatherResult").innerHTML = dropdown;
}

async function fetchWeather(city) {
    let apiKey = "d1f33ac867db4520aa9172900250706";
    let weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        let weatherResponse = await fetch(weatherUrl);
        let data = await weatherResponse.json();

        let cityName = data.location.name;
        let country = data.location.country;
        let temp = data.current.temp_c;
        let weather = data.current.condition.text;

        document.getElementById("weatherResult").innerHTML = `
            <h2>Weather in ${cityName}, ${country}</h2>
            <p>Temperature: ${temp}°C</p>
            <p>Condition: ${weather}</p>
        `;
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = "Error fetching weather data.";
    }
}

// Geolocation fallback—detect user location
async function detectLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let apiKey = "d1f33ac867db4520aa9172900250706";
            let geoUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

            let response = await fetch(geoUrl);
            let data = await response.json();
            
            fetchWeather(data.location.name);
        });
    } else {
        alert("Geolocation is not supported in your browser.");
    }
}