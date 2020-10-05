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

// router.get("/", async (req, res, next) => {
//   console.log('API router fired');
//   try {
//     const data = await userController.createUser(req, res, next);
//     res.status(200).json({users: res.locals.users});
//   } catch {
//     console.error("error");
//   }
// });




// create/validate new user
router.post('/', userController.createUser, (req, res) => {
  // const users = await userController.createUser(req, res, next);
  res.status(200).json({ user: res.locals.user });
});
//   async (req, res, next) => {
//     try {
//       const users = await userController.validateUser(req, res, next);
//       next();
//     } catch (err) {
//       return next({
//         log: `api/user: ERROR ${err}`,
//         message: { err: "something went terribly wrong :(" }
//       });
//     }
//   },
// );




module.exports = router;
