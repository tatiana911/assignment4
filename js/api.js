export async function getJSON(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("Too many requests. Please try again later.");
            }

            throw new Error(`Request failed (${response.status}). Please try again.`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
export async function getCity(city) {
    const params = new URLSearchParams({
        name: city,
        count: 1
    });

    const url = `https://geocoding-api.open-meteo.com/v1/search?${params}`;

    const data = await getJSON(url);

    if (!data.results || data.results.length === 0) {
        throw new Error("City not found. Please check the spelling.");
    }

    return data.results[0];
}
export async function getWeather(latitude, longitude) {
    const params = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
        current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
        timezone: "auto"
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params}`;

    const data = await getJSON(url);

    return data;
}