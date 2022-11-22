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
    "Saturday",
  ];

  let currentDay = days[dayIndex];
  return `${currentDay} ${hours}:${minutes}`;
}
let currentTime = new Date();
document.querySelector("#curentTD").innerHTML = formatDate(currentTime);

function showTemperature(response) {
  document.querySelector("#currentDegree").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = `Precipitation: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

function clickchangeCity(event) {
  event.preventDefault();
  let changeCityIn = document.querySelector("#typeCity");
  document.querySelector("#currentCity").innerHTML = changeCityIn.value;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${changeCityIn.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let changeClick = document.querySelector("#searchButton");
changeClick.addEventListener("click", clickchangeCity);

function changeDegreeFahrenheit(event) {
  event.preventDefault();
  let amountInFahrenheit = document.querySelector("#currentDegree");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  amountInFahrenheit.innerHTML = Math.round(fahrenheiTemperature);
}

function changeDegreeCelsius(event) {
  event.preventDefault();
  let amountInCelsius = document.querySelector("#currentDegree");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  amountInCelsius.innerHTML = Math.round(celsiusTemperature);
}

function showCurrentWeather(response) {
  let currentTemperature = document.querySelector("#currentDegree");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = `Precipitation: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  //return currentTemperature.value;
}

function getCurrentPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCurrentWeather);
}

function retrievePosition() {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#Celsius");
celsiusLink.addEventListener("click", changeDegreeCelsius);

let fahrenheitLink = document.querySelector("#Fahrenheit");
fahrenheitLink.addEventListener("click", changeDegreeFahrenheit);

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
