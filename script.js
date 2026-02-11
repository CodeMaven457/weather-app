const apiKey = "1d68299167ee30fc47cf5a0cca9dd93c"; // Replace with your actual OpenWeatherMap API key

function fetchWeather() {
  const city = document.getElementById("cityInput").value;
  const result = document.getElementById("weatherResult");

  if (!city) {
    result.innerHTML = "<p>Please enter a city.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const { name, main, weather, wind, dt, timezone } = data;
      const localTime = new Date((dt + timezone) * 1000).toUTCString().replace("GMT", "Local Time");

      result.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Temperature:</strong> ${main.temp} °C</p>
        <p><strong>Weather:</strong> ${weather[0].description}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
        <p><strong>Local Time:</strong> ${localTime}</p>
      `;
    })
    .catch(error => {
      result.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
