let userFormEl = document.querySelector("#user-form");
let cityInputEl = document.querySelector("#city");
let forcastContainerEl = document.querySelector("#forcast-container");
let citySearch = document.querySelector("#city-search");
let dayConEl = document.querySelector("#day");
let dayTerm = document.querySelector("#current")



let key = "16a855ad62f57b12f8164689eb3974f7";



//Format Date and time 
let date = moment().format('dddd') + " " + moment().format("Do MMM YYYY");
let hour = moment().format('h:mm:ss a');
let hours = moment().hours();
let input;
let hourt;

//Format for current day
let interval = setInterval(function() {
  let time = moment();
  $('#currentDay').html(time.format('YYYY MMMM DD') + ' '
                      + time.format('dddd')
                       .substring(0,3).toUpperCase());
  $('#currentDay').html(date + " " + time.format('hh:mm:ss A'));
}, 100);




// let displayWeather = function(data, searchTerm) {




//   // dayConEl.textContent = '';
//   // dayTerm.textContent = searchTerm;

//   // let weatherS = document.createElement('p');
//   // let weatherHumidity = document.createElement('p');
//   // let weatherWind = document.createElement('p'); 
//   //     weatherS.innerHTML = "Tempature: " + data.main.temp + " °F ";
//   //     weatherHumidity.innerHTML = "Humidity: " + data.main.humidity + " % ";
//   //     weatherWind.innerHTML = "Wind: " + data.wind.speed + " MPH ";
//   //     dayConEl.appendChild(weatherS);
//   //     dayConEl.appendChild(weatherHumidity);
//   //     dayConEl.appendChild(weatherWind);

//   //    console.log(weatherS);
//   var date = new Date(data.dt * 1000);
//   var dateString = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  
//   var temperature = data.main.temp;
//   var humidity = data.main.humidity;
//   var weatherDescription = data.weather[0].description;
//   var windSpeed = data.wind.speed;
  
//   var iconCode = data.weather[0].icon;
//   var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  
//   var card = document.createElement("div");
//   card.classList.add("card");
  
//   card.innerHTML = `
//     <h2>${dateString}</h2>
//     <p>Temperature: ${temperature}°C</p>
//     <p>Humidity: ${humidity}%</p>
//     <p>Weather: ${weatherDescription}</p>
//     <p>Wind: ${windSpeed} m/s</p>
//     <img class="weather-icon" src="${iconUrl}" alt="${weatherDescription}">
//   `;
  
//   dayConEl.appendChild(card);


// }



  



let displayWeather2 = function (data, searchTerm) {

  forcastContainerEl.textContent = '';
// Extract the forecast for the next 5 days (assuming data.list has hourly data)
var forecastData = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
      
      // Create a card for each day
      forecastData.forEach(day => {
        var card = document.createElement("div");
        card.classList.add("card");
        
        var date = new Date(day.dt * 1000);
        var dateString = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
        
        var temperature = day.main.temp;
        var humidity = day.main.humidity;
        var weatherDescription = day.weather[0].description;
        var windSpeed = day.wind.speed;
        var city = data.city.name;
        
        var iconCode = day.weather[0].icon;
        var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
        
        card.innerHTML = `
          <h2>${dateString}</h2>
          <h3>${city}</h3>
          <p>Temperature: ${temperature}°C</p>
          <p>Humidity: ${humidity}%</p>
          <p>Weather: ${weatherDescription}</p>
          <p>Wind: ${windSpeed} m/s</p>
          <img class="weather-icon" src="${iconUrl}" alt="${weatherDescription}">
        `;
        
        forcastContainerEl.appendChild(card);
      })
    


}


let subtitle = document.querySelector("#subtitle");


let getForcast = function(cit) {
  let apiUrl = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" +cit+ "&appid=" + key;


  fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(data) {
              displayWeather2(data, cit);
              subtitle.removeAttribute("hidden");
              console.log(data);
            });
          } else {
            alert('Error: City not found!');
          }
    })
}
    



// let getWeather = function(cit) {
  
//      // format the github api url
//      let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" +cit+ "&appid=" + key;

//      fetch(apiUrl)
//     .then(function(response) {
      
//         if (response.ok) {
//             response.json()
//             .then(function(data) {
             
//               displayWeather(data, cit);
//             });
//           } else {
//             alert('Error: City not found!');
//           }
//     })

// }


let getCity = function(event) {

  

    event.preventDefault();
    // get value from input element
  let cit = cityInputEl.value.trim();

  if (cit) {
    // getWeather(cit);
    getForcast(cit);
    cityInputEl.value = "";
  } else {
    alert("Please enter a city!");
  }
    console.log(event);
  };

  userFormEl.addEventListener("submit", getCity);


  
