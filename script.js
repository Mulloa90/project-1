// openstreetmap API
var API_KEY = '533d85454b838c8602df5b7476173c44';
var searchButton = document.querySelector("searchButton");
var searchForm = document.querySelector("#searchForm")

searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    getLatandLon(e.target.children[1].value)
    
})

function getLatandLon(cityName) {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
