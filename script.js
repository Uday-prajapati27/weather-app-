const elements = {
    searchBtn: document.getElementById("searchBtn"),
    cityInput: document.getElementById("cityInput"),
    cityName: document.getElementById("cityName"),
    temperature: document.getElementById("temperature"),
    description: document.getElementById("description"),
    weatherBox: document.querySelector(".weather-box")
};

const appState = {
    isLoading: false
};

const weatherData = {
    delhi: { temp: 34, desc: "Sunny", type: "sunny" },
    mumbai: { temp: 29, desc: "Humid Clouds", type: "cloudy" },
    aligarh: { temp: 28, desc: "Clear Sky", type: "clear" },
    lucknow: { temp: 31, desc: "Hazy Sun", type: "sunny" },
    shimla: { temp: 18, desc: "Cool Breeze", type: "cold" },
    chennai: { temp: 32, desc: "Warm and Humid", type: "humid" },
    kolkata: { temp: 30, desc: "Light Rain", type: "rainy" },
    jaipur: { temp: 36, desc: "Dry Heat", type: "hot" }
};

function normalizeCityName(city) {
    return city.trim().toLowerCase();
}

function formatCityName(city) {
    return city
        .trim()
        .split(" ")
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

function setLoadingState(loading) {
    appState.isLoading = loading;
    elements.searchBtn.disabled = loading;
    elements.searchBtn.textContent = loading ? "Searching..." : "Search";
    elements.cityInput.disabled = loading;
    elements.weatherBox.classList.toggle("loading", loading);
}

function showMessage({ city, tempText, descText, type = "default" }) {
    elements.cityName.innerText = city;
    elements.temperature.innerText = tempText;
    elements.description.innerText = descText;

    elements.weatherBox.setAttribute("data-weather", type);
    elements.weatherBox.classList.remove("show");
    void elements.weatherBox.offsetWidth;
    elements.weatherBox.classList.add("show");
}

function showError(message) {
    showMessage({
        city: "City not found",
        tempText: "Temperature: --",
        descText: message,
        type: "error"
    });
}

function getWeatherByCity(city) {
    const key = normalizeCityName(city);
    return weatherData[key] || null;
}

function handleSearch() {
    const rawCity = elements.cityInput.value;

    if (!rawCity.trim()) {
        showError("Please enter a city name.");
        elements.cityInput.focus();
        return;
    }

    setLoadingState(true);

    setTimeout(() => {
        const result = getWeatherByCity(rawCity);

        if (result) {
            showMessage({
                city: formatCityName(rawCity),
                tempText: `Temperature: ${result.temp}°C`,
                descText: `Weather: ${result.desc}`,
                type: result.type
            });
        } else {
            showMessage({
                city: formatCityName(rawCity),
                tempText: "Temperature: 27°C",
                descText: "Weather: Weather data updated",
                type: "default"
            });
        }

        setLoadingState(false);
    }, 700);
}

elements.searchBtn.addEventListener("click", handleSearch);

elements.cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

elements.cityInput.addEventListener("input", () => {
    if (elements.cityInput.value.trim().length > 0) {
        elements.weatherBox.classList.remove("input-error");
    }
});

showMessage({
    city: "Aligarh",
    tempText: "Temperature: 28°C",
    descText: "Weather: Clear Sky",
    type: "clear"
});