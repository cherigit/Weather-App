// to show last update day and time from API
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = now.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  let mapDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = mapDay[now.getDay()];
  return `${day} ${hours}:${mins}`;
}
//end
//to change city name afterward
function changeCity(event) {
  event.preventDefault();
  let cityreturn = document.querySelector("#cityreturn");
  let cityholder = document.querySelector("#cityholder");
  if (cityholder.value.length > 0) {
    cityreturn.innerHTML = cityholder.value;
  }

  let x = document.getElementById("cityreturn").innerHTML;
  let city = x;
  let urlRoot = "https://api.shecodes.io/weather/v1/current?";
  let apiKey = "84c6e0b933fac71ce8f9a33t197o5bd2";
  let units = "metric";
  let url = `${urlRoot}query=${city}&key=${apiKey}&units=${units}`;

  axios.get(url).then(showWeather);
}
//end

//to format day in a week from API result
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
//end

// to show temperature and other details
function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.condition.description;
  let icon = response.data.condition.icon_url;
  let lastupdated = response.data.time;
  celsiusTemp = Math.round(temperature);
  let showtemp = document.querySelector("#temperature");
  let showhumi = document.querySelector("#humidity");
  let showwind = document.querySelector("#wind");
  let showdesc = document.querySelector("#description");
  let showicon = document.querySelector("#icon");
  let showDate = document.querySelector("#current_date");
  showtemp.innerHTML = `${celsiusTemp}°`;
  showhumi.innerHTML = `${humidity}`;
  showwind.innerHTML = `${wind}`;
  showdesc.innerHTML = `${description}`;
  showicon.setAttribute("src", `${icon}`);
  showDate.innerHTML = formatDate(response.data.time * 1000);

  getForcast(response.data.city);
}
//end

//scripts for getting current weather details
let z = document.getElementById("cityreturn").innerHTML;
let city = z;
let urlRoot = "https://api.shecodes.io/weather/v1/current?";
let apiKey = "84c6e0b933fac71ce8f9a33t197o5bd2";
let units = "metric";
let url = `${urlRoot}query=${city}&key=${apiKey}&units=${units}`;
//let url =
//("https://api.shecodes.io/weather/v1/forecast?query=${city}&key=84c6e0b933fac71ce8f9a33t197o5bd2&units=metric");

axios.get(url).then(showWeather);
//end

function showFah(event) {
  event.preventDefault();
  let fahTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${fahTemp}°`;
}
//end

function showCel(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${celsiusTemp}°`;
}
//end

//to show forecast details
function displayForecast(response) {
  console.log(response.data.city);
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="weather_forecast_date">${formatDay(
                  forecastDay.time
                )}</div>
                <img
                  src=${forecastDay.condition.icon_url}
                  alt="img" width="42" id="forecastIcon"
                />
                <div class="weather_forecast_temp">
                  <span class="weather_forecast_temp_max">${Math.round(
                    forecastDay.temperature.maximum
                  )}°</span>
                  <span class="weather_forecast_temp_min">${Math.round(
                    forecastDay.temperature.minimum
                  )}°</span>
                </div>
        </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//end

//to get forecast weather details
function getForcast(city) {
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}
//end

let form = document.querySelector("#form");
form.addEventListener("submit", changeCity);

let fahLink = document.querySelector("#fah_link");
fahLink.addEventListener("click", showFah);
let cellink = document.querySelector("#cel_link");
cellink.addEventListener("click", showCel);

let celsiusTemp = null;
