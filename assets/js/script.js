var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var forcastContainerEl = document.querySelector("#forcast-container");
var citySearch = document.querySelector("#city-search");
var dayConEl = document.querySelector("#day");
var dayTerm = document.querySelector("#current")


var key = "16a855ad62f57b12f8164689eb3974f7";






var displayWeather = function(data,searchTerm) {


  console.log(data.main.temp);
  console.log(searchTerm);

  dayConEl.textContent = '';
  dayTerm.textContent = searchTerm;

  var weatherS = document.createElement('p');
     weatherS.innerHTML = "Tempature: " + data.main.temp + " °F " + " / " + " Humidity: " + data.main.humidity + " % " + " / " + " Wind: " + data.wind.speed + " MPH ";

     dayConEl.appendChild(weatherS);

     console.log(weatherS);

}

var displayWeather2 = function (data, searchTerm) {

  console.log(data);
  forcastContainerEl = "";
  citySearch.textContent = searchTerm;

  for (i=0; i < data.length; i+6) {
    var weather2 = document.createElement('p');
    weather2.innerHTML = "Tempature: " + data.main.temp + " °F " + " / " + " Humidity: " + data.main.humidity + " % " + " / " + " Wind: " + data.wind.speed + " MPH ";

    forcastContainerEl.appendChild(weather2);

    console.log(weather2);

  }
}





var getForcast = function(cityName) {
  var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" +cityName+ "&appid=" + key;


  fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(data) {
              displayWeather2(data, cityName);
              console.log(data);
            });
          } else {
            alert('Error: City not found!');
          }
    })
}
    



var getWeather = function(cityName) {
  
     // format the github api url
     var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" +cityName+ "&appid=" + key;

     fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(data) {
              displayWeather(data, cityName);
              getForcast(cityName);
              console.log(data);
            });
          } else {
            alert('Error: City not found!');
          }
    })

}


var getCity = function(event) {

    event.preventDefault();
    // get value from input element
  var cit = cityInputEl.value.trim();

  if (cit) {
    getWeather(cit);
    cityInputEl.value = "";
  } else {
    alert("Please enter a city!");
  }
    console.log(event);
  };

  userFormEl.addEventListener("submit", getCity);






















 // var test = "http://api.openweathermap.org/geo/1.0/direct?q=Austin&limit=5&appid=16a855ad62f57b12f8164689eb3974f7"

//var test2 = "http://api.openweathermap.org/data/2.5/forecast?q=Austin&limit=5&appid=16a855ad62f57b12f8164689eb3974f7"

          //  "http://api.openweathermap.org/data/2.5/forecast?" + q + "&limit=5&appid=16a855ad62f57b12f8164689eb3974f7"