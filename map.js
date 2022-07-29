// Building the map and centering it on San Diego - this uses Leaflet, an open-source JS library and tiles from OpenStreetMaps
var map = L.map('map').setView([32.7157, -117.1611], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

const weatherAPIKey = API_KEY;
const searchFormEl = document.querySelector("#search-btn");

let cityInput = document.getElementById("city-name");

let formSubmitHandler = function (event) {
    event.preventDefault();

    let cityName = cityInput.value.trim();

    if (cityName) {
        relocate(cityName);

    } else {
        alert('Please enter a city name');
    }
}

let relocate = function (city) {

    let cityURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + weatherAPIKey;
    let latLonData;

    fetch(cityURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    latLonData = data;
                    console.log(latLonData);

                    let latitude = data[0].lat;
                    let longitude = data[0].lon;

                    map.panTo([latitude, longitude]);

                })
            }
        })
};

searchFormEl.addEventListener("click", formSubmitHandler);