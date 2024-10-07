async function fetchWeatherData() {
    // Array of locations
    const locations = [
        {name: "Oslo", latitude: 59.9139, longitude: 10.7522},
        {name: "Stockholm", latitude: 59.334591, longitude: 18.063240},
        {name: "Toronto", latitude: 43.651070, longitude: -79.347015},
        {name: "Vienna", latitude: 48.210033, longitude: 16.363449},
        {name: "Bergen", latitude: 60.39299, longitude: 5.32415}
    ];

    // Looping through each location
    for (const location of locations) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            const weather = data.current_weather;

            const weatherData = document.createElement('div');
            weatherData.innerHTML = `
                <h3>${location.name}</h3>
                <p>Temperature: ${weather.temperature}°C</p>
                <p>Windspeed: ${weather.windspeed} km/h</p>
                <p>Wind Direction: ${weather.winddirection}°</p>
                <p>Time: ${weather.time}</p>
                <p>Elevation: ${data.elevation} meters</p>
            `;

            document.getElementById('weather-info').appendChild(weatherData);

        } catch (error) {
            console.error(`Error fetching weather data for ${location.name}:`, error);
        }
    }
}

fetchWeatherData();
setInterval(fetchWeatherData, 900000); // updates every 15-minutes (could not find a way to update without multiplication// )