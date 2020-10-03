// require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

let city = 'los angeles'
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_APIKEY}`;

router.get('/', (req, res) => {
  console.log('Entered Router');
  const weatherData = {};
  fetch(url)
    .then(res => res.json())
    .then(data => {
      weatherData.description = data.weather.description;
      weatherData.temp = Math.floor(((data.main.temp - 273.15) * (9/5)) + 32);
      res.send(data)
    })
})

module.exports = router;
