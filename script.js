// Try using Leaflet, OpenStreetMap, and Overpass to create a map that tracks one particular type of data



const weatherAPIKey = "23d272a09ce577ff8776ec8c3049893b";
const searchFormEl = document.querySelector("#user-form");

let cityInput = document.getElementById("city");

let todayWeatherContainerEl = document.getElementById("today-weather");
let forecastContainerEl = document.getElementById("weather-container");

// let formSubmitHandler = function (event) {
//     event.preventDefault();

//     let cityName = cityInput.value.trim();

//     if (cityName) {
//         getCurrentWeather(cityName);

//     } else {
//         alert('Please enter a city name');
//     }
// }

let getCurrentWeather = function(city) {

    let cityURL = "https://api.openweathermap.org/geo/1.0/direct?q=Oceanside&appid=" + weatherAPIKey;
    let coordinates;
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
                    coordinates = "lat=" + latitude + "&lon=" + longitude;

                    return fetch("https://api.openweathermap.org/data/2.5/onecall?" + coordinates + "&exclude=minutely,hourly" + "&appid=" + weatherAPIKey + "&units=imperial")
                        .then(function (response) {
                            if (response.ok) {
                                console.log(response);
                                response.json().then(function (data) {
                                    console.log(data);
                                    // displayWeather(data, city);
                                })
                            } else {
                                alert('Error: ' + response.statusText);
                            }
                        })
                        .catch(function (error) {
                            alert('Unable to connect to OpenWeather');
                        });

                })
            }
        })
}

getCurrentWeather();


/*
Query for nodes, ways and relations that use the disused tag namespace to indicate that they're no longer in use.

This might be a useful query as a reminder for places to resurvey to check
to see if they are still disused or may have reopened.

@title Disused amenities and buildings
@see https://wiki.openstreetmap.org/wiki/Key:disused
 */
// [bbox:48.83823376774687,2.3102724552154537,48.84333197107045,2.318887710571289];
// (
//   nwr["disused:amenity"];
//   nwr["disused:building"];
//   nwr["disused:tourism"];
// );
// out body;
// >;
// out skel qt;
