function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

let dayIndex = date.getDay();  
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[dayIndex];
    return `${currentDay} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#curentTD");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);


function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let cityDegree = document.querySelector("#currentDegree");
  cityDegree.innerHTML = temp;
  document.querySelector("#humidity").innerHTML = `Precipitation: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed)} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

}

function clickchangeCity(event) {
  event.preventDefault();
  let changeCityIn = document.querySelector("#typeCity");
  let changeCityOut = document.querySelector("#currentCity");
  changeCityOut.innerHTML = changeCityIn.value;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${changeCityIn.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let changeClick = document.querySelector("#searchButton");
changeClick.addEventListener("click", clickchangeCity);


function changeDegreeFahrenheit(event){
    event.preventDefault();
    let amountInFahrenheit = document.querySelector("#currentDegree");
    amountInFahrenheit.innerHTML = 71;

}
let Fahrenheit = document.querySelector("#Fahrenheit");
Fahrenheit.addEventListener("click", changeDegreeFahrenheit);




function changeDegreeCelsius(event){
    event.preventDefault();
    let amountInCelsius = document.querySelector("#currentDegree");
    amountInCelsius.innerHTML = 22;

}

let Celsius = document.querySelector("#Celsius");
Celsius.addEventListener("click", changeDegreeCelsius);

function showCurrentWeather(response) {
  let currentPositionDegree = document.querySelector("#currentDegree");
  let temperature = Math.round(response.data.main.temp);
  let currentPositionCity = document.querySelector("#currentCity");
  currentPositionCity.innerHTML = `${response.data.name}`;
  currentPositionDegree.innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = `Precipitation: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed)} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  return currentPositionDegree;
}

function getCurrentPosition(position){
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCurrentWeather);
}



function retrievePosition() {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}
  

  let currentClick = document.querySelector("#currentButton");
  currentClick.addEventListener("click", retrievePosition);






// function changeCurrentDegreeFahrenheit(event){
//     event.preventDefault();
//     let FTemper = showCurrentWeather(currentPositionDegree);
//     let newFTemper = FTemper * 9 / 5 + 32;
//     let amountInCurrentFahrenheit = document.querySelector("#currentDegree");
//     amountInCurrentFahrenheit.innerHTML = newFTemper.value;

// }
//     let currentFahrenheit = document.querySelector("#Fahrenheit");
//     currentFahrenheit.addEventListener("click", changeCurrentDegreeFahrenheit);

