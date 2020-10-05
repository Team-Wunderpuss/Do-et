// require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();


router.get('/:city', (req, res) => {
  let city = req.params.city;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_APIKEY}`;
  const weatherData = {};
  fetch(url)
    .then(res => res.json())
    .then(data => {
      weatherData.description = data.weather[0].description;
      weatherData.temp = (((data.main.temp - 273.15) * (9/5)) + 32).toFixed(2);
      weatherData.feelsLike = (((data.main.feels_like - 273.15) * (9/5)) + 32).toFixed(2);
      weatherData.windSpeed = (data.wind.speed * 2.237).toFixed(2);
      res.send(weatherData);
    })
})

module.exports = router;
