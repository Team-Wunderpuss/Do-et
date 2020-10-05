const userController = require("../controllers/userController");
const oAuthController = require("../controllers/oAuthController");
const express = require('express');
const router = express.Router();
const bucketListRouter = require('./bucketList');
const { validateUser } = require("../controllers/userController");


router.post('/oAuth', oAuthController.tokenValidation, userController.validateUser, (req, res) => {
  // const users = await userController.createUser(req, res, next);
  res.status(200);
});

router.post('/signup', userController.createUser, (req, res) => {
    // const users = await userController.createUser(req, res, next);
    res.status(200).json({ user: res.locals.user });
});

router.post('/login', userController.validateUser, (req, res) => {
  // const users = await userController.createUser(req, res, next);
  res.status(200).json({ user: res.locals.user });
});

 router.use('/bucketlist', bucketListRouter);

 module.exports = router;