function getForecast(coordinates) {
  let apiKey = "d6adb6d48b0afcb13103tf940oab4e26";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast);
}
