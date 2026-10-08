import { getCity, getWeather } from "./api.js";
import { setStatus, renderWeather, hideWeather } from "./render.js";

const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");

async function handleSearch(event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    hideWeather();

    if (!city) {
        setStatus("error", "Please enter a city name.");
        return;
    }

    setStatus("loading", `Loading weather for ${city}...`);

    try {
        const location = await getCity(city);

        const weather = await getWeather(
            location.latitude,
            location.longitude
        );

        renderWeather(location, weather);
        setStatus("success", "Weather updated.");
    } catch (error) {
        if (error instanceof TypeError) {
            setStatus(
                "error",
                "Could not reach the weather service. Check your connection and try again."
            );
        } else {
            setStatus("error", error.message);
        }
    }
}

form.addEventListener("submit", handleSearch);