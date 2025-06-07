async function getWeather() {
    let location = document.getElementById("locationInput").value;
    
    // Default location if user doesn't enter anything
    if (!location) {
        location = "Delhi";
    }

    let apiKey = "dae3846ae8414b70ac6184438250706";
    let weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        let response = await fetch(weatherUrl);
        let data = await response.json();

        let city = data.location.name;
        let country = data.location.country;
        let temp = data.current.temp_c;
        let weather = data.current.condition.text;
        let icon = data.current.condition.icon;
        let windSpeed = data.current.wind_kph;
        let humidity = data.current.humidity;

        document.getElementById("weatherResult").innerHTML = `
            <h2>Weather in ${city}, ${country}</h2>
            <img src="https:${icon}" alt="${weather}">
            <p>🌡️ Temperature: ${temp}°C</p>
            <p>🌤️ Condition: ${weather}</p>
            <p>💨 Wind Speed: ${windSpeed} kph</p>
            <p>💧 Humidity: ${humidity}%</p>
        `;
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = "❌ Error fetching weather data.";
    }
}

// Auto-update weather every 10 minutes
setInterval(getWeather, 600000);
