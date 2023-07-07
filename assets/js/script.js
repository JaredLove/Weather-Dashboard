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




let displayWeather = function(data, searchTerm) {




  dayConEl.textContent = '';
  dayTerm.textContent = searchTerm;

  let weatherS = document.createElement('p');
  let weatherHumidity = document.createElement('p');
  let weatherWind = document.createElement('p'); 
      weatherS.innerHTML = "Tempature: " + data.main.temp + " °F ";
      weatherHumidity.innerHTML = "Humidity: " + data.main.humidity + " % ";
      weatherWind.innerHTML = "Wind: " + data.wind.speed + " MPH ";
      dayConEl.appendChild(weatherS);
      dayConEl.appendChild(weatherHumidity);
      dayConEl.appendChild(weatherWind);

     console.log(weatherS);

  

}

let displayWeather2 = function (data, searchTerm) {
  console.log(data);
  console.log(searchTerm);
  console.log(data);
  forcastContainerEl.textContent = '';
  citySearch.textContent = searchTerm;


  for (let i = 0; i < data.list.length; i+=8) {
    let weather2Date = document.createElement('p');
    let weather2Temp = document.createElement('p');
    let weather2Humidity = document.createElement('p');
    let weather2Wind = document.createElement('p');


    weather2Date.innerHTML = "Date: " + data.list[i].dt_txt + " °F ";
    weather2Temp.innerHTML = "Tempature: " + data.list[i].main.temp + " °F ";
    weather2Humidity.innerHTML = "Humidity: " + data.list[i].main.humidity + " % ";
    weather2Wind.innerHTML = "Wind: " + data.list[i].wind.speed + " MPH ";
   
    forcastContainerEl.appendChild(weather2Date);
    forcastContainerEl.appendChild(weather2Temp);
    forcastContainerEl.appendChild(weather2Humidity);
    forcastContainerEl.appendChild(weather2Wind);
  }




}





let getForcast = function(cit) {
  let apiUrl = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" +cit+ "&appid=" + key;


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
    



let getWeather = function(cit) {
  
     // format the github api url
     let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" +cit+ "&appid=" + key;

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


let getCity = function(event) {

  

    event.preventDefault();
    // get value from input element
  let cit = cityInputEl.value.trim();

  if (cit) {
    getWeather(cit);
    getForcast(cit);
    dayConEl.classList.add("active");
    forcastContainerEl.classList.add("active");
    cityInputEl.value = "";
  } else {
    alert("Please enter a city!");
  }
    console.log(event);
  };

  userFormEl.addEventListener("submit", getCity);


  
