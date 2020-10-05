const userController = require("../controllers/userController");
const express = require('express');
const router = express.Router();
const bucketListRouter = require('./bucketList');



router.post('/signup', userController.createUser, (req, res) => {
    // const users = await userController.createUser(req, res, next);
    res.status(200).json({ user: res.locals.user });
});

router.post('/login', userController.getUser, userController.validateUser, (req, res) => {
  // const users = await userController.createUser(req, res, next);
  res.status(200).json({ user: res.locals.user });
});

 router.use('/bucketList', bucketListRouter);

 module.exports = router;
