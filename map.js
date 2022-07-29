// Building the map and centering it on San Diego - this uses Leaflet, an open-source JS library and tiles from OpenStreetMaps

let map = L.map('map').setView([32.7157, -117.1611], 12);

let hotels = document.getElementById('hotels');
let artworks = document.getElementById('artworks');
let museums = document.getElementById('museums');

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

                    let north = map.getBounds().getNorth();
                    let east = map.getBounds().getEast();
                    let south = map.getBounds().getSouth();
                    let west = map.getBounds().getWest();

                    let bbox = south + ',' + west + ',' + north + ',' + east;
                    console.log(bbox);

                    if (museums) {
                    fetch(

                        'https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["tourism"="museum"](' + bbox + ');way["tourism"="museum"](' + bbox + ');relation["tourism"="museum"](' + bbox + '););out;>;out skel qt;'
                    )
                        .then((result) => {
                            return result.json();
                        })
                        .then((data) => {
                            console.log(data);
                        })
                    }

                })
            }
        })
};


// object keys: lat lon tags.name

/*

markers = [
   {
     "name": tags.name,
     "lat": lat,
     "lng": lon
   },

for (var i=0; i < markers.length; ++i) 
{
   L.marker([markers[i].lat, markers[i].lng])
      .bindPopup('<a href="" target="_blank" rel="noopener">' + markers[i].name + '</a>')
      .addTo(map);
}

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

*/


searchFormEl.addEventListener("click", formSubmitHandler);

