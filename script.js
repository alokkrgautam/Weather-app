async function getWeather() {
    let location = document.getElementById("locationInput").value;
    
    if (!location) {
        location = "Delhi"; // Default value
    }

    let apiKey = "dae3846ae8414b70ac6184438250706";
    let weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        let response = await fetch(weatherUrl);

        if (!response.ok) {
            throw new Error("API request failed!");
        }

        let data = await response.json();

        if (!data.location) {
            throw new Error("Invalid location input!");
        }

        let city = data.location.name;
        let country = data.location.country;
        let temp = data.current.temp_c;
        let weather = data.current.condition.text;
        let icon = data.current.condition.icon;

        document.getElementById("weatherResult").innerHTML = `
            <h2>Weather in ${city}, ${country}</h2>
            <img src="https:${icon}" alt="${weather}">
            <p>🌡️ Temperature: ${temp}°C</p>
            <p>🌤️ Condition: ${weather}</p>
        `;
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = `❌ Error: ${error.message}`;
    }
}
