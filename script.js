
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {

    const city = document.getElementById("cityInput").value;

    document.getElementById("cityName").innerText = city;

    document.getElementById("temperature").innerText =
        "Temperature: 28°C";

    document.getElementById("description").innerText =
        "Weather: Clear Sky";
});

