async function getWeather() {
    let location = document.getElementById("locationInput").value;
    
    // If no input, use default location (e.g., "Delhi, India")
    if (!location) {
        location = "Delhi";
    }

    let apiKey = "d1f33ac867db4520aa9172900250706";
    let weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        let response = await fetch(weatherUrl);
        let data = await response.json();

        let city = data.location.name;
        let country = data.location.country;
        let temp = data.current.temp_c;
        let weather = data.current.condition.text;

        document.getElementById("weatherResult").innerHTML = `
            <h2>Weather in ${city}, ${country}</h2>
            <p>Temperature: ${temp}°C</p>
            <p>Condition: ${weather}</p>
        `;
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = "Error fetching weather data.";
    }
}
