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
let form = document.querySelector("#form");
form.addEventListener("submit", changeCity);

// to show temperature and other details
function showWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.condition.description;
  let icon = response.data.condition.icon_url;
  let lastupdated = response.data.time;
  celsiusTemp = Math.round(temperature);
  console.log(response.data);
  console.log(temperature, humidity, lastupdated);
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
}

let x = document.getElementById("cityreturn").innerHTML;
let city = x;
let urlRoot = "https://api.shecodes.io/weather/v1/current?";
let apiKey = "84c6e0b933fac71ce8f9a33t197o5bd2";
let units = "metric";
let url = `${urlRoot}query=${city}&key=${apiKey}&units=${units}`;

axios.get(url).then(showWeather);

function showFah(event) {
  event.preventDefault();
  let fahTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${fahTemp}°`;
}

function showCel(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${celsiusTemp}°`;
}
//to show forecast details
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["4", "5", "6", "7", "8"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              <div class="weather_forecast_date">${day}</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/shower-rain-day.png"
                alt="img" width="42" id="forecastIcon"
              />
              <div class="weather_forecast_temp">
                <span class="weather_forecast_temp_max">18°</span>
                <span class="weather_forecast_temp_min">15°</span>
              </div>
      </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//--------------------
let fahLink = document.querySelector("#fah_link");
fahLink.addEventListener("click", showFah);
let cellink = document.querySelector("#cel_link");
cellink.addEventListener("click", showCel);

let celsiusTemp = null;
displayForecast();
