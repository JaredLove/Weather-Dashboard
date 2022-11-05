var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var forcastContainerEl = document.querySelector("#forcast-container");
var citySearch = document.querySelector("#city-search");
var dayConEl = document.querySelector("#day");
var dayTerm = document.querySelector("#current")



var key = "16a855ad62f57b12f8164689eb3974f7";



//Format Date and time 
var date = moment().format('dddd') + " " + moment().format("Do MMM YYYY");
var hour = moment().format('h:mm:ss a');
var hours = moment().hours();
var input;
var hourt;

//Format for current day
var interval = setInterval(function() {
  var time = moment();
  $('#currentDay').html(time.format('YYYY MMMM DD') + ' '
                      + time.format('dddd')
                       .substring(0,3).toUpperCase());
  $('#currentDay').html(date + " " + time.format('hh:mm:ss A'));
}, 100);




var displayWeather = function(data, searchTerm) {




  dayConEl.textContent = '';
  dayTerm.textContent = searchTerm;

  var weatherS = document.createElement('p');
     weatherS.innerHTML = "Tempature: " + data.main.temp + " °F " + " / " + " Humidity: " + data.main.humidity + " % " + " / " + " Wind: " + data.wind.speed + " MPH ";

     dayConEl.appendChild(weatherS);

     console.log(weatherS);

    

}

  for (let i = 0; i < data.list.length; i+=8) {
    var weather2 = document.createElement('p');
    weather2.innerHTML = "Date: " + data.list[i].dt_txt + "Tempature: " + data.list[i].main.temp + " °F " + " / " + " Humidity: " + data.list[i].main.humidity + " % " + " / " + " Wind: " + data.list[i].wind.speed + " MPH ";
    console.log(weather2);
    forcastContainerEl.appendChild(weather2);
  }

    console.log(weather2);





var getForcast = function(cit) {
  var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" +cit+ "&appid=" + key;


  fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(data) {
              displayWeather2(data, cit);
              console.log(data);
            });
          } else {
            alert('Error: City not found!');
          }
    })
}
    



var getWeather = function(cit) {
  
     // format the github api url
     var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" +cit+ "&appid=" + key;

     fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(data) {
              displayWeather(data, cit);
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
    getForcast(cit);
    cityInputEl.value = "";
  } else {
    alert("Please enter a city!");
  }
    console.log(event);
  };

  userFormEl.addEventListener("submit", getCity);
