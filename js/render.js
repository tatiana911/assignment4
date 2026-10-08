const status = document.querySelector("#status");
const searchButton = document.querySelector("#search-button");
const weatherResult = document.querySelector("#weather-result");

const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");
const conditions = document.querySelector("#conditions");
const weatherIcon = document.querySelector("#weather-icon");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
export function setStatus(state, message) {
    status.dataset.state = state;
    status.textContent = message;

    searchButton.disabled = state === "loading";
}
function getWeatherInfo(code) {
    if (code === 0) {
        return { description: "Clear sky", icon: "☀️" };
    } else if (code === 1) {
        return { description: "Mainly clear", icon: "🌤️" };
    } else if (code === 2) {
        return { description: "Partly cloudy", icon: "⛅" };
    } else if (code === 3) {
        return { description: "Overcast", icon: "☁️" };
    } else if (code === 45 || code === 48) {
        return { description: "Fog", icon: "🌫️" };
    } else if (code >= 51 && code <= 57) {
        return { description: "Drizzle", icon: "🌦️" };
    } else if (code >= 61 && code <= 67) {
        return { description: "Rain", icon: "🌧️" };
    } else if (code >= 71 && code <= 77) {
        return { description: "Snow", icon: "❄️" };
    } else if (code >= 80 && code <= 82) {
        return { description: "Rain showers", icon: "🌧️" };
    } else if (code === 85 || code === 86) {
        return { description: "Snow showers", icon: "🌨️" };
    } else if (code >= 95 && code <= 99) {
        return { description: "Thunderstorm", icon: "⛈️" };
    } else {
        return { description: "Unknown conditions", icon: "❔" };
    }
}
export function renderWeather(city, data) {
    const current = data.current;
    const info = getWeatherInfo(current.weather_code);

    cityName.textContent = city.name;
    temperature.textContent = `${current.temperature_2m}°C`;
    conditions.textContent = info.description;
    weatherIcon.textContent = info.icon;
    humidity.textContent = `Humidity: ${current.relative_humidity_2m}%`;
    windSpeed.textContent = `Wind speed: ${current.wind_speed_10m} km/h`;

    weatherResult.classList.remove("hidden");
}

export function hideWeather() {
    weatherResult.classList.add("hidden");
}