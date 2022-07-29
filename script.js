
// openstreetmap API
var API_KEY = "8bf5f2722c9876aa403f1c90a0b421c1";
var searchButton = document.querySelector("searchButton");
var searchForm = document.querySelector("#search-btn");
var cityInputEl = document.querySelector("#city-name")
searchForm.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(cityInputEl.value)
  getLatandLon(cityInputEl.value);
});

function getLatandLon(cityName) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
  )
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      currentWeather(data[0].lat, data[0].lon);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
function currentWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts,daily&units=imperial&appid=${API_KEY}`
  )
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      displayWeather(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
var weatherCard = document.getElementById("weatherCard");
function displayWeather(data) {
    console.log(data, "displayWeather")
  weatherCard.innerHTML = `
    <h2>WEATHER:</h2>
    <p class="content">Temperature:${data.current.temp}°F</p>
    <p class="content">Wind Speed:${data.current.wind_speed}mph</p>
     <p class="content">Humidity:${data.current.humidity}%</p>
    <p class="content">UV Index:${data.current.uvi}</p>
    `;
}

