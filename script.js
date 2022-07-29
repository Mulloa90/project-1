
// openstreetmap API
var API_KEY = "533d85454b838c8602df5b7476173c44";
var searchButton = document.querySelector("searchButton");
var searchForm = document.querySelector("#searchForm");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  getLatandLon(e.target.children[1].value);
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
  weatherCard.innerHTML = `
    <h2>WEATHER:</h2>
    <p class="content">Temperature:${data.current.temp}°F</p>
    <p class="content">Wind Speed:${data.current.wind_speed}mph</p>
     <p class="content">Humidity:${data.current.humidity}%</p>
    <p class="content">UV Index:${data.current.uvi}</p>
    `;
}

