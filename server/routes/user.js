const userController = require("../controllers/userController");
const oAuthController = require("../controllers/oAuthController");
const express = require('express');
const router = express.Router();
const bucketListRouter = require('./bucketList');
const { validateUser, createUser } = require("../controllers/userController");


router.post('/oAuth', oAuthController.tokenValidation, userController.validateUser, userController.createUser, (req, res) => {
  // const users = await userController.createUser(req, res, next);
  console.log('all good');
  res.sendStatus(200);
});

router.post('/signup', userController.createUser, (req, res) => {
    // const users = await userController.createUser(req, res, next);
    res.status(200).json({ user: res.locals.user });
});

router.post('/login', userController.getUser, userController.validateUser, (req, res) => {
  console.log(res.locals.user);
  res.status(200).json({ user: res.locals.user });
});

 router.use('/bucketList', bucketListRouter);

 module.exports = router;
